// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Navigation Items
export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'domains', label: 'Domains', href: '#domains' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Domain Names
export const DOMAIN_NAMES = [
  'Technology',
  'Agriculture',
  'Education',
  'Stock Markets',
  'Job Markets',
  'Healthcare',
];

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Scroll Offset for Fixed Navbar
export const SCROLL_OFFSET = -80;
