import { motion } from 'framer-motion';
import { Button } from '../shared/Button';
import { useFetch } from '../../hooks/useFetch';
import { getSettings } from '../../services/api';
import { fadeInUp, staggerContainer, floatingAnimation } from '../../styles/theme';

export const Hero = () => {
  const { data: settings, loading } = useFetch(getSettings);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-background-primary"
      >
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Nordic atmosphere */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#1a1f2e]" />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(140,114,49,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(54,82,101,0.15),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,144,72,0.1),transparent_40%)]" />
        </div>
        
        {/* Atmospheric fog effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/90 via-transparent to-[#0a0e1a]/70" />
      </div>

      {/* Mystical Glow Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(140,114,49,0.15) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(54,82,101,0.15) 0%, transparent 70%)' }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,144,72,0.1) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 text-center z-10 relative"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={floatingAnimation} animate="animate">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
            <img 
              src="/assets/favicon.png" 
              alt="Yggrasoft Labs Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-6xl md:text-8xl font-bold text-gold mb-6 drop-shadow-2xl font-heading tracking-wider"
        >
          {settings?.siteName || 'Yggrasoft Labs'}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-2xl md:text-3xl text-gold-light mb-8 drop-shadow-lg font-accent"
        >
          {settings?.tagline || 'Connecting Realms of Innovation'}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md"
        >
          {settings?.missionStatement ||
            'Like the branches of Yggdrasil reaching across nine realms, we extend our expertise across multiple domains, creating solutions that bridge innovation and real-world impact.'}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => scrollToSection('domains')}
            variant="primary"
            ariaLabel="Learn more about our domains"
          >
            Explore Our Domains
          </Button>
          <Button
            onClick={() => scrollToSection('contact')}
            variant="secondary"
            ariaLabel="Get in touch"
          >
            Connect With Us
          </Button>
        </motion.div>
      </motion.div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a1f2e]/80 via-[#1a1f2e]/40 to-transparent z-5 pointer-events-none" />
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-gold rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
