import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { useFetch } from '../../hooks/useFetch';
import { getProjects } from '../../services/api';
import { staggerContainer } from '../../styles/theme';
import { Project } from '../../types';

export const ProjectSection = () => {
  const { data: projects, loading } = useFetch<Project[]>(getProjects);

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e]/70 via-[#0f1419]/50 to-[#1a1f2e]/70" />
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

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {projects?.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-primary via-background-primary/50 to-transparent pointer-events-none" />
    </section>
  );
};
