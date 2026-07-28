"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  index: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.08 }}
      className="group relative"
    >
      {/* Ambient shadow — appears on hover */}
      <div className="absolute -inset-1 rounded-sm opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-warm-gray bg-white transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_32px_rgba(10,22,40,0.06)]">
        {/* Top highlight line */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/30" />

        {/* Surface reflection — subtle top gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="p-8 md:p-9">
          {/* Icon in gold accent circle */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-cloud transition-all duration-500 group-hover:bg-gold/10 group-hover:shadow-[0_0_0_4px_rgba(212,168,67,0.08)]">
            <Icon className="h-5 w-5 text-navy/40 transition-all duration-500 group-hover:text-gold group-hover:scale-110" />
          </div>

          {/* Title */}
          <h3 className="mb-3 font-display text-xl font-bold tracking-[-0.01em] text-navy">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-slate">
            {description}
          </p>

          {/* Feature List */}
          <ul className="mb-8 flex flex-col gap-2.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-navy/60"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Arrow CTA */}
          <div className="mt-auto flex items-center gap-2 text-sm font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
