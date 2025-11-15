import { Router } from 'express';
import { trackEvent, getAnalytics } from '../controllers/analyticsController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/track', trackEvent);
router.get('/', authenticateAdmin, getAnalytics);

export default router;
