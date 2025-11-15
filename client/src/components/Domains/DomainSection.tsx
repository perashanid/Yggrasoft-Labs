import { motion } from 'framer-motion';
import { DomainCard } from './DomainCard';
import { useFetch } from '../../hooks/useFetch';
import { getDomains } from '../../services/api';
import { staggerContainer } from '../../styles/theme';
import { Domain } from '../../types';

export const DomainSection = () => {
  const { data: domains, loading } = useFetch<Domain[]>(getDomains);

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
    <section id="domains" className="relative py-24 overflow-hidden">
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


    </section>
  );
};
