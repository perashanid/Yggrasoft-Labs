import { Request, Response, NextFunction } from 'express';
import Domain from '../models/Domain';
import { AppError } from '../middleware/errorHandler';

export const getDomains = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const domains = await Domain.find({ isActive: true }).sort({ order: 1 });

    // Set cache headers
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    res.status(200).json({
      success: true,
      count: domains.length,
      data: domains,
    });
  } catch (error) {
    next(error);
  }
};

export const getDomainById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const domain = await Domain.findById(req.params.id);

    if (!domain) {
      throw new AppError('Domain not found', 404);
    }

    // Set cache headers
    res.set('Cache-Control', 'public, max-age=3600');

    res.status(200).json({
      success: true,
      data: domain,
    });
  } catch (error) {
    next(error);
  }
};
