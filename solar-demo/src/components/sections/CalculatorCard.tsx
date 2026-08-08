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
  const prevValue = useRef(value);

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
    prevValue.current = value;
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
    primary: true,
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
      className="relative overflow-hidden rounded-3xl bg-white p-6 md:p-8"
      style={{
        border: "1px solid rgba(226,232,240,0.6)",
        boxShadow: "0 1px 3px rgba(10,22,40,0.03), 0 4px 12px rgba(10,22,40,0.04), 0 12px 32px rgba(10,22,40,0.03)",
      }}
    >
      {/* Top gold accent line */}
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 10%, rgba(212,168,67,0.25) 50%, transparent 90%)",
        }}
      />

      {/* Surface sheen — premium depth */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%]"
        style={{
          background: "linear-gradient(180deg, rgba(241,245,249,0.4) 0%, transparent 100%)",
        }}
      />

      {/* Glass reflection sweep */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background: "linear-gradient(165deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
        }}
      />

      <h3 className="mb-7 font-display text-lg font-bold text-navy">
        Your Estimate
      </h3>

      {/* Result cards — stagger in after card is visible */}
      <motion.div
        variants={calculatorResults.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
      >
        {resultItems.map((item) => {
          const formatted = item.format(results[item.key]);
          const isPrimary = "primary" in item && item.primary;

          return (
            <motion.div
              key={item.key}
              variants={calculatorResults.item}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-400"
              style={{
                background: isPrimary
                  ? "linear-gradient(135deg, rgba(241,245,249,0.8) 0%, rgba(212,168,67,0.04) 100%)"
                  : "rgba(241,245,249,0.5)",
                border: isPrimary
                  ? "1px solid rgba(212,168,67,0.15)"
                  : "1px solid rgba(226,232,240,0.3)",
              }}
            >
              {/* Hover background shift */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 rounded-2xl"
                style={{
                  background: "linear-gradient(180deg, rgba(212,168,67,0.05) 0%, rgba(241,245,249,0.8) 100%)",
                }}
              />

              {/* Hover glow — soft gold */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  boxShadow: "0 4px 20px rgba(212,168,67,0.12), inset 0 0 20px rgba(212,168,67,0.03)",
                }}
              />

              {/* Hover top accent */}
              <div className="pointer-events-none absolute top-0 left-0 h-px w-full opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2), transparent)",
                }}
              />

              <div className="relative">
                {/* Icon with independent animation */}
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-400 group-hover:scale-105 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)]"
                  style={{
                    background: isPrimary ? "rgba(212,168,67,0.08)" : "#ffffff",
                    border: isPrimary ? "1px solid rgba(212,168,67,0.15)" : "1px solid rgba(226,232,240,0.3)",
                    boxShadow: "0 1px 3px rgba(10,22,40,0.03)",
                  }}
                >
                  <div className="transition-all duration-400 group-hover:drop-shadow-[0_0_6px_rgba(212,168,67,0.25)]">
                    <item.icon className={`h-4 w-4 transition-all duration-400 group-hover:scale-110 ${isPrimary ? "text-gold" : "text-gold"}`} />
                  </div>
                </div>

                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-muted transition-colors duration-400 group-hover:text-slate">
                  {item.label}
                </div>

                <div className={`font-display text-xl font-bold text-navy transition-colors duration-400 group-hover:text-navy md:text-2xl ${isPrimary ? "text-gold-dark" : ""}`}>
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
