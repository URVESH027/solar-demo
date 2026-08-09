"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const emptySubscribe = () => () => {};
  const isTouch = useSyncExternalStore(
    emptySubscribe,
    () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0,
    () => false,
  );

  const disableParallax = isTouch || !!prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 30 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.0, ease, delay: 0.4 }}
      className="relative"
    >
      {/* Main image — no rounded card, architectural */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
          <motion.div
            style={{ y: disableParallax ? 0 : imageY, scale: disableParallax ? 1 : imageScale }}
            className="h-full w-full"
          >
            <div
              role="img"
              aria-label="Modern residential property with rooftop solar panels at sunset"
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80')",
              }}
            />
          </motion.div>

          {/* Cinematic gradient overlays */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background: `
                linear-gradient(180deg, rgba(7,26,43,0.3) 0%, transparent 40%, rgba(7,26,43,0.6) 100%),
                linear-gradient(90deg, rgba(7,26,43,0.4) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        {/* Border frame */}
        <div
          className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </div>
    </motion.div>
  );
}
