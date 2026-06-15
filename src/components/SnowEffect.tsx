import { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SnowflakeItem } from "../types";

interface SnowEffectProps {
  isActive: boolean;
}

export default function SnowEffect({ isActive }: SnowEffectProps) {
  const [snowflakes, setSnowflakes] = useState<SnowflakeItem[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Create a new snowflake item
    const spawnSnowflake = () => {
      const id = Math.random().toString(36).substring(2, 9);
      const size = Math.floor(Math.random() * 8) + 20; // 20px to 28px (medium size)
      const x = Math.random() * 100; // 0% to 100% horizontal
      const duration = Math.random() * 1.5 + 3.5; // 3.5s to 5.0s fall duration
      const wobble = Math.random() * 30 - 15; // -15px to 15px drift sway
      const opacity = Math.random() * 0.3 + 0.6; // 0.6 to 0.9 opacity

      const newItem: SnowflakeItem = {
        id,
        x,
        size,
        delay: 0,
        duration,
        wobble,
        opacity,
      };

      setSnowflakes((prev) => [...prev, newItem]);

      // Self-destruct after finished animating to prevent memory leaks
      setTimeout(() => {
        setSnowflakes((prev) => prev.filter((item) => item.id !== id));
      }, (duration + 0.5) * 1000);
    };

    // Spawn first immediate batch
    for (let i = 0; i < 5; i++) {
      spawnSnowflake();
    }

    // Continuously spawn every 150ms
    const timer = setInterval(spawnSnowflake, 150);

    return () => {
      clearInterval(timer);
    };
  }, [isActive]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            initial={{ 
              y: "-5vh", 
              x: `${flake.x}vw`, 
              opacity: 0,
              rotate: 0 
            }}
            animate={{ 
              y: "105vh", 
              x: [`${flake.x}vw`, `${flake.x + flake.wobble / 10}vw`, `${flake.x - flake.wobble / 10}vw`, `${flake.x}vw`],
              opacity: [0, flake.opacity, flake.opacity, 0],
              rotate: 360
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: flake.duration, 
              ease: "linear",
              times: [0, 0.2, 0.8, 1]
            }}
            style={{ 
              position: "absolute",
              width: flake.size,
              height: flake.size,
            }}
          >
            <Snowflake 
              className="text-sky-300 drop-shadow-[0_2px_8px_rgba(186,230,253,0.5)]" 
              style={{ width: flake.size, height: flake.size }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
