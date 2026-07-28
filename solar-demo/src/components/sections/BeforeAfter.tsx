"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Calendar } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";
import ComparisonSlider from "./ComparisonSlider";

const stats = [
  { icon: TrendingUp, value: "+32%", label: "Efficiency Gain" },
  { icon: Zap, value: "4.2 kW", label: "Output Increase" },
  { icon: Calendar, value: "Mar 2026", label: "Last Cleaning" },
];

export default function BeforeAfter() {
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
          className="mb-14 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            See The Difference
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            Clean panels generate more power
          </h2>
        </motion.div>

        {/* Comparison Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-sm border border-warm-gray bg-white shadow-[0_8px_40px_rgba(10,22,40,0.06)]">
            {/* Top glow */}
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            {/* Slider */}
            <ComparisonSlider
              beforeImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=80"
              afterImage="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1000&q=80"
              beforeLabel="Dirty Panel"
              afterLabel="Clean Panel"
            />

            {/* Stats bar */}
            <div className="flex flex-col gap-4 border-t border-warm-gray bg-cloud/50 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    ease: easeOutExpo,
                    delay: 0.5 + i * 0.1,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded bg-gold/10">
                    <stat.icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-muted">{stat.label}</div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: easeOutExpo,
                  delay: 0.8,
                }}
                className="text-xs text-slate"
              >
                <span className="font-medium text-navy">Drag the slider</span>{" "}
                to compare
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
