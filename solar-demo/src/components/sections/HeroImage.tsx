"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ShieldCheck, Sun, Award } from "lucide-react";
import { heroImage, heroFloatingBadge } from "@/lib/motion-variants";

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isTouch] = useState(() =>
    typeof window !== "undefined"
      ? "ontouchstart" in window || navigator.maxTouchPoints > 0
      : false
  );

  const disableParallax = isTouch || !!prefersReducedMotion;

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  /* Hover tilt — refined mouse position for subtle 3D perspective */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Reduced range: ±2° (down from ±4°) for max 10-15px movement
  const rotateXSpring = useSpring(
    useTransform(mouseY, [0, 0.5, 1], [2, 0, -2]),
    { stiffness: 120, damping: 20 }
  );
  const rotateYSpring = useSpring(
    useTransform(mouseX, [0, 0.5, 1], [-2, 0, 2]),
    { stiffness: 120, damping: 20 }
  );

  // Subtle translateZ depth
  const translateZ = useSpring(
    useTransform(mouseY, [0, 0.5, 1], [-4, 0, 4]),
    { stiffness: 100, damping: 20 }
  );

  const glareX = useMotionTemplate`${useTransform(mouseX, [0, 1], [0, 100])}%`;
  const glareY = useMotionTemplate`${useTransform(mouseY, [0, 1], [0, 100])}%`;

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (disableParallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={containerRef}
      variants={heroImage}
      initial="hidden"
      animate="visible"
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient shadow beneath the frame — deeper, more realistic */}
      <div
        className="absolute -bottom-8 left-[5%] right-[5%] h-[50px] opacity-[0.14] blur-[30px]"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(10,22,40,0.7), transparent 70%)" }}
      />

      {/* Secondary soft shadow for depth layering */}
      <div
        className="absolute -bottom-4 left-[12%] right-[12%] h-[30px] opacity-[0.06] blur-[20px]"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.5), transparent 70%)" }}
      />

      {/* Main frame wrapper — applies tilt on hover */}
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: disableParallax ? 0 : rotateXSpring,
          rotateY: disableParallax ? 0 : rotateYSpring,
          translateZ: disableParallax ? 0 : translateZ,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl"
      >
        {/* Outer glass border frame — premium layered border */}
        <div className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(10,22,40,0.03)"
          }}
        />

        {/* Outer decorative ring — subtle premium frame */}
        <div className="absolute -inset-1 z-10 rounded-[18px] pointer-events-none opacity-40"
          style={{
            border: "1px solid rgba(226,232,240,0.3)",
          }}
        />

        {/* Image container with floating animation */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[16/11]"
        >
          {/* The actual image */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="h-full w-full"
          >
            <div
              role="img"
              aria-label="Solar panels installed on a residential rooftop under clear sky"
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80')",
              }}
            />
          </motion.div>

          {/* Gradient fade — bottom edge blends into page */}
          <div
            className="absolute inset-0 z-[3]"
            style={{
              background: `
                linear-gradient(180deg, transparent 35%, rgba(241,245,249,0.25) 80%, rgba(241,245,249,0.9) 100%),
                linear-gradient(0deg, transparent 55%, rgba(241,245,249,0.1) 100%)
              `,
            }}
          />

          {/* Warm gold overlay — subtle solar warmth */}
          <div className="absolute inset-0 z-[4]"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(212,168,67,0.05) 0%, transparent 60%)",
            }}
          />

          {/* Top edge vignette — depth */}
          <div className="absolute inset-x-0 top-0 z-[4] h-[30%]"
            style={{
              background: "linear-gradient(180deg, rgba(10,22,40,0.06) 0%, transparent 100%)",
            }}
          />

          {/* Reflection overlay — horizontal sheen near bottom */}
          <div
            className="absolute inset-x-0 bottom-0 z-[5] h-[35%]"
            style={{
              background: "linear-gradient(180deg, transparent 20%, rgba(255,255,255,0.05) 100%)",
            }}
          />

          {/* Mouse-tracking glare (desktop only) */}
          {!disableParallax && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-[6] opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{
                background: useMotionTemplate`radial-gradient(circle 200px at ${glareX} ${glareY}, rgba(255,255,255,0.1), transparent)`,
              }}
            />
          )}

        </motion.div>
      </motion.div>

      {/* ─── Floating Badges — breathing animation after entrance ─── */}
      {/* Top-left: MNRE Certified — 4s breathing cycle */}
      <motion.div
        variants={heroFloatingBadge}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
        className="floating-badge floating-badge-dark absolute top-5 left-5 z-10 md:top-7 md:left-7"
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          MNRE Certified
        </motion.div>
      </motion.div>

      {/* Top-right: 25-Year Warranty — 5s breathing cycle, delayed */}
      <motion.div
        variants={heroFloatingBadge}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
        className="floating-badge floating-badge-gold absolute top-5 right-5 z-10 md:top-7 md:right-7"
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, -4, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex items-center gap-1.5"
        >
          <Award className="h-3.5 w-3.5" />
          25-Year Warranty
        </motion.div>
      </motion.div>

      {/* Bottom-left: Tier-1 Panels — 3.5s breathing cycle, offset */}
      <motion.div
        variants={heroFloatingBadge}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.6 }}
        className="floating-badge floating-badge-white absolute bottom-20 left-5 z-10 md:bottom-24 md:left-7"
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, -2.5, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="flex items-center gap-1.5"
        >
          <Sun className="h-3.5 w-3.5 text-gold" />
          Tier-1 Panels
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
