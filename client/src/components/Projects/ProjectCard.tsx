import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { fadeInUp } from '../../styles/theme';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-background-secondary/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10"
    >
      {/* Project Image */}
      {project.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary to-transparent opacity-60" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
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
        <div className="flex gap-4">
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
