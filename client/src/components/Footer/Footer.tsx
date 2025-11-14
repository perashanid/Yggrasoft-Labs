import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { subscribeNewsletter } from '../../services/api';
import { motion } from 'framer-motion';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await subscribeNewsletter({ email });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0f1419] to-[#0a0e1a] border-t-2 border-gold/30 overflow-hidden">
      {/* Mystical background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(140,114,49,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(54,82,101,0.05),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/favicon.png" alt="Yggrasoft Labs" className="w-12 h-12" />
              <h3 className="text-2xl font-bold text-gold font-heading">Yggrasoft Labs</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Connecting realms of innovation. Like Yggdrasil, we bridge technology, sustainability, and impact across multiple domains.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-gold" />
                <span className="text-sm">contact@yggrasoft.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-gold" />
                <span className="text-sm">Connecting Globally</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xl font-semibold text-gold mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-300 hover:text-teal transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal transition-all" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-teal transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal transition-all" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('domains')}
                  className="text-gray-300 hover:text-teal transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal transition-all" />
                  Our Domains
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-teal transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal transition-all" />
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Our Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold text-gold mb-6 font-heading">Our Domains</h4>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                Technology & Innovation
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                Sustainability
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                Healthcare Solutions
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                Education & Research
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                Financial Technology
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-gold mb-6 font-heading">Stay Connected</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to receive updates on our latest innovations and projects.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-background-secondary border-2 border-gold/30 rounded focus:border-gold focus:outline-none text-text-primary transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 py-3 bg-gradient-to-r from-teal to-teal-light text-white rounded font-semibold hover:shadow-lg hover:shadow-teal/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status === 'success' && (
                <p className="text-teal text-sm">✓ Successfully subscribed!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">✗ Subscription failed. Try again.</p>
              )}
            </form>

            <div className="flex gap-4 mt-6">
              <a
                href="https://twitter.com/yggrasoftlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="https://linkedin.com/company/yggrasoft-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="https://github.com/yggrasoft-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Yggrasoft Labs. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4 italic">
            "Connecting realms, creating impact, growing together."
          </p>
        </div>
      </div>
    </footer>
  );
};
