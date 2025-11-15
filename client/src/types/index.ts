// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Domain Types
export interface Domain {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  hasActiveProjects: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  _id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  review: string;
  avatar?: string;
  projectId?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Project Types
export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  domainId?: string;
  order?: number;
  isActive?: boolean;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface Contact extends ContactFormData {
  _id: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
}

export interface Newsletter extends NewsletterSubscription {
  _id: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
}

// Settings Types
export interface SocialMedia {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
}

export interface Settings {
  _id: string;
  siteName: string;
  tagline: string;
  missionStatement: string;
  contactEmail: string;
  socialMedia: SocialMedia;
  updatedAt: string;
}
