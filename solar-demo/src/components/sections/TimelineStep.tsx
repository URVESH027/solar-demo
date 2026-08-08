"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, duration, inViewConfig } from "@/lib/motion-variants";
import type { LucideIcon } from "lucide-react";

interface TimelineStepProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  totalSteps: number;
}

export default function TimelineStep({
  icon: Icon,
  step,
  title,
  description,
  totalSteps,
}: TimelineStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig.early);

  return (
    <div ref={ref} className="group relative flex flex-col items-center text-center">
      {/* Connector line — hidden on last step */}
      {step < totalSteps && (
        <div className="absolute top-[28px] left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-warm-gray md:block">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: duration.slow,
              ease: ease.standard,
              delay: 0.3 + step * 0.15,
            }}
            className="h-full w-full origin-left bg-gold/40"
          />
        </div>
      )}

      {/* Vertical connector for mobile */}
      {step < totalSteps && (
        <div className="absolute top-[56px] left-[28px] h-[calc(100%-32px)] w-px bg-warm-gray md:hidden">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: duration.slow,
              ease: ease.standard,
              delay: 0.3 + step * 0.15,
            }}
            className="h-full w-full origin-top bg-gold/40"
          />
        </div>
      )}

      {/* Icon circle — premium treatment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: duration.medium,
          ease: ease.standard,
          delay: 0.15 + step * 0.12,
        }}
        className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-warm-gray bg-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold/5 group-hover:shadow-[0_0_0_6px_rgba(212,168,67,0.08)] md:mb-7"
      >
        <Icon className="h-6 w-6 text-navy/50 transition-all duration-500 group-hover:text-gold group-hover:scale-110" />
        {/* Step number badge */}
        <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy shadow-[0_2px_8px_rgba(212,168,67,0.3)]">
          {step}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: duration.medium,
          ease: ease.standard,
          delay: 0.25 + step * 0.12,
        }}
      >
        <h3 className="mb-1.5 text-sm font-bold text-navy">{title}</h3>
        <p className="max-w-[180px] text-xs leading-relaxed text-slate">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
