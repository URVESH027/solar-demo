"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type BGColor = "cloud" | "navy" | "white" | "transparent";

interface SectionConnectorProps {
  from: BGColor;
  to: BGColor;
  height?: number;
  glow?: boolean;
}

const colorMap: Record<BGColor, string> = {
  cloud: "#F1F5F9",
  navy: "#0A1628",
  white: "#FFFFFF",
  transparent: "transparent",
};

export default function SectionConnector({
  from,
  to,
  height = 80,
  glow = true,
}: SectionConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  const fromColor = colorMap[from];
  const toColor = colorMap[to];

  /* Build gradient */
  const isSameColor = from === to;

  const gradient = `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`;

  return (
    <div
      ref={ref}
      className="pointer-events-none relative"
      style={{ height, marginTop: -1, marginBottom: -1 }}
    >
      {/* Main gradient connector */}
      <div
        className="absolute inset-0"
        style={{ background: gradient }}
      />

      {/* Glow accent */}
      {glow && !isSameColor && (
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{
              background: `linear-gradient(90deg, transparent 5%, rgba(212,168,67,0.15) 30%, rgba(212,168,67,0.25) 50%, rgba(212,168,67,0.15) 70%, transparent 95%)`,
            }}
          />
        </motion.div>
      )}

      {/* Noise texture continuity */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.15]" />
    </div>
  );
}
