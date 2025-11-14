import express from 'express';
import { getDomains, getDomainById } from '../controllers/domainController';

const router = express.Router();

// Routes
router.get('/', getDomains);
router.get('/:id', getDomainById);

export default router;
