import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export const MobileMenu = ({ isOpen, onClose, onNavigate }: MobileMenuProps) => {
  // Close menu on escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-background-primary md:hidden overflow-hidden"
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Tree branch decoration SVG */}
          <svg
            className="absolute top-0 right-0 w-64 h-64 opacity-10"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 200 L100 100 L150 50 M100 100 L50 50 M100 100 L100 0"
              stroke="#8C7231"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="150" cy="50" r="8" fill="#365265" />
            <circle cx="50" cy="50" r="8" fill="#365265" />
            <circle cx="100" cy="0" r="8" fill="#8C7231" />
          </svg>

          <svg
            className="absolute bottom-0 left-0 w-64 h-64 opacity-10 rotate-180"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 200 L100 100 L150 50 M100 100 L50 50"
              stroke="#365265"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="150" cy="50" r="8" fill="#8C7231" />
            <circle cx="50" cy="50" r="8" fill="#8C7231" />
          </svg>

          {/* Menu content */}
          <div className="flex flex-col items-center justify-center h-full space-y-8 relative z-10">
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                className="text-3xl font-semibold text-gold hover:text-gold-light transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-teal transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
