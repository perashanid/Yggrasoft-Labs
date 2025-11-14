import express from 'express';
import { getSettings } from '../controllers/settingsController';

const router = express.Router();

// Routes
router.get('/', getSettings);

export default router;
