import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TreeSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const TreeSection = ({ children, id, className = '', variant = 'primary' }: TreeSectionProps) => {
  const bgClass = variant === 'primary' 
    ? 'bg-background-primary/70' 
    : 'bg-background-secondary/60';

  return (
    <motion.section
      id={id}
      className={`relative py-24 ${bgClass} backdrop-blur-sm overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(140, 114, 49, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(54, 82, 101, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(140, 114, 49, 0.03) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient overlay for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom transition */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
        variant === 'primary' 
          ? 'from-background-secondary/60 via-background-secondary/30' 
          : 'from-background-primary/70 via-background-primary/40'
      } to-transparent pointer-events-none`} />
    </motion.section>
  );
};
