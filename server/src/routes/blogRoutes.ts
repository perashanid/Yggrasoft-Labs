import { Router } from 'express';
import { getBlogs, getBlogBySlug, getAllBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { authenticateAdmin } from '../middleware/auth';
import { cacheMiddleware } from '../utils/cache';

const router = Router();

router.get('/', cacheMiddleware(300), getBlogs);
router.get('/all', authenticateAdmin, getAllBlogs);
router.get('/:slug', cacheMiddleware(300), getBlogBySlug);
router.post('/', authenticateAdmin, createBlog);
router.put('/:id', authenticateAdmin, updateBlog);
router.delete('/:id', authenticateAdmin, deleteBlog);

export default router;
