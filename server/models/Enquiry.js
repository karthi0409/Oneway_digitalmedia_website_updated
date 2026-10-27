import mongoose from 'mongoose';
import { SERVICES, ENQUIRY_STATUSES } from '../config/constants.js';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      enum: {
        values: SERVICES,
        message: 'Invalid service selected',
      },
      default: 'social-media',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ENQUIRY_STATUSES,
        message: 'Invalid status',
      },
      default: 'new',
      index: true,
    },
    emailNotified: {
      type: Boolean,
      default: false,
    },
    ip: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
