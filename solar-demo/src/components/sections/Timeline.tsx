"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  PenTool,
  FileCheck,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import {
  fadeUp,
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
    title: "Power On",
    description: "System goes live. Start saving from day one.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate/60">
            How It Works
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl">
            From consultation to power generation
          </h2>
        </motion.div>

        {/* Horizontal Steps — Desktop */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal connecting line */}
            <div className="absolute top-10 left-[10%] right-[10%] h-px bg-warm-gray/40">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="h-full w-full origin-left bg-gold/30"
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Timeline — Mobile */}
        <div className="md:hidden">
          <div className="relative flex flex-col gap-0 pl-[56px]">
            {steps.map((step, i) => (
              <MobileStep
                key={step.title}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig.early);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.1 }}
      className="group flex flex-col items-center text-center"
    >
      {/* Node */}
      <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-warm-gray bg-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold/5">
        <step.icon className="h-6 w-6 text-navy/40 transition-all duration-500 group-hover:text-gold" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
          {index + 1}
        </span>
      </div>

      <h3 className="mb-1.5 font-display text-base font-bold text-navy">
        {step.title}
      </h3>
      <p className="max-w-[160px] text-[13px] leading-relaxed text-slate">
        {step.description}
      </p>
    </motion.div>
  );
}

function MobileStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig.early);

  return (
    <div ref={ref} className="group relative">
      {!isLast && (
        <div className="absolute top-[48px] left-[-28px] h-[calc(100%-20px)] w-px bg-warm-gray">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="h-full w-full origin-top bg-gold/30"
          />
        </div>
      )}

      <div className="relative flex items-start gap-4 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute left-[-56px] z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-warm-gray bg-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold/5"
        >
          <step.icon className="h-5 w-5 text-navy/40 transition-colors duration-500 group-hover:text-gold" />
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-navy">
            {index + 1}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="pt-1"
        >
          <h3 className="mb-1 text-sm font-bold text-navy">{step.title}</h3>
          <p className="max-w-[260px] text-xs leading-relaxed text-slate">
            {step.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
