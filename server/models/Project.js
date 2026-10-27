import mongoose from 'mongoose';
import { PROJECT_CATEGORIES } from '../config/constants.js';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 150,
    },
    client: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: PROJECT_CATEGORIES,
        message: 'Invalid project category',
      },
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: 3000,
    },
    result: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isIllustrative: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model('Project', projectSchema);
