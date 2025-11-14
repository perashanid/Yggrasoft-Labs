import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for contact form submissions
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for newsletter subscriptions
export const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 subscription attempts per hour
  message: {
    success: false,
    message: 'Too many subscription attempts. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
