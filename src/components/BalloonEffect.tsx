import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BalloonItem } from "../types";

interface BalloonEffectProps {
  isActive: boolean;
}

// A list of sophisticated, formal pastel colors for helium balloons
const BALLOON_COLORS = [
  "#F43F5E", // Rose (rose-500)
  "#3B82F6", // Blue (blue-500)
  "#EAB308", // Yellow (yellow-500)
  "#10B981", // Emerald (emerald-500)
  "#8B5CF6", // Violet (violet-500)
  "#F97316", // Orange (orange-500)
  "#EC4899", // Pink (pink-500)
  "#06B6D4", // Cyan (cyan-500)
];

export default function BalloonEffect({ isActive }: BalloonEffectProps) {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const spawnBalloon = () => {
      const id = Math.random().toString(36).substring(2, 9);
      const size = Math.floor(Math.random() * 12) + 48; // 48px to 60px wide (medium size)
      const x = Math.random() * 90 + 5; // 5% to 95% horizontal (keep away from extreme edges)
      const duration = Math.random() * 2 + 4; // 4.0s to 6.0s floating duration
      const wobble = Math.random() * 40 - 20; // -20px to 20px drift sway
      const opacity = Math.random() * 0.15 + 0.8; // 0.8 to 0.95 opacity
      const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];

      const newItem: BalloonItem = {
        id,
        x,
        size,
        color,
        delay: 0,
        duration,
        wobble,
        opacity,
      };

      setBalloons((prev) => [...prev, newItem]);

      // Self-destruct after finished animating to prevent memory leaks
      setTimeout(() => {
        setBalloons((prev) => prev.filter((item) => item.id !== id));
      }, (duration + 0.5) * 1000);
    };

    // Spawn first immediate batch
    for (let i = 0; i < 4; i++) {
      spawnBalloon();
    }

    // Continuously spawn every 200ms
    const timer = setInterval(spawnBalloon, 200);

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ 
              y: "110vh", 
              x: `${balloon.x}vw`, 
              opacity: 0,
              rotate: Math.random() * 10 - 5
            }}
            animate={{ 
              y: "-20vh", 
              x: [
                `${balloon.x}vw`, 
                `${balloon.x + balloon.wobble / 10}vw`, 
                `${balloon.x - balloon.wobble / 10}vw`, 
                `${balloon.x}vw`
              ],
              opacity: [0, balloon.opacity, balloon.opacity, 0],
              rotate: [Math.random() * 10 - 5, Math.random() * -10 + 5, Math.random() * 10 - 5]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: balloon.duration, 
              ease: "easeOut",
              times: [0, 0.15, 0.85, 1]
            }}
            style={{ 
              position: "absolute",
              width: balloon.size,
              height: balloon.size * 1.4, // balloon is slightly taller than wide
            }}
          >
            {/* SVG Balloon Graphics */}
            <svg 
              viewBox="0 0 60 90" 
              className="w-full h-full drop-shadow-md overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D-like radial lighting gradient */}
                <radialGradient id={`grad-${balloon.id}`} cx="35%" cy="30%" r="60%" fx="35%" fy="30%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="35%" stopColor={balloon.color} />
                  <stop offset="100%" stopColor={balloon.color} stopOpacity="0.85" />
                </radialGradient>
              </defs>
              
              {/* Wavy thin string */}
              <path 
                d="M 30,75 Q 33,83 30,90 T 33,100 T 30,110" 
                fill="none" 
                stroke="#94A3B8" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                className="opacity-70"
              />

              {/* Knot Triangle */}
              <polygon 
                points="27,70 33,70 30,76" 
                fill={balloon.color} 
                className="brightness-90"
              />
              
              {/* Balloon Main Body */}
              <ellipse 
                cx="30" 
                cy="38" 
                rx="23" 
                ry="31" 
                fill={`url(#grad-${balloon.id})`} 
              />

              {/* White glossy shine highlight inside */}
              <ellipse 
                cx="21" 
                cy="25" 
                rx="5" 
                ry="9" 
                fill="#FFFFFF" 
                opacity="0.25"
                transform="rotate(-15 21 25)"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
