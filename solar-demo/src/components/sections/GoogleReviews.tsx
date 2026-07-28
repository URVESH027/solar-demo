"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

const highlights = [
  "Professional installation team",
  "Transparent pricing, no hidden costs",
  "Excellent after-sales support",
  "Subsidy processing handled completely",
  "Panels performing above expectations",
];

function AnimatedDecimal({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(1));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: easeOutExpo });
    }
  }, [isInView, count, target]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsub;
  }, [rounded]);

  return <span ref={ref}>0.0</span>;
}

function AnimatedInt({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: easeOutExpo });
    }
  }, [isInView, count, target]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsub;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function GoogleReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-gold/[0.02] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-gold/[0.015] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-14 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
            Trusted on Google
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            Rated 4.9 on Google
          </h2>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
            {/* Top glow */}
            <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
              {/* Left — Rating */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-gold text-gold md:h-7 md:w-7"
                    />
                  ))}
                </div>
                <div className="mb-1 font-display text-5xl font-bold text-white md:text-6xl">
                  <AnimatedDecimal target={4.9} />
                </div>
                <div className="mb-3 text-sm text-white/50">
                  out of 5 stars
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <BadgeCheck className="h-4 w-4 text-gold" />
                  <AnimatedInt target={247} suffix=" reviews" />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden h-32 w-px bg-white/10 md:block" />
              <div className="h-px w-full bg-white/10 md:hidden" />

              {/* Right — Highlights */}
              <div className="flex-1">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-white/40">
                  What customers mention most
                </p>
                <ul className="flex flex-col gap-3">
                  {highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        ease: easeOutExpo,
                        delay: 0.4 + i * 0.08,
                      }}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
