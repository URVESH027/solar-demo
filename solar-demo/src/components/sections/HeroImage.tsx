"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useState } from "react";
import { easeOutExpo } from "@/lib/animations";

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch] = useState(() =>
    typeof window !== "undefined"
      ? "ontouchstart" in window || navigator.maxTouchPoints > 0
      : false
  );

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  /* Hover tilt — mouse position for 3D perspective */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(
    useTransform(mouseY, [0, 0.5, 1], [4, 0, -4]),
    { stiffness: 120, damping: 20 }
  );
  const rotateYSpring = useSpring(
    useTransform(mouseX, [0, 0.5, 1], [-4, 0, 4]),
    { stiffness: 120, damping: 20 }
  );

  const glareX = useMotionTemplate`${useTransform(mouseX, [0, 1], [0, 100])}%`;
  const glareY = useMotionTemplate`${useTransform(mouseY, [0, 1], [0, 100])}%`;

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch) return;
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
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOutExpo, delay: 0.4 }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient shadow beneath the frame */}
      <div
        className="absolute -bottom-6 left-[8%] right-[8%] h-[40px] opacity-[0.12] blur-[24px]"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(10,22,40,0.6), transparent 70%)" }}
      />

      {/* Main frame wrapper — applies tilt on hover */}
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isTouch ? 0 : rotateXSpring,
          rotateY: isTouch ? 0 : rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-sm"
      >
        {/* Glass border frame */}
        <div className="absolute inset-0 z-20 rounded-sm border border-white/50 shadow-lg pointer-events-none" />

        {/* Image container with floating animation */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-[16/11]"
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
                linear-gradient(180deg, transparent 40%, rgba(241,245,249,0.3) 85%, rgba(241,245,249,0.85) 100%),
                linear-gradient(0deg, transparent 60%, rgba(241,245,249,0.15) 100%)
              `,
            }}
          />

          {/* Warm gold overlay */}
          <div className="absolute inset-0 z-[4] bg-gold/[0.03]" />

          {/* Reflection overlay — horizontal sheen near bottom */}
          <div
            className="absolute inset-x-0 bottom-0 z-[5] h-[40%]"
            style={{
              background: "linear-gradient(180deg, transparent 30%, rgba(255,255,255,0.06) 100%)",
            }}
          />

          {/* Mouse-tracking glare (desktop only) */}
          {!isTouch && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-[6] opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{
                background: useMotionTemplate`radial-gradient(circle 200px at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent)`,
              }}
            />
          )}

        </motion.div>
      </motion.div>
    </motion.div>
  );
}
