import express from 'express';
import { getProjects, getProjectById, getProjectsByDomain } from '../controllers/projectController';

const router = express.Router();

// Routes
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/domain/:domainId', getProjectsByDomain);

export default router;
