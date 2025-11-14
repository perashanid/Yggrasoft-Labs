import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { NAV_ITEMS, SCROLL_OFFSET } from '../../utils/constants';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  const { y } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isScrolled = y > 50;

  // Track active section based on scroll position with scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background-secondary/95 backdrop-blur-md shadow-lg border-b border-gold/20'
            : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3 text-2xl font-bold text-gold hover:text-gold-light transition-colors font-heading"
            >
              <img src="/assets/favicon.png" alt="Yggrasoft Labs" className="w-8 h-8" />
              Yggrasoft Labs
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={SCROLL_OFFSET}
                  duration={500}
                  className={`text-gray-300 hover:text-gold transition-colors relative group cursor-pointer font-medium ${
                    activeSection === item.id ? 'text-gold' : ''
                  }`}
                  activeClass="text-gold"
                  onSetActive={() => setActiveSection(item.id)}
                  tabIndex={0}
                  role="link"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-300 ${
                      activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gold text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
};
