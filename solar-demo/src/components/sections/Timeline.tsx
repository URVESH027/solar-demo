"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  PenTool,
  FileCheck,
  Wrench,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { easeOutExpo } from "@/lib/animations";
import TimelineStep from "./TimelineStep";

const steps = [
  {
    icon: MapPin,
    title: "Site Visit",
    description: "Our engineer inspects your rooftop and energy needs.",
  },
  {
    icon: PenTool,
    title: "Custom Design",
    description: "We design an optimized system tailored to your property.",
  },
  {
    icon: FileCheck,
    title: "Govt Approval",
    description: "We handle all subsidies, net metering, and paperwork.",
  },
  {
    icon: Wrench,
    title: "Installation",
    description: "Professional installation completed in 3-7 days.",
  },
  {
    icon: CheckCircle2,
    title: "Testing",
    description: "Full system testing and quality assurance checks.",
  },
  {
    icon: Zap,
    title: "Power Generation",
    description: "System goes live. Start saving from day one.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-14 text-center md:mb-20"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            How It Works
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            From consultation to power generation
          </h2>
        </motion.div>

        {/* Horizontal Timeline — Desktop */}
        <div className="hidden md:block">
          <div className="relative grid grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <TimelineStep
                key={s.title}
                icon={s.icon}
                step={i + 1}
                title={s.title}
                description={s.description}
                totalSteps={steps.length}
              />
            ))}
          </div>
        </div>

        {/* Vertical Timeline — Mobile */}
        <div className="md:hidden">
          <div className="relative flex flex-col gap-0 pl-[56px]">
            {steps.map((s, i) => (
              <TimelineStepMobile
                key={s.title}
                icon={s.icon}
                step={i + 1}
                title={s.title}
                description={s.description}
                totalSteps={steps.length}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile Step ──────────────────────────────────────── */

function TimelineStepMobile({
  icon: Icon,
  step,
  title,
  description,
  isLast,
}: {
  icon: React.ElementType;
  step: number;
  title: string;
  description: string;
  totalSteps: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="group relative">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute top-[56px] left-[-28px] h-[calc(100%-24px)] w-px bg-warm-gray">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
            className="h-full w-full origin-top bg-gold/40"
          />
        </div>
      )}

      {/* Node */}
      <div className="relative flex items-start gap-5 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
          className="absolute left-[-56px] z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-warm-gray bg-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold/5"
        >
          <Icon className="h-6 w-6 text-navy/50 transition-colors duration-500 group-hover:text-gold" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
            {step}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
          className="pt-2"
        >
          <h3 className="mb-1 text-sm font-bold text-navy">{title}</h3>
          <p className="max-w-[260px] text-xs leading-relaxed text-slate">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
