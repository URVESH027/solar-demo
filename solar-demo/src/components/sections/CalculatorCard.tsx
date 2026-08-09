"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Zap,
  TrendingUp,
  Calendar,
  Leaf,
  Clock,
  IndianRupee,
} from "lucide-react";
import {
  calculatorResults,
  inViewConfig,
  ease,
} from "@/lib/motion-variants";

interface ResultData {
  systemSize: number;
  monthlySavings: number;
  yearlySavings: number;
  totalSavings: number;
  co2Reduction: number;
  paybackYears: number;
}

interface CalculatorCardProps {
  results: ResultData;
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 1.2,
      ease: ease.standard,
      onUpdate: () => {
        if (ref.current) {
          const v = motionVal.get();
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
        }
      },
    });
    return controls.stop;
  }, [value, motionVal, prefix, suffix, decimals]);

  return (
    <span ref={ref} className="inline-block origin-left">
      {prefix}0{suffix}
    </span>
  );
}

const resultItems = [
  {
    key: "systemSize" as const,
    icon: Zap,
    label: "System Size",
    format: (v: number) => ({
      value: v,
      prefix: "",
      suffix: " kW",
      decimals: 1,
    }),
  },
  {
    key: "yearlySavings" as const,
    icon: IndianRupee,
    label: "Yearly Savings",
    format: (v: number) => ({
      value: v,
      prefix: "\u20B9",
      suffix: "",
      decimals: 0,
    }),
    primary: true,
  },
  {
    key: "monthlySavings" as const,
    icon: TrendingUp,
    label: "Monthly Savings",
    format: (v: number) => ({
      value: v,
      prefix: "\u20B9",
      suffix: "",
      decimals: 0,
    }),
  },
  {
    key: "totalSavings" as const,
    icon: Calendar,
    label: "25-Year Savings",
    format: (v: number) => ({
      value: v,
      prefix: "\u20B9",
      suffix: "",
      decimals: 0,
    }),
  },
  {
    key: "co2Reduction" as const,
    icon: Leaf,
    label: "CO\u2082 Reduction / Year",
    format: (v: number) => ({
      value: v,
      prefix: "",
      suffix: " tons",
      decimals: 1,
    }),
  },
  {
    key: "paybackYears" as const,
    icon: Clock,
    label: "Payback Period",
    format: (v: number) => ({
      value: v,
      prefix: "",
      suffix: " years",
      decimals: 1,
    }),
  },
];

export default function CalculatorCard({ results }: CalculatorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, inViewConfig.standard);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: ease.standard, delay: 0.2 }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8"
    >
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <h3 className="mb-6 font-display text-lg font-bold text-white">
        Your Estimate
      </h3>

      {/* Result grid */}
      <motion.div
        variants={calculatorResults.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
      >
        {resultItems.map((item) => {
          const formatted = item.format(results[item.key]);
          const isPrimary = "primary" in item && item.primary;

          return (
            <motion.div
              key={item.key}
              variants={calculatorResults.item}
              className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-400 ${
                isPrimary
                  ? "col-span-2 bg-gold/[0.08] border border-gold/15 lg:col-span-1"
                  : "bg-white/[0.03] border border-white/[0.06]"
              }`}
            >
              <div className="relative">
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                    isPrimary ? "bg-gold/10 border border-gold/15" : "bg-white/[0.05] border border-white/[0.06]"
                  }`}
                >
                  <item.icon className={`h-3.5 w-3.5 ${isPrimary ? "text-gold" : "text-white/40"}`} />
                </div>

                <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.06em] text-white/30">
                  {item.label}
                </div>

                <div className={`font-display font-bold ${
                  isPrimary ? "text-2xl text-gold md:text-3xl" : "text-lg text-white/80"
                }`}>
                  <AnimatedNumber
                    value={formatted.value}
                    prefix={formatted.prefix}
                    suffix={formatted.suffix}
                    decimals={formatted.decimals}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
