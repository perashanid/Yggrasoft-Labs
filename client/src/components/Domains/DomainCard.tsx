import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Domain } from '../../types';
import {
  FaLaptopCode,
  FaSeedling,
  FaGraduationCap,
  FaChartLine,
  FaBriefcase,
  FaHeartbeat,
} from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface DomainCardProps {
  domain: Domain;
  index: number;
}

const iconMap: Record<string, JSX.Element> = {
  FaLaptopCode: <FaLaptopCode className="w-12 h-12" />,
  FaSeedling: <FaSeedling className="w-12 h-12" />,
  FaGraduationCap: <FaGraduationCap className="w-12 h-12" />,
  FaChartLine: <FaChartLine className="w-12 h-12" />,
  FaBriefcase: <FaBriefcase className="w-12 h-12" />,
  FaHeartbeat: <FaHeartbeat className="w-12 h-12" />,
};

export const DomainCard = ({ domain, index }: DomainCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, {
    threshold: 0.2,
    freezeOnceVisible: true,
  });

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Staggered animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15, // Stagger based on index
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.15 + 0.2,
        ease: 'backOut',
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="group relative bg-gradient-to-br from-background-secondary to-background-secondary/80 border-2 border-gold/30 rounded-xl p-8 hover:border-gold transition-all duration-300 card-elevation overflow-hidden mystical-glow"
      whileHover={{ scale: 1.03, y: -8 }}
    >
      {/* Organic background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
        <div className="tree-texture absolute inset-0" />
      </div>

      {/* Branch decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50,0 L50,50 M50,50 L80,30 M50,50 L80,70" stroke="#8C7231" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="flex flex-col items-center text-center relative z-10">
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="w-20 h-20 mb-5 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {iconMap[domain.icon] || <FaLaptopCode className="w-10 h-10" />}
        </motion.div>

        <h3 className="text-2xl font-bold text-gold mb-3 font-heading group-hover:text-gold-light transition-colors">
          {domain.name}
        </h3>

        {domain.hasActiveProjects && (
          <span className="inline-flex items-center gap-2 bg-teal/20 border border-teal text-teal text-xs px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            Active Projects
          </span>
        )}

        <p className="text-gray-300 leading-relaxed">
          {domain.description}
        </p>
      </div>
    </motion.div>
  );
};
