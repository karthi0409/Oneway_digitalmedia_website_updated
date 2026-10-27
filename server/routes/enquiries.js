import express from 'express';
import { Enquiry } from '../models/Enquiry.js';
import { adminAuth } from '../middleware/auth.js';
import { enquiryLimiter } from '../middleware/rateLimit.js';
import { validateEnquiryInput, isValidObjectId } from '../utils/validate.js';
import { sanitizeText, cleanInput } from '../utils/text.js';
import { sendTeamNotification, sendCustomerAutoReply } from '../utils/mailer.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ENQUIRY_STATUSES, DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } from '../config/constants.js';

const router = express.Router();

/**
 * @route   POST /api/enquiries
 * @desc    Submit a new customer enquiry
 * @access  Public (Rate-limited)
 */
router.post(
  '/',
  enquiryLimiter,
  asyncHandler(async (req, res) => {
    const { name, email, phone, service, message, botcheck } = req.body;

    // Honeypot anti-spam check
    if (botcheck && botcheck.trim().length > 0) {
      // Fake success for bots to prevent them adapting
      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been received.',
      });
    }

    // Input Validation
    const validation = validateEnquiryInput({ name, email, phone, service, message });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify your submitted information.',
        errors: validation.errors,
      });
    }

    // Sanitization & Normalization
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || '';
    const cleanEnquiry = {
      name: cleanInput(name),
      email: cleanInput(email).toLowerCase(),
      phone: phone ? cleanInput(phone) : '',
      service: service || 'social-media',
      message: cleanInput(message),
      ip: clientIp,
      status: 'new',
      emailNotified: false,
    };

    // Save to Database
    const enquiry = await Enquiry.create(cleanEnquiry);

    // Asynchronously dispatch emails (saving is guaranteed even if emailing fails)
    Promise.allSettled([
      sendTeamNotification(enquiry),
      sendCustomerAutoReply(enquiry),
    ])
      .then(async (results) => {
        const teamSent = results[0]?.status === 'fulfilled' && results[0]?.value;
        if (teamSent) {
          await Enquiry.findByIdAndUpdate(enquiry._id, { emailNotified: true });
        }
      })
      .catch((err) => {
        console.error('[Mailer Worker Error]', err);
      });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been successfully submitted.',
      data: {
        id: enquiry._id,
        createdAt: enquiry.createdAt,
      },
    });
  })
);

/**
 * @route   GET /api/enquiries
 * @desc    Admin: Retrieve paginated list of inquiries
 * @access  Admin only (x-admin-key)
 */
router.get(
  '/',
  adminAuth,
  asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page, 10) || DEFAULT_PAGE);
    const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_LIMIT));
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.status && ENQUIRY_STATUSES.includes(req.query.status)) {
      query.status = req.query.status;
    }

    if (req.query.service) {
      query.service = req.query.service;
    }

    if (req.query.q) {
      const searchRegex = new RegExp(req.query.q.trim(), 'i');
      query.$or = [{ name: searchRegex }, { email: searchRegex }, { phone: searchRegex }];
    }

    const [total, inquiries] = await Promise.all([
      Enquiry.countDocuments(query),
      Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ]);

    res.json({
      success: true,
      count: inquiries.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: inquiries,
    });
  })
);

/**
 * @route   PATCH /api/enquiries/:id
 * @desc    Admin: Update inquiry status or notes
 * @access  Admin only (x-admin-key)
 */
router.patch(
  '/:id',
  adminAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
    }

    const { status, notes } = req.body;
    const update = {};

    if (status !== undefined) {
      if (!ENQUIRY_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of: ${ENQUIRY_STATUSES.join(', ')}`,
        });
      }
      update.status = status;
    }

    if (notes !== undefined) {
      update.notes = sanitizeText(notes);
    }

    const updated = await Enquiry.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    res.json({
      success: true,
      message: 'Inquiry updated successfully.',
      data: updated,
    });
  })
);

/**
 * @route   DELETE /api/enquiries/:id
 * @desc    Admin: Delete an inquiry
 * @access  Admin only (x-admin-key)
 */
router.delete(
  '/:id',
  adminAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
    }

    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  })
);

export default router;
