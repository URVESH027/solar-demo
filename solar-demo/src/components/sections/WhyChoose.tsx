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
import {
  fadeUp,
  staggerMedium,
  counterTrigger,
  inViewConfig,
  ease,
} from "@/lib/motion-variants";
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

const stats = [
  { value: 700, suffix: "+", label: "Installations" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "yr", label: "Panel Warranty" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, inViewConfig.early);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, {
        duration: 2,
        ease: ease.standard,
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
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-32 md:py-44 section-identity-whychoose"
    >
      {/* Background glow — deeper with gold accent */}
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.03) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
            Why Balaji
          </span>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
              The difference is in the details
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/40 lg:text-right">
              A decade of expertise, hundreds of satisfied customers, and the best components in the industry.
            </p>
          </div>
        </motion.div>

        {/* Stats Row — individual glass cards */}
        <motion.div
          variants={staggerMedium}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 grid grid-cols-2 gap-4 md:mb-20 md:grid-cols-4 md:gap-5"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={counterTrigger}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] md:p-6"
            >
              <div className="mb-2 font-display text-3xl font-bold text-gold md:text-4xl">
                <AnimatedCounter target={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.08em] text-white/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Grid — varied spans */}
        <motion.div
          variants={staggerMedium}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
