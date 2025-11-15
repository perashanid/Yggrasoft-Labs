import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { fadeInUp } from '../../styles/theme';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasReviews = project.reviews && project.reviews.length > 0;

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-background-secondary/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10 flex flex-col"
    >
      {/* Project Image */}
      {project.imageUrl && !imageError ? (
        <div className="relative h-48 overflow-hidden bg-background-primary">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary to-transparent opacity-60" />
        </div>
      ) : (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gold/20 to-teal/20 flex items-center justify-center">
          <div className="text-6xl text-gold/30">
            {project.title.charAt(0)}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gold mb-3 font-heading">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-gold/10 text-gold-light rounded-full border border-gold/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors"
            >
              <FaGithub size={20} />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors"
            >
              <FaExternalLinkAlt size={20} />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {/* Reviews Toggle */}
        {hasReviews && (
          <div className="mt-auto">
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gold/10 hover:bg-gold/20 rounded-lg transition-colors text-gold-light"
            >
              <span className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                {project.reviews!.length} {project.reviews!.length === 1 ? 'Review' : 'Reviews'}
              </span>
              {showReviews ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Reviews Section */}
            <AnimatePresence>
              {showReviews && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                    {project.reviews!.map((review) => (
                      <div
                        key={review._id}
                        className="p-3 bg-background-primary/50 rounded-lg border border-gold/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gold-light">{review.name}</p>
                            <p className="text-xs text-gray-400">
                              {review.role}
                              {review.company && ` at ${review.company}`}
                            </p>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-xs" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 line-clamp-3">{review.review}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 bg-gold text-background-primary px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      )}
    </motion.div>
  );
};
