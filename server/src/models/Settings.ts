import mongoose, { Document, Schema } from 'mongoose';

interface SocialMedia {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
}

export interface ISettings extends Document {
  siteName: string;
  tagline: string;
  missionStatement: string;
  contactEmail: string;
  socialMedia: SocialMedia;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    siteName: {
      type: String,
      required: [true, 'Site name is required'],
      trim: true,
      maxlength: [100, 'Site name cannot exceed 100 characters'],
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      trim: true,
      maxlength: [200, 'Tagline cannot exceed 200 characters'],
    },
    missionStatement: {
      type: String,
      required: [true, 'Mission statement is required'],
      trim: true,
      maxlength: [1000, 'Mission statement cannot exceed 1000 characters'],
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    socialMedia: {
      twitter: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);
