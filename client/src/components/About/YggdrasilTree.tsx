import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const YggdrasilTree = () => {
  const treeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: treeRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect - tree moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Animation variants for growing branches
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          delay: custom * 0.3,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.5,
          delay: custom * 0.3,
        },
      },
    }),
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: custom * 0.3 + 1,
        ease: 'backOut',
      },
    }),
  };

  return (
    <motion.div
      ref={treeRef}
      style={{ y }}
      className="w-full max-w-lg mx-auto"
    >
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Glowing background circles for mystical effect */}
        <defs>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8C7231" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8C7231" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tealGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#365265" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#365265" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="200" cy="250" r="180" fill="url(#goldGlow)" opacity="0.4" />
        {/* Roots - more organic and spreading */}
        <motion.path
          d="M200 450 L200 480 M200 480 L150 500 M200 480 L250 500 M200 480 L180 500 M200 480 L220 500 M150 500 L130 510 M250 500 L270 510"
          stroke="#365265"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={0}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Main trunk - thicker and more prominent */}
        <motion.path
          d="M200 450 L200 250"
          stroke="#8C7231"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={0.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        
        {/* Trunk texture lines */}
        <motion.path
          d="M195 420 L195 280 M205 410 L205 270"
          stroke="#5d1B2C"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
          custom={0.6}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Lower branches - more elaborate */}
        <motion.path
          d="M200 400 L150 380 L120 360 M150 380 L140 400"
          stroke="#8C7231"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={1}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M200 400 L250 380 L280 360 M250 380 L260 400"
          stroke="#8C7231"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={1}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Middle branches - more organic */}
        <motion.path
          d="M200 320 L140 300 L100 280 M140 300 L130 320"
          stroke="#8C7231"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={1.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M200 320 L260 300 L300 280 M260 300 L270 320"
          stroke="#8C7231"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={1.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Upper branches - spreading wide */}
        <motion.path
          d="M200 250 L160 220 L140 190 M160 220 L150 240"
          stroke="#8C7231"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={2}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M200 250 L240 220 L260 190 M240 220 L250 240"
          stroke="#8C7231"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={2}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Top branches - reaching for the sky */}
        <motion.path
          d="M200 250 L180 200 L170 160 M180 200 L175 220"
          stroke="#8C7231"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={2.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M200 250 L220 200 L230 160 M220 200 L225 220"
          stroke="#8C7231"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={2.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.path
          d="M200 250 L200 180 L200 140 M200 180 L190 200 M200 180 L210 200"
          stroke="#8C7231"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          custom={2.5}
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Value labels with enhanced circles and glow */}
        {/* Innovation */}
        <motion.circle
          cx="120"
          cy="360"
          r="15"
          fill="#365265"
          filter="url(#glow)"
          custom={2}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.circle
          cx="120"
          cy="360"
          r="10"
          fill="#4A7A8A"
          custom={2.2}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.text
          x="120"
          y="335"
          textAnchor="middle"
          fill="#A89048"
          fontSize="15"
          fontWeight="bold"
          custom={2.5}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Innovation
        </motion.text>

        {/* Impact */}
        <motion.circle
          cx="280"
          cy="360"
          r="15"
          fill="#365265"
          filter="url(#glow)"
          custom={2}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.circle
          cx="280"
          cy="360"
          r="10"
          fill="#4A7A8A"
          custom={2.2}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.text
          x="280"
          y="335"
          textAnchor="middle"
          fill="#A89048"
          fontSize="15"
          fontWeight="bold"
          custom={2.5}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Impact
        </motion.text>

        {/* Collaboration */}
        <motion.circle
          cx="100"
          cy="280"
          r="15"
          fill="#8C7231"
          filter="url(#glow)"
          custom={2.5}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.circle
          cx="100"
          cy="280"
          r="10"
          fill="#A89048"
          custom={2.7}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.text
          x="100"
          y="255"
          textAnchor="middle"
          fill="#A89048"
          fontSize="15"
          fontWeight="bold"
          custom={3}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Collaboration
        </motion.text>

        {/* Excellence */}
        <motion.circle
          cx="300"
          cy="280"
          r="15"
          fill="#8C7231"
          filter="url(#glow)"
          custom={2.5}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.circle
          cx="300"
          cy="280"
          r="10"
          fill="#A89048"
          custom={2.7}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.text
          x="300"
          y="255"
          textAnchor="middle"
          fill="#A89048"
          fontSize="15"
          fontWeight="bold"
          custom={3}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Excellence
        </motion.text>

        {/* Growth */}
        <motion.circle
          cx="200"
          cy="140"
          r="15"
          fill="#365265"
          filter="url(#glow)"
          custom={3}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.circle
          cx="200"
          cy="140"
          r="10"
          fill="#4A7A8A"
          custom={3.2}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        <motion.text
          x="200"
          y="115"
          textAnchor="middle"
          fill="#A89048"
          fontSize="15"
          fontWeight="bold"
          custom={3.5}
          variants={circleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Growth
        </motion.text>
      </svg>
    </motion.div>
  );
};
