import express from 'express';
import { Project } from '../models/Project.js';
import { adminAuth } from '../middleware/auth.js';
import { validateProjectInput, isValidObjectId } from '../utils/validate.js';
import { cleanInput } from '../utils/text.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { PROJECT_CATEGORIES } from '../config/constants.js';

const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Public: Get published case studies/projects
 * @access  Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const query = { published: true };

    if (req.query.category && req.query.category !== 'all') {
      if (PROJECT_CATEGORIES.includes(req.query.category)) {
        query.category = req.query.category;
      }
    }

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  })
);

/**
 * @route   GET /api/projects/all
 * @desc    Admin: Get all projects (including drafts)
 * @access  Admin only (x-admin-key)
 */
router.get(
  '/all',
  adminAuth,
  asyncHandler(async (req, res) => {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  })
);

/**
 * @route   POST /api/projects
 * @desc    Admin: Create new case study / project
 * @access  Admin only (x-admin-key)
 */
router.post(
  '/',
  adminAuth,
  asyncHandler(async (req, res) => {
    const validation = validateProjectInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project data.',
        errors: validation.errors,
      });
    }

    const {
      title,
      client,
      category,
      description,
      result,
      imageUrl,
      year,
      featured,
      isIllustrative,
      order,
      published,
      tags,
    } = req.body;

    const newProject = await Project.create({
      title: cleanInput(title),
      client: cleanInput(client),
      category,
      description: cleanInput(description),
      result: result ? cleanInput(result) : '',
      imageUrl: imageUrl ? cleanInput(imageUrl) : '',
      year: year || new Date().getFullYear(),
      featured: Boolean(featured),
      isIllustrative: Boolean(isIllustrative),
      order: Number(order) || 0,
      published: published !== undefined ? Boolean(published) : true,
      tags: Array.isArray(tags) ? tags.map((t) => cleanInput(t)) : [],
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject,
    });
  })
);

/**
 * @route   PUT /api/projects/:id
 * @desc    Admin: Update an existing project
 * @access  Admin only (x-admin-key)
 */
router.put(
  '/:id',
  adminAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project ID.' });
    }

    const validation = validateProjectInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project data.',
        errors: validation.errors,
      });
    }

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  })
);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Admin: Delete a project
 * @access  Admin only (x-admin-key)
 */
router.delete(
  '/:id',
  adminAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project ID.' });
    }

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  })
);

export default router;
