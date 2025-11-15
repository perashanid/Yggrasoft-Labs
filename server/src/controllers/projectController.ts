import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import { AppError } from '../middleware/errorHandler';

export const getProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find({ isActive: true })
      .sort({ featured: -1, order: 1 })
      .populate('domainId', 'name slug');

    // Set cache headers
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id).populate('domainId', 'name slug');

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    // Set cache headers
    res.set('Cache-Control', 'public, max-age=3600');

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectsByDomain = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find({
      domainId: req.params.domainId,
      isActive: true,
    }).sort({ featured: -1, order: 1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
