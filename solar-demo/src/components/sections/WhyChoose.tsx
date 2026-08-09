"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  fadeUp,
  inViewConfig,
  ease,
} from "@/lib/motion-variants";

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
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,74,0.05) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Editorial header — large statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Why Balaji
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            A decade of expertise, hundreds of satisfied customers, and the best
            components in the industry.
          </h2>
        </motion.div>

        {/* Large floating numbers — editorial style */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
              className="group"
            >
              <div className="mb-2 font-display text-5xl font-bold text-gold md:text-6xl lg:text-7xl">
                <AnimatedCounter target={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/35">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal trust points — just text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-10"
        >
          {[
            "Government Certified",
            "Premium Tier-1 Components",
            "Professional Engineers",
            "Fast Installation",
            "24/7 After-Sales Support",
          ].map((item, i) => (
            <span
              key={item}
              className="text-[12px] font-medium text-white/30"
            >
              {i > 0 && <span className="mr-3 text-white/15">&middot;</span>}
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
