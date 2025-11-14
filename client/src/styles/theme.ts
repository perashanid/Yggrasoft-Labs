// Color System - Extracted from Yggdrasil Logo
export const colors = {
  gold: {
    light: '#A89048',
    DEFAULT: '#8C7231',
    dark: '#5d1B2C',
  },
  teal: {
    light: '#4A7A8A',
    DEFAULT: '#365265',
    dark: '#213127',
  },
  background: {
    primary: '#010202',
    secondary: '#213127',
    elevated: '#2D2D2D',
  },
  text: {
    primary: '#A89048',
    secondary: '#B8B8B8',
    accent: '#365265',
  },
};

// Typography
export const typography = {
  fonts: {
    heading: '"Cinzel", serif',
    body: '"Inter", sans-serif',
    accent: '"Marcellus", serif',
  },
  sizes: {
    h1: 'clamp(2.5rem, 5vw, 4rem)',
    h2: 'clamp(2rem, 4vw, 3rem)',
    h3: 'clamp(1.5rem, 3vw, 2rem)',
    body: 'clamp(1rem, 2vw, 1.125rem)',
    small: 'clamp(0.875rem, 1.5vw, 1rem)',
  },
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation Variants for Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Spacing System
export const spacing = {
  section: {
    vertical: '6rem',
    horizontal: '2rem',
  },
  card: '2rem',
  element: '1.5rem',
  micro: '0.5rem',
};

// Shadow and Glow Effects
export const shadows = {
  goldGlow: '0 0 20px rgba(140, 114, 49, 0.3), 0 0 40px rgba(140, 114, 49, 0.2)',
  tealGlow: '0 0 20px rgba(54, 82, 101, 0.4), 0 0 40px rgba(54, 82, 101, 0.2)',
  cardElevation: '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
};

// Additional Animation Variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
