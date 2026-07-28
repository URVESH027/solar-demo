"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Zap,
  TrendingUp,
  Calendar,
  Leaf,
  Clock,
  IndianRupee,
} from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

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
      ease: easeOutExpo,
    });
    return controls.stop;
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = motionVal.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [motionVal, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
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
    key: "monthlySavings" as const,
    icon: IndianRupee,
    label: "Monthly Savings",
    format: (v: number) => ({
      value: v,
      prefix: "\u20B9",
      suffix: "",
      decimals: 0,
    }),
  },
  {
    key: "yearlySavings" as const,
    icon: TrendingUp,
    label: "Yearly Savings",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
      className="relative overflow-hidden rounded-sm border border-warm-gray bg-white p-6 md:p-8"
    >
      {/* Top glow */}
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      {/* Surface sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-white/50 to-transparent" />

      <h3 className="mb-6 font-display text-lg font-bold text-navy">
        Your Estimate
      </h3>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {resultItems.map((item) => {
          const formatted = item.format(results[item.key]);
          return (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-sm bg-cloud/60 p-4 transition-all duration-300 hover:bg-cloud hover:shadow-[0_2px_8px_rgba(10,22,40,0.04)]"
            >
              {/* Hover highlight */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-gold/10 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)]">
                  <item.icon className="h-4 w-4 text-gold" />
                </div>
                <div className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                  {item.label}
                </div>
                <div className="font-display text-xl font-bold text-navy md:text-2xl">
                  <AnimatedNumber
                    value={formatted.value}
                    prefix={formatted.prefix}
                    suffix={formatted.suffix}
                    decimals={formatted.decimals}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
