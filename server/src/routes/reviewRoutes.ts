import { Router } from 'express';
import { getReviews, getAllReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController';
import { authenticateAdmin } from '../middleware/auth';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

router.get('/', cacheMiddleware(300), getReviews);
router.get('/all', authenticateAdmin, getAllReviews);
router.post('/', authenticateAdmin, createReview);
router.put('/:id', authenticateAdmin, updateReview);
router.delete('/:id', authenticateAdmin, deleteReview);

export default router;
