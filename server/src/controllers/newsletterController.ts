import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter';
import { AppError } from '../middleware/errorHandler';

export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        throw new AppError('Email is already subscribed', 400);
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        existingSubscriber.unsubscribedAt = undefined;
        await existingSubscriber.save();

        res.status(200).json({
          success: true,
          message: 'Successfully resubscribed to newsletter',
        });
        return;
      }
    }

    // Create new subscription
    await Newsletter.create({
      email,
      isActive: true,
      subscribedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      throw new AppError('Email not found in newsletter list', 404);
    }

    if (!subscriber.isActive) {
      throw new AppError('Email is already unsubscribed', 400);
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    next(error);
  }
};
