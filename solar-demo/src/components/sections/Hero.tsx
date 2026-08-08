"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import ScrollIndicator from "./ScrollIndicator";
import PartnerLogos from "./PartnerLogos";

/* ─── SunlightBeam — slow GSAP-animated diagonal light ─── */
function SunlightBeam() {
  const beamRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !beamRef.current) return;

    const beam = beamRef.current;

    // Start position — off-screen top-right
    gsap.set(beam, {
      x: "30vw",
      y: "-40vh",
      rotation: 30,
      opacity: 0,
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(beam, {
      x: "-20vw",
      y: "60vh",
      opacity: 1,
      duration: 12.5,
      ease: "none",
    })
    .to(beam, {
      x: "-40vw",
      y: "100vh",
      opacity: 0,
      duration: 12.5,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className="sunlight-beam"
        style={{
          top: "10%",
          right: "15%",
          transform: "translate(20%, 20%) rotate(30deg)",
          opacity: 0.03,
        }}
      />
    );
  }

  return (
    <div
      ref={beamRef}
      className="sunlight-beam"
      style={{ top: 0, right: 0 }}
    />
  );
}

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

  /* ─── Layered Depth — different scroll speeds per layer ─── */
  // Background layer (gradient mesh) — slowest
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  // Midground layer (radial lighting) — medium
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  // Foreground layer (solar glow) — fastest
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  /* ─── Hero Exit — content stays readable, depth separates ─── */
  // Headline stays pinned (zero movement)
  const headlineY = useTransform(scrollYProgress, [0, 0.5], [0, 0]);
  // Image exits slightly faster for depth separation
  const imageExitY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cloud"
    >
      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Premium gradient mesh (base, slowest)
          ═══════════════════════════════════════════════════════ */}
      <motion.div style={{ y: bgY1 }} className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(212,168,67,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 70% 50% at 80% 20%, rgba(232,192,102,0.06) 0%, transparent 55%),
              radial-gradient(ellipse 90% 70% at 50% 50%, rgba(241,245,249,1) 0%, #F1F5F9 100%)
            `,
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — Soft radial lighting (medium speed)
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY2 }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div
          className="absolute -top-[20%] -right-[10%] h-[1000px] w-[1000px] rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,192,102,0.6) 0%, rgba(212,168,67,0.2) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Large blurred solar glow (fastest)
          ═══════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY3, scale: bgScale }}
        className="pointer-events-none absolute inset-0 z-[2]"
      >
        <div
          className="absolute top-[15%] left-[5%] h-[700px] w-[700px] rounded-full opacity-[0.06] blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,67,0.8) 0%, rgba(196,154,56,0.3) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 — Sunlight beam (GSAP-animated)
          ═══════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <SunlightBeam />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 5 — Ultra-light noise texture
          ═══════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 z-[4] noise-overlay opacity-[0.15]" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 6 — Extremely subtle engineering grid
          ═══════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,22,40,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,22,40,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 7 — Floating light particles
          ═══════════════════════════════════════════════════════ */}
      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT — z-10 above all background layers
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-4 lg:px-12 lg:pt-44 xl:pt-48">
        {/* Desktop: Side by side / Mobile: Stacked */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 xl:gap-28">
          {/* Left Column — Content (stays readable on scroll) */}
          <motion.div style={{ y: headlineY }} className="flex flex-1 flex-col">
            <HeroContent />
          </motion.div>

          {/* Right Column — Image (exits with depth) */}
          <motion.div style={{ y: imageExitY }} className="flex-1 lg:max-w-[55%]">
            <HeroImage />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Partner Logos Strip */}
      <PartnerLogos />
    </section>
  );
}
