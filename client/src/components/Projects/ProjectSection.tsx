import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { useFetch } from '../../hooks/useFetch';
import { getProjects } from '../../services/api';
import { staggerContainer } from '../../styles/theme';
import { Project } from '../../types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const ProjectSection = () => {
  const { data: projects, loading } = useFetch<Project[]>(getProjects);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 400;
      
      if (direction === 'left') {
        // If at the start, loop to the end
        if (container.scrollLeft <= 0) {
          container.scrollTo({
            left: container.scrollWidth - container.clientWidth,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            left: container.scrollLeft - scrollAmount,
            behavior: 'smooth'
          });
        }
      } else {
        // If at the end, loop to the start
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        setShowScrollButtons(
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
        );
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projects]);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-background-primary">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e]/20 via-[#0f1419]/10 to-[#1a1f2e]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(140,114,49,0.05),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-gold text-center mb-6 font-heading"
            variants={staggerContainer}
          >
            Forged Creations
          </motion.h2>

          <motion.p
            className="text-xl text-gold-light text-center mb-4 font-accent"
            variants={staggerContainer}
          >
            Projects Crafted in the Forge of Innovation
          </motion.p>

          <motion.p
            className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            variants={staggerContainer}
          >
            Each project represents a journey through the realms of technology, 
            where ideas take form and solutions come to life.
          </motion.p>

          <div className="relative">
            {/* Left Arrow - Minimal */}
            {showScrollButtons && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-gold/60 hover:text-gold transition-colors hidden md:block"
                aria-label="Scroll left"
              >
                <FaChevronLeft size={32} />
              </button>
            )}

            {/* Scrollable Container */}
            <motion.div
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              variants={staggerContainer}
            >
              {projects?.map((project, index) => (
                <div key={project._id} className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </motion.div>

            {/* Right Arrow - Minimal */}
            {showScrollButtons && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-gold/60 hover:text-gold transition-colors hidden md:block"
                aria-label="Scroll right"
              >
                <FaChevronRight size={32} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-primary via-background-primary/50 to-transparent pointer-events-none" />
    </section>
  );
};
