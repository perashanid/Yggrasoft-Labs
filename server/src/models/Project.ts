import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  domainId?: mongoose.Types.ObjectId;
  order: number;
  isActive: boolean;
  reviews?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [50, 'Description must be at least 50 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one technology must be specified',
      },
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    domainId: {
      type: Schema.Types.ObjectId,
      ref: 'Domain',
    },
    order: {
      type: Number,
      default: 0,
      min: [0, 'Order must be a positive number'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review',
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
projectSchema.index({ isActive: 1, order: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ domainId: 1 });

export default mongoose.model<IProject>('Project', projectSchema);
