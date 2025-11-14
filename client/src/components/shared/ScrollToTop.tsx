import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const ScrollToTop = () => {
  const { y } = useScrollPosition();
  const isVisible = y > window.innerHeight;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-gold to-gold-dark text-background-primary rounded-full shadow-2xl hover:shadow-gold/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background-primary backdrop-blur-sm border-2 border-gold-light/30"
          aria-label="Scroll back to top of the tree"
          whileHover={{ 
            scale: 1.15,
            boxShadow: "0 0 30px rgba(140, 114, 49, 0.6)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
