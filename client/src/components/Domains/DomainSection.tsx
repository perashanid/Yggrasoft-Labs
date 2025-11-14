import { motion } from 'framer-motion';
import { DomainCard } from './DomainCard';
import { useFetch } from '../../hooks/useFetch';
import { getDomains } from '../../services/api';
import { staggerContainer } from '../../styles/theme';

export const DomainSection = () => {
  const { data: domains, loading } = useFetch(getDomains);

  if (loading) {
    return (
      <section id="domains" className="py-20 bg-background-primary">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="domains" className="relative py-24 bg-background-primary/70 backdrop-blur-sm overflow-hidden">
      {/* Gradient overlay to blend with tree */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-primary/30 to-transparent" />

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
            The Nine Realms
          </motion.h2>

          <motion.p
            className="text-xl text-gold-light text-center mb-4 font-accent"
            variants={staggerContainer}
          >
            Branches of Innovation Across Domains
          </motion.p>

          <motion.p
            className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            variants={staggerContainer}
          >
            Like the branches of Yggdrasil reaching into different realms, our expertise spans
            multiple domains, each interconnected and strengthening the whole.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {domains?.map((domain, index) => (
              <DomainCard key={domain._id} domain={domain} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-secondary/60 via-background-secondary/30 to-transparent pointer-events-none" />
    </section>
  );
};
