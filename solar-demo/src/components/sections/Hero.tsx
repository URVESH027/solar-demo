"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import ScrollIndicator from "./ScrollIndicator";
import PartnerLogos from "./PartnerLogos";

/* ─── Particle — tiny floating light orbs ─── */
function Particle({
  size,
  x,
  y,
  delay,
  duration,
  opacity,
}: {
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        scale: [0.4, 1, 1, 0.4],
        y: [0, -30, -60, -90],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── FloatingParticles — scattered light motes ─── */
function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  const particles = [
    { size: 3, x: 15, y: 30, delay: 0, duration: 9, opacity: 0.18 },
    { size: 2, x: 70, y: 50, delay: 2, duration: 11, opacity: 0.15 },
    { size: 3, x: 85, y: 25, delay: 3.5, duration: 9, opacity: 0.15 },
    { size: 2, x: 35, y: 75, delay: 5, duration: 10, opacity: 0.12 },
    { size: 2, x: 55, y: 40, delay: 1, duration: 10, opacity: 0.12 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax for background layers — subtle depth on scroll */
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cloud"
    >
      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Premium gradient mesh (base)
          ═══════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(212,168,67,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 80% 20%, rgba(232,192,102,0.05) 0%, transparent 55%),
              radial-gradient(ellipse 90% 70% at 50% 50%, rgba(241,245,249,1) 0%, #F1F5F9 100%)
            `,
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — Soft radial lighting (top-right sunlight)
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY1 }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div
          className="absolute -top-[20%] -right-[10%] h-[800px] w-[800px] rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,192,102,0.6) 0%, rgba(212,168,67,0.2) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Large blurred solar glow (center-left warmth)
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY2, scale: bgScale }}
        className="pointer-events-none absolute inset-0 z-[2]"
      >
        <div
          className="absolute top-[15%] left-[5%] h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.8) 0%, rgba(196,154,56,0.3) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 — Ultra-light noise texture
          ═══════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 z-[4] noise-overlay opacity-[0.2]" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 5 — Extremely subtle engineering grid
          ═══════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,22,40,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,22,40,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 6 — Floating light particles
          ═══════════════════════════════════════════════════════ */}
      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT — z-10 above all background layers
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-4 lg:px-12 lg:pt-32">
        {/* Desktop: Side by side / Mobile: Stacked */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          {/* Left Column — Content */}
          <div className="flex flex-1 flex-col">
            <HeroContent />
          </div>

          {/* Right Column — Image */}
          <div className="flex-1 lg:max-w-[55%]">
            <HeroImage />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Partner Logos Strip */}
      <PartnerLogos />
    </section>
  );
}
