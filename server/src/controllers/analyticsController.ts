import { Request, Response } from 'express';
import { Analytics } from '../models/Analytics';

export const trackEvent = async (req: Request, res: Response) => {
  try {
    const { type, page, eventName, eventData } = req.body;
    
    const analytics = new Analytics({
      type,
      page,
      eventName,
      eventData,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      referrer: req.headers.referer,
    });
    
    await analytics.save();
    res.status(201).json({ message: 'Event tracked' });
  } catch (error) {
    res.status(400).json({ message: 'Error tracking event', error });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, type, page } = req.query;
    
    const query: any = {};
    
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate as string);
      if (endDate) query.timestamp.$lte = new Date(endDate as string);
    }
    
    if (type) query.type = type;
    if (page) query.page = page;
    
    const [events, pageviews, topPages] = await Promise.all([
      Analytics.countDocuments(query),
      Analytics.countDocuments({ ...query, type: 'pageview' }),
      Analytics.aggregate([
        { $match: { ...query, type: 'pageview' } },
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);
    
    res.json({
      totalEvents: events,
      pageviews,
      topPages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};
