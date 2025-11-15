import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReviewCarousel } from './ReviewCarousel';
import { SkeletonCard } from '../shared/SkeletonLoader';
import axios from 'axios';

interface Review {
  _id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  review: string;
  avatar?: string;
}

export const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-text-primary mb-12">
            What Our Clients Say
          </h2>
          <SkeletonCard />
        </div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 px-4 bg-background-primary" id="reviews">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ReviewCarousel reviews={reviews} />
        </motion.div>
      </div>
    </section>
  );
};
