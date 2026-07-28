"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Shared radial lighting that shifts with scroll ─── */
function SharedLighting() {
  const { scrollYProgress } = useScroll();

  /* Light moves from top-right to center as user scrolls */
  const lightX = useTransform(scrollYProgress, [0, 0.5, 1], ["75%", "50%", "30%"]);
  const lightY = useTransform(scrollYProgress, [0, 0.5, 1], ["5%", "30%", "60%"]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.04, 0.03, 0.02, 0.015]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ x: lightX, y: lightY, opacity: lightOpacity }}
    >
      <div
        className="h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.6) 0%, rgba(212,168,67,0.15) 35%, transparent 65%)",
        }}
      />
    </motion.div>
  );
}

/* ─── Floating particles across the entire page ─── */
function GlobalParticles() {
  const particles = [
    { size: 2, x: 10, y: 20, delay: 0, duration: 12, opacity: 0.08 },
    { size: 3, x: 45, y: 45, delay: 2, duration: 14, opacity: 0.06 },
    { size: 2, x: 75, y: 30, delay: 4, duration: 11, opacity: 0.06 },
    { size: 2, x: 30, y: 80, delay: 1, duration: 13, opacity: 0.05 },
    { size: 2, x: 60, y: 65, delay: 3, duration: 12, opacity: 0.05 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: [0, -20, -40, -60],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Engineering grid that fades with scroll ─── */
function EngineeringGrid() {
  const { scrollYProgress } = useScroll();
  const gridOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.01, 0.015, 0.01, 0.008]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[0]"
      style={{
        opacity: gridOpacity,
        backgroundImage: `
          linear-gradient(rgba(10,22,40,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(10,22,40,0.4) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

export default function ScrollAtmosphere() {
  return (
    <>
      <EngineeringGrid />
      <SharedLighting />
      <GlobalParticles />
    </>
  );
}
