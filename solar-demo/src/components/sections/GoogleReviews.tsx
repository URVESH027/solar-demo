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
import {
  fadeUp,
  slideUp,
  staggerMedium,
  inViewConfig,
  ease,
} from "@/lib/motion-variants";

const highlights = [
  "Professional installation team",
  "Transparent pricing, no hidden costs",
  "Excellent after-sales support",
  "Subsidy processing handled completely",
  "Panels performing above expectations",
];

function AnimatedDecimal({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, inViewConfig.early);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(1));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: ease.standard });
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
  const isInView = useInView(ref, inViewConfig.early);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: ease.standard });
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
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-32 md:py-44"
    >
      {/* Background glows — deeper with layered gold */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 50%)" }}
      />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 50%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header — left-aligned editorial */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
            Social Proof
          </span>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
              Trusted by hundreds of homeowners
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/40 lg:text-right">
              Our reputation speaks through the voices of satisfied customers across India.
            </p>
          </div>
        </motion.div>

        {/* Full-width showcase card */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
            {/* Top accent */}
            <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            <div className="flex flex-col lg:flex-row">
              {/* Left — Large rating showcase */}
              <div className="relative flex flex-col items-center justify-center p-8 md:p-12 lg:w-[380px] lg:shrink-0">
                {/* Gold accent blur */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[60px]" />

                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-7 w-7 fill-gold text-gold md:h-8 md:w-8"
                    />
                  ))}
                </div>
                <div className="mb-2 font-display text-6xl font-bold text-white md:text-7xl">
                  <AnimatedDecimal target={4.9} />
                </div>
                <div className="mb-6 text-sm text-white/40">
                  out of 5 stars
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <BadgeCheck className="h-4 w-4 text-gold" />
                  <AnimatedInt target={247} suffix=" verified reviews" />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden w-px bg-white/[0.08] lg:block" />
              <div className="h-px w-full bg-white/[0.08] lg:hidden" />

              {/* Right — Highlights list, staggered */}
              <div className="flex-1 p-8 md:p-12">
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.1em] text-white/40">
                  What customers mention most
                </p>
                <motion.ul
                  variants={staggerMedium}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex flex-col gap-5"
                >
                  {highlights.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="flex items-center gap-4 text-base text-white/70"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
