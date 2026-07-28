"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.07 }}
      className={`group relative ${spanStyles[span]}`}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-1 rounded-sm opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.03] p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.05] md:p-8"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        }}
      >
        {/* Top glow line */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/20" />

        {/* Surface sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500 group-hover:bg-gold/10 group-hover:shadow-[0_0_0_4px_rgba(212,168,67,0.06)]"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <Icon className="h-5 w-5 text-white/30 transition-all duration-500 group-hover:text-gold group-hover:scale-110" />
        </div>

        {/* Label */}
        <span className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-white/30">
          {label}
        </span>

        {/* Title */}
        <h3 className="mb-2 font-display text-lg font-bold tracking-[-0.01em] text-white md:text-xl">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/40">{description}</p>

        {/* Bottom accent line */}
        <div className="mt-auto h-px w-0 bg-gold/20 transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.div>
  );
}
