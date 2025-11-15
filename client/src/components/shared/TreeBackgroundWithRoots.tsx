import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TreeBackgroundWithRootsProps {
  imagePath: string;
}

export const TreeBackgroundWithRoots = ({ imagePath }: TreeBackgroundWithRootsProps) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Get the hero section height
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      setHeroHeight(heroElement.offsetHeight);
    }
  }, []);

  // Calculate total scrollable height for the tree journey
  const totalScrollHeight = typeof document !== 'undefined' 
    ? document.documentElement.scrollHeight - window.innerHeight 
    : 3000;

  // Tree moves UP as you scroll DOWN, creating a camera pan effect from top to bottom
  // Start showing the top of the tree (branches), end showing the bottom (roots)
  const y = useTransform(
    scrollY,
    [heroHeight, totalScrollHeight],
    [0, -1000] // Move tree image UP to reveal lower parts
  );

  // Fade in the tree as you leave the hero section
  const opacity = useTransform(
    scrollY,
    [heroHeight * 0.7, heroHeight, totalScrollHeight * 0.9],
    [0, 0.7, 0.7]
  );

  return (
    <>
      {/* Fixed positioned tree that stays in viewport but only visible after hero */}
      <div 
        className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none z-0"
        style={{ 
          height: '100vh',
        }}
      >
        <div className="absolute inset-0 overflow-hidden flex items-start justify-center">
          <motion.img
            src={imagePath}
            alt="Yggdrasil Tree"
            style={{ 
              y, 
              opacity,
              filter: 'drop-shadow(0 0 60px rgba(140, 114, 49, 0.4)) brightness(1.1)',
            }}
            className="min-w-full w-auto h-[250vh] max-w-none object-cover"
          />
        </div>

        {/* Gradient overlays for depth and blending - reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/40 via-background-primary/10 to-background-primary/30 pointer-events-none" />
        {/* Strong side gradients to hide black edges and blend with background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background-primary via-transparent to-background-primary pointer-events-none" />
      </div>
    </>
  );
};
