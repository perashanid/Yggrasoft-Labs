import mongoose, { Document, Schema } from 'mongoose';

export interface IDomain extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  hasActiveProjects: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const domainSchema = new Schema<IDomain>(
  {
    name: {
      type: String,
      required: [true, 'Domain name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [50, 'Description must be at least 50 characters'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
      trim: true,
    },
    hasActiveProjects: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: [true, 'Order is required'],
      min: [0, 'Order must be a positive number'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
domainSchema.index({ slug: 1 });
domainSchema.index({ isActive: 1, order: 1 });

export default mongoose.model<IDomain>('Domain', domainSchema);
