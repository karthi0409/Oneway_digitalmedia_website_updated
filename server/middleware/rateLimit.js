import rateLimit from 'express-rate-limit';

/**
 * Strict rate limiter for enquiry submissions (5 per 15 minutes per IP)
 */
export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: {
    success: false,
    message: 'Too many inquiries from this IP address. Please wait 15 minutes before submitting again.',
  },
});

/**
 * Standard API rate limiter (150 requests per 15 minutes per IP)
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: 429,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
});
