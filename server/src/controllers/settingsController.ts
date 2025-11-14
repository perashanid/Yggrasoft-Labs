import { Request, Response, NextFunction } from 'express';
import Settings from '../models/Settings';

export const getSettings = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the first (and should be only) settings document
    const settings = await Settings.findOne();

    if (!settings) {
      res.status(200).json({
        success: true,
        data: {
          siteName: 'Yggrasoft Labs',
          tagline: 'Connecting Realms of Innovation',
          missionStatement:
            'Developing, funding, and deploying real-world solutions across multiple domains.',
          contactEmail: 'contact@yggrasoft.com',
          socialMedia: {},
        },
      });
      return;
    }

    // Set cache headers
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
