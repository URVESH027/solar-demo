"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.0 }}
      className="relative z-10 flex flex-col items-center gap-3 pb-8 pt-10"
    >
      {/* Thin vertical line */}
      <div className="relative flex flex-col items-center">
        {/* Track */}
        <div className="h-10 w-px bg-navy/[0.06]" />

        {/* Animated dot */}
        <motion.div
          className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold"
          animate={{
            y: [0, 32, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom arrow chevron */}
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="mt-1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Label */}
      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted/50">
        Scroll
      </span>
    </motion.div>
  );
}
