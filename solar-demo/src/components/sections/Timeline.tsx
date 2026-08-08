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
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleSpring,
  timelineLineVertical,
  inViewConfig,
} from "@/lib/motion-variants";

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
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 section-identity-timeline">
      {/* Decorative blurs — alternating warm accents */}
      <div className="pointer-events-none absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.03) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.02) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 text-center md:mb-28"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            How It Works
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            From consultation to power generation
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate">
            A streamlined 6-step process designed to get your solar system running with minimal hassle.
          </p>
        </motion.div>

        {/* Alternating Timeline — Desktop */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-warm-gray/50">
              <motion.div
                variants={timelineLineVertical}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="h-full w-full origin-top bg-gold/30"
              />
            </div>

            <div className="flex flex-col gap-0">
              {steps.map((s, i) => (
                <TimelineStepAlternating
                  key={s.title}
                  icon={s.icon}
                  step={i + 1}
                  title={s.title}
                  description={s.description}
                  isLeft={i % 2 === 0}
                />
              ))}
            </div>
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
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Alternating Step (Desktop) ──────────────────────────── */

function TimelineStepAlternating({
  icon: Icon,
  step,
  title,
  description,
  isLeft,
}: {
  icon: React.ElementType;
  step: number;
  title: string;
  description: string;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig.early);

  return (
    <div ref={ref} className="group relative flex items-center">
      {/* Left content */}
      <div className={`flex w-1/2 ${isLeft ? "justify-end pr-12" : ""}`}>
        {isLeft && (
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="max-w-xs text-right"
          >
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-gold">
              Step {step}
            </div>
            <h3 className="mb-2 text-lg font-bold text-navy">{title}</h3>
            <p className="text-sm leading-relaxed text-slate">{description}</p>
          </motion.div>
        )}
      </div>

      {/* Center node */}
      <motion.div
        variants={scaleSpring}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.1 }}
        className="absolute left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl border-2 border-warm-gray bg-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold/5 group-hover:shadow-[0_0_0_6px_rgba(212,168,67,0.08)]"
      >
        <Icon className="h-6 w-6 text-navy/50 transition-all duration-500 group-hover:text-gold" />
        <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy shadow-[0_2px_8px_rgba(212,168,67,0.3)]">
          {step}
        </span>
      </motion.div>

      {/* Right content */}
      <div className={`flex w-1/2 ${!isLeft ? "pl-12" : ""}`}>
        {!isLeft && (
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="max-w-xs"
          >
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-gold">
              Step {step}
            </div>
            <h3 className="mb-2 text-lg font-bold text-navy">{title}</h3>
            <p className="text-sm leading-relaxed text-slate">{description}</p>
          </motion.div>
        )}
      </div>
    </div>
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
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig.early);

  return (
    <div ref={ref} className="group relative">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute top-[56px] left-[-28px] h-[calc(100%-24px)] w-px bg-warm-gray">
          <motion.div
            variants={timelineLineVertical}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="h-full w-full origin-top bg-gold/40"
          />
        </div>
      )}

      {/* Node */}
      <div className="relative flex items-start gap-5 pb-10">
        <motion.div
          variants={scaleSpring}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
          className="absolute left-[-56px] z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-warm-gray bg-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold/5 group-hover:shadow-[0_0_0_4px_rgba(212,168,67,0.08)]"
        >
          <Icon className="h-6 w-6 text-navy/50 transition-colors duration-500 group-hover:text-gold" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy shadow-[0_2px_8px_rgba(212,168,67,0.3)]">
            {step}
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="pt-2"
        >
          <h3 className="mb-1.5 text-sm font-bold text-navy">{title}</h3>
          <p className="max-w-[260px] text-xs leading-relaxed text-slate">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
