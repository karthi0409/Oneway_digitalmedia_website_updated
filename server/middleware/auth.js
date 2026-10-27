import crypto from 'crypto';
import { env } from '../config/env.js';

/**
 * Constant-time string comparison to protect against timing attacks
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Constant time dummy comparison
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Middleware to authenticate admin requests via x-admin-key header
 */
export function adminAuth(req, res, next) {
  const providedKey = req.headers['x-admin-key'] || req.headers['x-api-key'];

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Missing admin authentication header (x-admin-key).',
    });
  }

  const isValid = safeCompare(providedKey, env.ADMIN_API_KEY);

  if (!isValid) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Invalid admin credentials.',
    });
  }

  next();
}
