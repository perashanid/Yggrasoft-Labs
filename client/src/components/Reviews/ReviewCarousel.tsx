import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { LazyImage } from '../shared/LazyImage';

interface Review {
  _id: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  review: string;
  avatar?: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
}

export const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (reviews.length === 0) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) {
    return null;
  }

  const currentReview = reviews[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="relative bg-background-secondary rounded-2xl p-8 md:p-12 shadow-xl">
        <FaQuoteLeft className="absolute top-6 left-6 text-4xl text-accent-primary opacity-20" />
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="text-center"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              {currentReview.avatar ? (
                <LazyImage
                  src={currentReview.avatar}
                  alt={currentReview.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-accent-primary"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-accent-primary flex items-center justify-center text-2xl font-bold text-white">
                  {currentReview.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-xl ${
                    i < currentReview.rating ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-lg md:text-xl text-text-primary mb-6 italic leading-relaxed">
              "{currentReview.review}"
            </p>

            {/* Author Info */}
            <div>
              <h4 className="text-xl font-bold text-text-primary">
                {currentReview.name}
              </h4>
              <p className="text-text-secondary">
                {currentReview.role}
                {currentReview.company && ` at ${currentReview.company}`}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background-primary hover:bg-accent-primary transition-colors"
              aria-label="Previous review"
            >
              <FaChevronLeft className="text-xl text-text-primary" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background-primary hover:bg-accent-primary transition-colors"
              aria-label="Next review"
            >
              <FaChevronRight className="text-xl text-text-primary" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-accent-primary w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
