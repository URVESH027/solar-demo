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
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      <div className="pointer-events-none absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,74,0.05) 0%, transparent 50%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Full-width showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
            <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            <div className="flex flex-col lg:flex-row">
              {/* Left — Rating showcase */}
              <div className="relative flex flex-col items-center justify-center p-8 md:p-12 lg:w-[380px] lg:shrink-0">
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[60px]" />

                <div className="mb-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-gold text-gold md:h-7 md:w-7"
                    />
                  ))}
                </div>
                <div className="mb-2 font-display text-6xl font-bold text-white md:text-7xl">
                  <AnimatedDecimal target={4.9} />
                </div>
                <div className="mb-5 text-sm text-white/40">
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

              {/* Right — Highlights */}
              <div className="flex-1 p-8 md:p-12">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  What customers mention most
                </p>
                <motion.ul
                  variants={staggerMedium}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex flex-col gap-4"
                >
                  {highlights.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeUp}
                      className="flex items-center gap-3 text-[14px] text-white/60"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
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
