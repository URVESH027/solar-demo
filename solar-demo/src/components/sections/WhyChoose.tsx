"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  ShieldCheck,
  Gem,
  Users,
  Clock,
  Zap,
  Headphones,
} from "lucide-react";
import { easeOutExpo } from "@/lib/animations";
import BentoCard from "./BentoCard";

const reasons = [
  {
    icon: ShieldCheck,
    label: "Certified",
    title: "Government Certified",
    description:
      "MNRE approved and ISO certified. We meet every national standard for solar installation and service.",
  },
  {
    icon: Gem,
    label: "Quality",
    title: "Premium Components",
    description:
      "We use only Tier-1 solar panels and certified inverters from brands like Tata, Adani, and Luminous.",
  },
  {
    icon: Users,
    label: "Team",
    title: "Professional Engineers",
    description:
      "Every installation is handled by trained, experienced solar engineers — never subcontractors.",
    span: "wide" as const,
  },
  {
    icon: Clock,
    label: "Warranty",
    title: "25-Year Warranty",
    description:
      "Industry-leading warranty coverage on all panels and a 10-year workmanship guarantee on installations.",
  },
  {
    icon: Zap,
    label: "Speed",
    title: "Fast Installation",
    description:
      "From consultation to commissioning in as little as 7 days. We respect your time.",
  },
  {
    icon: Headphones,
    label: "Support",
    title: "After-Sales Support",
    description:
      "Dedicated support team, annual maintenance plans, and 24/7 emergency assistance.",
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, {
        duration: 2,
        ease: easeOutExpo,
      });
    }
  }, [isInView, count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = String(v);
      }
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref}>0</span>;
}

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gold/[0.015] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-14 md:mb-16"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
            Why Balaji
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            The difference is in the details
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          className="mb-12 grid grid-cols-2 gap-6 md:mb-16 md:grid-cols-4 md:gap-8"
        >
          {[
            { value: 700, suffix: "+", label: "Installations" },
            { value: 10, suffix: "+", label: "Years Experience" },
            { value: 25, suffix: "yr", label: "Panel Warranty" },
            { value: 98, suffix: "%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 font-display text-3xl font-bold text-gold md:text-4xl">
                <AnimatedCounter target={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.08em] text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <BentoCard
              key={reason.title}
              icon={reason.icon}
              label={reason.label}
              title={reason.title}
              description={reason.description}
              span={reason.span}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
