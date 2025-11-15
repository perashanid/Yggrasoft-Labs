import { Router } from 'express';
import { login, verifyToken, createAdmin } from '../controllers/authController';
import { authenticateAdmin, requireSuperAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/verify', authenticateAdmin, verifyToken);
router.post('/admin', authenticateAdmin, requireSuperAdmin, createAdmin);

export default router;
