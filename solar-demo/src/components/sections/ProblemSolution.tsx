"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Droplets,
  TrendingUp,
  Wrench,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

const problems = [
  {
    icon: Droplets,
    title: "Dirty panels reduce efficiency by up to 25%",
    desc: "Dust, bird droppings, and pollution accumulate silently, costing you money every single day.",
  },
  {
    icon: TrendingUp,
    title: "Rising electricity bills eat your savings",
    desc: "Without proper maintenance, your solar investment stops paying for itself.",
  },
  {
    icon: Wrench,
    title: "Poor installation quality leads to failures",
    desc: "Cheap workmanship causes system breakdowns within the first few years.",
  },
  {
    icon: ShieldAlert,
    title: "No maintenance means no warranty",
    desc: "Most manufacturers require regular servicing to keep your 25-year warranty valid.",
  },
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-cloud py-28 md:py-36"
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
            The Problem
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            Your solar system should save money
            <span className="text-gold"> — not lose it.</span>
          </h2>
        </motion.div>

        {/* Split Layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-20">
          {/* Left — Dark Problem Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.2 }}
            className="flex-1"
          >
            <div className="rounded-sm bg-navy p-8 md:p-10 lg:p-12">
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                Most solar owners don&apos;t realize their system is underperforming
                until the electricity bill tells the truth. Here&apos;s what&apos;s
                silently draining your investment:
              </p>

              <div className="flex flex-col gap-6">
                {problems.map((problem, i) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      ease: easeOutExpo,
                      delay: 0.4 + i * 0.1,
                    }}
                    className="group flex gap-4"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/5 transition-colors duration-300 group-hover:bg-gold/10">
                      <problem.icon className="h-5 w-5 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold text-white/90">
                        {problem.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/40">
                        {problem.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Solution Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.4 }}
            className="flex flex-1 flex-col justify-center"
          >
            {/* Image */}
            <div className="relative mb-10 overflow-hidden rounded-sm">
              <div
                role="img"
                aria-label="Clean solar panels generating maximum energy output"
                className="aspect-[16/10] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>

            {/* Solution Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.8 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-gold" />
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                  The Solution
                </span>
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold tracking-[-0.01em] text-navy md:text-3xl">
                Balaji fixes all of this.
              </h3>
              <p className="mb-6 max-w-sm text-base leading-relaxed text-slate">
                From expert installation to regular cleaning and long-term
                maintenance — we make sure your solar system performs at its
                peak for 25 years.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-dark">
                <span>See how we do it</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
