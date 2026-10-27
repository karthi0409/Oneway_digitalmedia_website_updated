import mongoose from 'mongoose';
import { SERVICES, PROJECT_CATEGORIES } from '../config/constants.js';

/**
 * Validates a MongoDB ObjectId
 * @param {string} id
 * @returns {boolean}
 */
export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Validates enquiry submission payload
 * @param {Object} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateEnquiryInput(data = {}) {
  const errors = {};

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name cannot exceed 100 characters.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string' || !emailPattern.test(data.email.trim())) {
    errors.email = 'A valid email address is required.';
  }

  if (data.phone && typeof data.phone === 'string' && data.phone.trim().length > 0) {
    const cleanPhone = data.phone.replace(/[\s\-\+\(\)]/g, '');
    if (cleanPhone.length < 8 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
      errors.phone = 'Phone number must contain between 8 and 15 digits.';
    }
  }

  if (data.service && !SERVICES.includes(data.service)) {
    errors.service = 'Invalid service selected.';
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates project creation/update payload
 * @param {Object} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateProjectInput(data = {}) {
  const errors = {};

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 2) {
    errors.title = 'Project title is required.';
  }

  if (!data.client || typeof data.client !== 'string' || data.client.trim().length < 2) {
    errors.client = 'Client name is required.';
  }

  if (!data.category || !PROJECT_CATEGORIES.includes(data.category)) {
    errors.category = `Category must be one of: ${PROJECT_CATEGORIES.join(', ')}`;
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
