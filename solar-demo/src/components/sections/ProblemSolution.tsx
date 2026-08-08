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
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerFast,
  inViewConfig,
} from "@/lib/motion-variants";

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
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-cloud py-32 md:py-44"
    >
      {/* Decorative background — warm radial glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(241,245,249,0.6) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 md:mb-28"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
            The Problem
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            Your solar system should save money
            <span className="text-gold"> — not lose it.</span>
          </h2>
        </motion.div>

        {/* Asymmetric Layout — Dark card narrower, image breaks out */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
          {/* Left — Dark Problem Card (narrower) */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="w-full lg:max-w-md xl:max-w-lg"
          >
            <div className="rounded-3xl bg-navy p-8 md:p-10">
              <p className="mb-10 max-w-sm text-base leading-relaxed text-white/60 md:text-lg">
                Most solar owners don&apos;t realize their system is underperforming
                until the electricity bill tells the truth.
              </p>

              <motion.div
                variants={staggerFast}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col gap-7"
              >
                {problems.map((problem) => (
                  <motion.div
                    key={problem.title}
                    variants={fadeUp}
                    className="group flex gap-4"
                  >
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06] transition-all duration-300 group-hover:bg-gold/10 group-hover:border-gold/20">
                      <problem.icon className="h-5 w-5 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-sm font-semibold text-white/90">
                        {problem.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/40">
                        {problem.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Image + Solution (larger, breaks out) */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
            className="flex flex-1 flex-col justify-center"
          >
            {/* Large image with floating badges */}
            <div className="relative mb-14 image-frame">
              <div
                role="img"
                aria-label="Clean solar panels generating maximum energy output"
                className="aspect-[16/9] w-full bg-cover bg-center md:aspect-[16/10]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=900&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

              {/* Floating badges */}
              <div className="absolute top-6 left-6 badge-gold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Installation</span>
              </div>
              <div className="absolute right-6 bottom-6 badge-dark">
                <TrendingUp className="h-3 w-3 text-gold" />
                <span>+32% Efficiency</span>
              </div>
            </div>

            {/* Solution Statement */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/15">
                  <CheckCircle2 className="h-5 w-5 text-gold" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold">
                  The Solution
                </span>
              </div>
              <h3 className="mb-5 font-display text-2xl font-bold tracking-[-0.01em] text-navy md:text-3xl">
                Balaji fixes all of this.
              </h3>
              <p className="mb-7 max-w-lg text-base leading-relaxed text-slate">
                From expert installation to regular cleaning and long-term
                maintenance — we make sure your solar system performs at its
                peak for 25 years.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-dark">
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
