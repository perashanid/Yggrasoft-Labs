import { motion, useScroll, useTransform } from 'framer-motion';

export const YggdrasilBackground = () => {
  const { scrollYProgress } = useScroll();

  // Parallax effects for different parts of the tree
  const rootsY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const trunkY = useTransform(scrollYProgress, [0, 0.5], [50, -50]);
  const branchesY = useTransform(scrollYProgress, [0.3, 1], [0, -100]);
  const leavesOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  // Growth animation for the tree
  const pathLength = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 5000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for depth */}
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a3f2a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8C7231" stopOpacity="1" />
            <stop offset="100%" stopColor="#4a3f2a" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C7231" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#A89048" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8C7231" stopOpacity="0.4" />
          </linearGradient>

          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8C7231" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8C7231" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8C7231" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="leafGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A89048" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#365265" stopOpacity="0" />
          </radialGradient>

          {/* Filters for 3D effect */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="4" dy="8" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background mystical glow */}
        <motion.circle
          cx="960"
          cy="2500"
          r="800"
          fill="url(#glowGradient)"
          style={{ opacity: leavesOpacity }}
        />

        {/* ROOTS - Bottom section (Contact area) */}
        <motion.g style={{ y: rootsY }} opacity="0.6">
          {/* Main root system */}
          <motion.path
            d="M960 4800 L960 4600"
            stroke="url(#trunkGradient)"
            strokeWidth="40"
            strokeLinecap="round"
            filter="url(#shadow)"
            style={{ pathLength }}
          />
          
          {/* Root branches spreading */}
          <motion.path
            d="M960 4600 Q800 4500 600 4400 M960 4600 Q1120 4500 1320 4400"
            stroke="#4a3f2a"
            strokeWidth="25"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
            filter="url(#shadow)"
          />
          
          <motion.path
            d="M600 4400 Q500 4350 400 4300 M600 4400 Q650 4450 700 4500"
            stroke="#4a3f2a"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          
          <motion.path
            d="M1320 4400 Q1420 4350 1520 4300 M1320 4400 Q1270 4450 1220 4500"
            stroke="#4a3f2a"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Fine root details */}
          <motion.path
            d="M400 4300 L300 4250 M700 4500 L750 4550 M1520 4300 L1620 4250 M1220 4500 L1170 4550"
            stroke="#365265"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.4"
          />
        </motion.g>

        {/* MAIN TRUNK - Runs through all sections */}
        <motion.g style={{ y: trunkY }}>
          {/* Central trunk with texture */}
          <motion.path
            d="M960 4600 Q950 3500 960 2500 Q970 1500 960 500"
            stroke="url(#trunkGradient)"
            strokeWidth="60"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
            style={{ pathLength }}
          />

          {/* Trunk texture lines for 3D effect */}
          <motion.path
            d="M940 4500 Q935 3500 940 2500 Q945 1500 940 600"
            stroke="#4a3f2a"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
          
          <motion.path
            d="M980 4500 Q985 3500 980 2500 Q975 1500 980 600"
            stroke="#A89048"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />

          {/* Bark texture details */}
          {[...Array(20)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx={960 + (Math.random() - 0.5) * 40}
              cy={600 + i * 200}
              rx="8"
              ry="4"
              fill="#4a3f2a"
              opacity="0.2"
            />
          ))}
        </motion.g>

        {/* LOWER BRANCHES - Domain section */}
        <motion.g style={{ y: branchesY }} opacity="0.7">
          {/* Left side branches */}
          <motion.path
            d="M960 3500 Q800 3400 600 3300 Q500 3250 400 3200"
            stroke="url(#branchGradient)"
            strokeWidth="35"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />
          
          <motion.path
            d="M960 3200 Q750 3100 550 3000 Q450 2950 350 2900"
            stroke="url(#branchGradient)"
            strokeWidth="30"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          <motion.path
            d="M960 2900 Q800 2850 650 2800 Q550 2770 450 2750"
            stroke="url(#branchGradient)"
            strokeWidth="25"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          {/* Right side branches */}
          <motion.path
            d="M960 3500 Q1120 3400 1320 3300 Q1420 3250 1520 3200"
            stroke="url(#branchGradient)"
            strokeWidth="35"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />
          
          <motion.path
            d="M960 3200 Q1170 3100 1370 3000 Q1470 2950 1570 2900"
            stroke="url(#branchGradient)"
            strokeWidth="30"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          <motion.path
            d="M960 2900 Q1120 2850 1270 2800 Q1370 2770 1470 2750"
            stroke="url(#branchGradient)"
            strokeWidth="25"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          {/* Secondary branches */}
          <motion.path
            d="M600 3300 Q550 3250 500 3200 M600 3300 Q620 3350 640 3400"
            stroke="#8C7231"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          <motion.path
            d="M1320 3300 Q1370 3250 1420 3200 M1320 3300 Q1300 3350 1280 3400"
            stroke="#8C7231"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </motion.g>

        {/* MIDDLE BRANCHES - About section */}
        <motion.g style={{ y: branchesY }} opacity="0.8">
          <motion.path
            d="M960 2200 Q700 2100 500 2000 Q400 1950 300 1900"
            stroke="url(#branchGradient)"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          <motion.path
            d="M960 2200 Q1220 2100 1420 2000 Q1520 1950 1620 1900"
            stroke="url(#branchGradient)"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          <motion.path
            d="M960 1800 Q750 1700 600 1600 Q500 1550 400 1500"
            stroke="url(#branchGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          <motion.path
            d="M960 1800 Q1170 1700 1320 1600 Q1420 1550 1520 1500"
            stroke="url(#branchGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
            filter="url(#shadow)"
          />

          {/* Tertiary branches with leaves */}
          {[
            { x1: 500, y1: 2000, x2: 450, y2: 1950 },
            { x1: 500, y1: 2000, x2: 520, y2: 2050 },
            { x1: 1420, y1: 2000, x2: 1470, y2: 1950 },
            { x1: 1420, y1: 2000, x2: 1400, y2: 2050 },
          ].map((branch, i) => (
            <g key={i}>
              <motion.path
                d={`M${branch.x1} ${branch.y1} L${branch.x2} ${branch.y2}`}
                stroke="#8C7231"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.5"
              />
              <motion.circle
                cx={branch.x2}
                cy={branch.y2}
                r="20"
                fill="url(#leafGlow)"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          ))}
        </motion.g>

        {/* UPPER BRANCHES & CANOPY - Hero section */}
        <motion.g style={{ y: branchesY }} opacity="0.9">
          {/* Wide spreading canopy */}
          <motion.path
            d="M960 1200 Q650 1100 400 1000 Q250 950 100 900"
            stroke="url(#branchGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          <motion.path
            d="M960 1200 Q1270 1100 1520 1000 Q1670 950 1820 900"
            stroke="url(#branchGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          <motion.path
            d="M960 900 Q700 800 500 700 Q350 650 200 600"
            stroke="url(#branchGradient)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          <motion.path
            d="M960 900 Q1220 800 1420 700 Q1570 650 1720 600"
            stroke="url(#branchGradient)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          {/* Top crown */}
          <motion.path
            d="M960 600 Q860 500 760 400 M960 600 Q1060 500 1160 400"
            stroke="url(#branchGradient)"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          <motion.path
            d="M960 600 Q940 450 920 300 M960 600 Q980 450 1000 300"
            stroke="url(#branchGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          {/* Mystical leaves/energy particles in canopy */}
          {[...Array(30)].map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 300 + Math.random() * 200;
            const cx = 960 + Math.cos(angle) * radius;
            const cy = 800 + Math.sin(angle) * radius * 0.5;
            
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={4 + Math.random() * 6}
                fill={i % 2 === 0 ? "#A89048" : "#365265"}
                opacity="0.4"
                filter="url(#glow)"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.g>

        {/* Mystical runes/symbols on trunk */}
        {[
          { y: 1500, symbol: "ᚨ" },
          { y: 2000, symbol: "ᚱ" },
          { y: 2500, symbol: "ᛏ" },
          { y: 3000, symbol: "ᚺ" },
          { y: 3500, symbol: "ᛉ" },
        ].map((rune, i) => (
          <motion.text
            key={i}
            x="960"
            y={rune.y}
            textAnchor="middle"
            fill="#A89048"
            fontSize="40"
            opacity="0.2"
            fontFamily="serif"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {rune.symbol}
          </motion.text>
        ))}

        {/* Energy flowing up the tree */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`energy-${i}`}
            cx="960"
            cy="4800"
            r="6"
            fill="#A89048"
            opacity="0.6"
            filter="url(#glow)"
            animate={{
              cy: [4800, 300],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating leaves/particles around branches */}
        {[...Array(40)].map((_, i) => {
          const side = i % 2 === 0 ? -1 : 1;
          const baseX = 960 + side * (200 + Math.random() * 400);
          const baseY = 1000 + Math.random() * 2500;
          
          return (
            <motion.path
              key={`leaf-${i}`}
              d="M0,0 Q5,-5 10,0 Q5,5 0,0"
              fill={i % 3 === 0 ? "#A89048" : "#365265"}
              opacity="0.3"
              transform={`translate(${baseX}, ${baseY}) rotate(${Math.random() * 360})`}
              animate={{
                x: [0, side * 20, 0],
                y: [0, -30, -60],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Birds flying around the canopy */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`bird-${i}`}
            d="M-10,0 Q-5,-3 0,0 Q5,-3 10,0"
            stroke="#8C7231"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            animate={{
              x: [100, 1820],
              y: [600 + i * 100, 650 + i * 100, 600 + i * 100],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
