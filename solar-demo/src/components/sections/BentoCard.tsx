"use client";

import { motion } from "framer-motion";
import { cardEntrance, inViewConfig } from "@/lib/motion-variants";
import type { LucideIcon } from "lucide-react";

interface BentoCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  span?: "default" | "wide" | "tall";
  index: number;
}

export default function BentoCard({
  icon: Icon,
  label,
  title,
  description,
  span = "default",
  index,
}: BentoCardProps) {
  const spanStyles = {
    default: "",
    wide: "sm:col-span-2",
    tall: "sm:row-span-2",
  };

  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={inViewConfig.standard}
      transition={{ delay: index * 0.07 }}
      className={`group relative cursor-default ${spanStyles[span]}`}
    >
      {/* Ambient glow on hover */}
      <div className="absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(212,168,67,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-all duration-500 group-hover:-translate-y-0.5 md:p-9"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Hover border transition — brighter gold accent */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-all duration-500 group-hover:border-white/[0.12]" />

        {/* Top glow line — appears on hover */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full transition-all duration-700"
          style={{
            background: "linear-gradient(90deg, transparent 10%, rgba(212,168,67,0) 50%, transparent 90%)",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent 10%, rgba(212,168,67,0.3) 50%, transparent 90%)",
          }}
        />

        {/* Surface sheen — premium depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
          }}
      />

        {/* Glass reflection sweep */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
          }}
        />

        {/* Icon in glass circle — refined hover */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,168,67,0.35)]">
            <Icon className="h-5 w-5 text-white/30 transition-colors duration-500 group-hover:text-gold" />
          </div>
        </div>

        {/* Label */}
        <span className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 transition-colors duration-500 group-hover:text-white/55">
          {label}
        </span>

        {/* Title */}
        <h3 className="mb-3 font-display text-lg font-bold tracking-[-0.01em] text-white md:text-xl transition-colors duration-500 group-hover:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/60">{description}</p>

        {/* Bottom accent line — grows on hover */}
        <div className="mt-auto">
          <div className="h-px w-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
}
