import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button } from '../shared/Button';
import { submitContact } from '../../services/api';
import { ContactFormData } from '../../types';
import { fadeInUp, staggerContainer } from '../../styles/theme';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContact(data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-background-secondary/60 backdrop-blur-sm overflow-hidden">
      {/* Gradient overlay to blend with tree roots */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-secondary/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold text-gold text-center mb-6 font-heading"
          >
            Connect With Us
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gold-light text-center mb-4 font-accent"
          >
            Reach Across the Realms
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-300 text-center mb-16 max-w-2xl mx-auto"
          >
            Whether you have a question, want to collaborate, or explore opportunities,
            we're here to connect and grow together.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:items-start">
            <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gold mb-2 font-semibold">
                    Name *
                  </label>
                  <input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 bg-background-secondary border-2 border-gold/30 rounded focus:border-gold focus:outline-none text-text-primary transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gold mb-2 font-semibold">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3 bg-background-secondary border-2 border-gold/30 rounded focus:border-gold focus:outline-none text-text-primary transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gold mb-2 font-semibold">
                    Subject
                  </label>
                  <input
                    id="subject"
                    {...register('subject')}
                    className="w-full px-4 py-3 bg-background-secondary border-2 border-gold/30 rounded focus:border-gold focus:outline-none text-text-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gold mb-2 font-semibold">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    className="w-full px-4 py-3 bg-background-secondary border-2 border-gold/30 rounded focus:border-gold focus:outline-none text-text-primary resize-none transition-colors"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" loading={isSubmitting} className="w-full">
                  Send Message
                </Button>

                {submitStatus === 'success' && (
                  <p className="text-teal text-center">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gradient-to-br from-background-secondary to-background-secondary/80 px-8 pt-2 pb-8 rounded-xl border-2 border-gold/30 hover:border-gold transition-all mystical-glow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-gold text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold text-lg mb-2 font-heading">Email</h3>
                    <p className="text-gray-300">contact@yggrasoft.com</p>
                    <p className="text-sm text-gray-400 mt-2">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-background-secondary to-background-secondary/80 p-8 rounded-xl border-2 border-teal/30 hover:border-teal transition-all mystical-glow">
                <h3 className="text-teal font-semibold text-lg mb-4 font-heading">Follow Our Journey</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Stay connected as we grow and expand across new realms
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/yggrasoftlabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a
                    href="https://linkedin.com/company/yggrasoft-labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href="https://github.com/yggrasoft-labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gold/5 to-transparent p-6 rounded-xl border border-gold/20">
                <p className="text-gold-light italic text-sm leading-relaxed">
                  "Just as Yggdrasil connects the nine realms, we believe in the power of
                  connection and collaboration to create meaningful change."
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
