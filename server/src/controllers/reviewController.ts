import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { clearCache } from '../utils/cache';

export const getReviews = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

export const getAllReviews = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find()
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    clearCache('/api/reviews');
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    
    clearCache('/api/reviews');
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }
    
    clearCache('/api/reviews');
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};
