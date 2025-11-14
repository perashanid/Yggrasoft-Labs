import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../styles/theme';

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
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
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold text-gold mb-6 text-center font-heading"
          >
            The World Tree
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gold-light text-center mb-16 font-accent"
          >
            Rooted in Innovation, Branching Across Realms
          </motion.p>

          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-20">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                Inspired by <span className="text-gold font-semibold">Yggdrasil</span>, the World Tree from Norse mythology that
                connects nine realms, Yggrasoft Labs serves as a bridge between
                innovation and real-world impact.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed text-center">
                Just as the World Tree's branches reach across different worlds, we extend our expertise
                across multiple domains—from technology and sustainability to healthcare and beyond.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed text-center">
                We believe in the <span className="text-teal font-semibold">interconnected nature of progress</span>. Solutions
                in one domain can inspire breakthroughs in another. By fostering
                this cross-pollination of ideas, we create sustainable, scalable
                solutions that address the complex challenges of our time.
              </p>

              <div className="pt-8 mt-8 border-t border-gold/20">
                <p className="text-gold-light italic text-center text-xl">
                  "Like roots that anchor and branches that reach, we ground our work in solid foundations
                  while exploring new frontiers of possibility."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Three pillars with enhanced design */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div 
              className="group relative p-8 bg-gradient-to-br from-background-primary to-background-primary/50 rounded-xl border-2 border-gold/30 hover:border-gold transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-gold mb-3 font-heading">Develop</h3>
                <p className="text-gray-300 leading-relaxed">
                  Creating innovative solutions with cutting-edge technology, rooted in research and expertise
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative p-8 bg-gradient-to-br from-background-primary to-background-primary/50 rounded-xl border-2 border-teal/30 hover:border-teal transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mb-4 rounded-full bg-teal/10 flex items-center justify-center">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-teal mb-3 font-heading">Fund</h3>
                <p className="text-gray-300 leading-relaxed">
                  Supporting promising projects that drive meaningful change and sustainable growth
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative p-8 bg-gradient-to-br from-background-primary to-background-primary/50 rounded-xl border-2 border-gold/30 hover:border-gold transition-all duration-300 overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-gold mb-3 font-heading">Deploy</h3>
                <p className="text-gray-300 leading-relaxed">
                  Implementing solutions that create lasting real-world impact across multiple domains
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a]/80 via-[#0a0e1a]/40 to-transparent pointer-events-none" />
    </section>
  );
};
