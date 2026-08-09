"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  slideLeft,
  slideRight,
  inViewConfig,
} from "@/lib/motion-variants";

const problems = [
  "Dirty panels reduce efficiency by up to 25%",
  "Rising electricity bills eat your savings",
  "Poor installation leads to early failures",
  "No maintenance voids your warranty",
];

const solutions = [
  "Expert installation with Tier-1 panels",
  "Regular cleaning restores peak performance",
  "25-year warranty with annual maintenance",
  "Full subsidy and net metering support",
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Two-column magazine spread */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20 xl:gap-28">
          {/* Left — THE PROBLEM */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate/60">
              The Problem
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-[42px]">
              Your solar system should save money
              <span className="text-gold"> &mdash; not lose it.</span>
            </h2>
            <p className="mb-8 max-w-md text-[15px] leading-[1.75] text-slate">
              Most solar owners don&apos;t realize their system is underperforming
              until the electricity bill tells the truth.
            </p>
            <ul className="flex flex-col gap-4">
              {problems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 text-[14px] leading-[1.6] text-navy/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Center divider */}
          <div className="hidden lg:flex lg:w-px lg:items-stretch">
            <div className="w-px bg-warm-gray/40" />
          </div>

          {/* Right — THE SOLUTION */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/70">
              The Solution
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-[42px]">
              Balaji fixes all of this.
            </h2>
            <p className="mb-8 max-w-md text-[15px] leading-[1.75] text-slate">
              From expert installation to regular cleaning and long-term
              maintenance &mdash; we make sure your solar system performs at its
              peak for 25 years.
            </p>
            <ul className="flex flex-col gap-4">
              {solutions.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-3 text-[14px] leading-[1.6] text-navy/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
              className="mt-8"
            >
              <a
                href="#services"
                className="group inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-dark"
              >
                <span>See how we do it</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
