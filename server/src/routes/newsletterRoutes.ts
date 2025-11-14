import express from 'express';
import { body } from 'express-validator';
import { subscribe, unsubscribe } from '../controllers/newsletterController';
import { newsletterLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Validation rules
const emailValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
];

// Routes
router.post('/subscribe', newsletterLimiter, emailValidation, subscribe);
router.post('/unsubscribe', newsletterLimiter, emailValidation, unsubscribe);

export default router;
