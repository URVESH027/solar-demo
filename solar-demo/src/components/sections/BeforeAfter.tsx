"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Calendar } from "lucide-react";
import {
  fadeUp,
  slideLeft,
  staggerFast,
  inViewConfig,
} from "@/lib/motion-variants";
import ComparisonSlider from "./ComparisonSlider";

const stats = [
  { icon: TrendingUp, value: "+32%", label: "Efficiency Gain" },
  { icon: Zap, value: "4.2 kW", label: "Output Increase" },
  { icon: Calendar, value: "Mar 2026", label: "Last Cleaning" },
];

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44">
      {/* Decorative blur — warm side glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(241,245,249,0.5) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            See The Difference
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            Clean panels generate more power
          </h2>
        </motion.div>

        {/* Asymmetric layout — Comparison + Floating Stats */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* Main comparison — larger, reveals first */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
            className="flex-1"
          >
            <div className="relative overflow-hidden rounded-3xl border border-warm-gray/60 bg-white shadow-[0_12px_48px_rgba(10,22,40,0.07),0_4px_12px_rgba(10,22,40,0.03)]">
              {/* Top glow */}
              <div className="pointer-events-none absolute top-0 left-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

              <ComparisonSlider
                beforeImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=80"
                afterImage="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1000&q=80"
                beforeLabel="Dirty Panel"
                afterLabel="Clean Panel"
              />

              {/* Bottom bar */}
              <div className="border-t border-warm-gray/40 bg-cloud/40 p-5 md:p-6">
                <span className="text-xs text-slate">
                  <span className="font-medium text-navy">Drag the slider</span>{" "}
                  to compare before and after cleaning
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating stat cards — right side, staggered after comparison */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-4 lg:w-72 lg:pt-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="group flex items-center gap-4 rounded-2xl border border-warm-gray/40 bg-white p-5 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_4px_16px_rgba(10,22,40,0.05)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 border border-gold/10 transition-all duration-300 group-hover:bg-gold/15 group-hover:border-gold/20">
                  <stat.icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="text-lg font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
