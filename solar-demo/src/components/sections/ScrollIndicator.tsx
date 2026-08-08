"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollIndicatorReveal } from "@/lib/motion-variants";

export default function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={scrollIndicatorReveal}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center gap-3 pb-8 pt-10"
    >
      <div className="relative flex flex-col items-center">
        {/* Track — subtle scaleY pulse */}
        <motion.div
          className="h-10 w-px bg-navy/[0.06]"
          animate={prefersReducedMotion ? {} : {
            scaleY: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Morphing dot — circle → pill → circle */}
        <motion.div
          className="absolute top-0 left-1/2 h-1.5 -translate-x-1/2 rounded-full bg-gold"
          animate={prefersReducedMotion ? {} : {
            width: [6, 6, 12, 6],
            y: [0, 16, 32, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        />

        {/* Bottom chevron — gentle oscillation */}
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="mt-1"
          animate={prefersReducedMotion ? {} : {
            y: [0, 3, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold"
          />
        </motion.svg>
      </div>

      {/* Label — fades with the pulse */}
      <motion.span
        className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted/50"
        animate={prefersReducedMotion ? {} : {
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
      </motion.span>
    </motion.div>
  );
}
