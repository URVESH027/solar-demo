"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";

type RevealVariant = "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "mask";

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  glow?: "gold" | "navy" | "none";
  glowPosition?: "top" | "bottom" | "center";
}

const variantStyles: Record<RevealVariant, { initial: TargetAndTransition; whileInView: TargetAndTransition }> = {
  fade: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.97 },
    whileInView: { opacity: 1, scale: 1 },
  },
  mask: {
    initial: { opacity: 0, clipPath: "inset(8% 0% 0% 0%)" },
    whileInView: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  },
};

const reducedMotionStyle: TargetAndTransition = { opacity: 1 };

const glowStyles = {
  gold: {
    top: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)",
    bottom: "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(212,168,67,0.06) 0%, transparent 70%)",
    center: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,168,67,0.04) 0%, transparent 70%)",
  },
  navy: {
    top: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(10,22,40,0.04) 0%, transparent 70%)",
    bottom: "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(10,22,40,0.04) 0%, transparent 70%)",
    center: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(10,22,40,0.03) 0%, transparent 70%)",
  },
  none: { top: "", bottom: "", center: "" },
};

export default function SectionReveal({
  children,
  variant = "fade",
  delay = 0,
  className = "",
  glow = "none",
  glowPosition = "top",
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const styles = variantStyles[variant];
  const glowBg = glowStyles[glow][glowPosition];

  return (
    <motion.div
      initial={shouldReduceMotion ? reducedMotionStyle : styles.initial}
      whileInView={shouldReduceMotion ? reducedMotionStyle : styles.whileInView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: easeOutExpo,
        delay,
      }}
      className={className}
    >
      {/* Glow element */}
      {glow !== "none" && glowBg && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: glowBg }}
        />
      )}
      {children}
    </motion.div>
  );
}
