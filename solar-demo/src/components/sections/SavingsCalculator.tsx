"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sun, Building2, ChevronDown, ShieldCheck, Zap, Clock, Leaf } from "lucide-react";
import {
  fadeUp,
  inViewConfig,
  calculatorReveal,
  calculatorTrustItem,
} from "@/lib/motion-variants";
import CalculatorCard from "./CalculatorCard";

interface CalculatorResults {
  systemSize: number;
  monthlySavings: number;
  yearlySavings: number;
  totalSavings: number;
  co2Reduction: number;
  paybackYears: number;
}

function calculateResults(
  bill: number,
  propertyType: string,
  roofType: string,
): CalculatorResults {
  const baseMultiplier = propertyType === "commercial" ? 1.4 : 1;
  const roofFactor =
    roofType === "flat"
      ? 1.05
      : roofType === "sloped"
        ? 0.95
        : roofType === "metal"
          ? 1.1
          : 1;

  const systemSize =
    Math.round(((bill / 800) * baseMultiplier * roofFactor * 10) / 10) || 1;
  const monthlySavings = Math.round(bill * 0.85 * baseMultiplier);
  const yearlySavings = monthlySavings * 12;
  const totalSavings = yearlySavings * 25;
  const co2Reduction = parseFloat((systemSize * 1.5).toFixed(1));
  const systemCost = systemSize * 55000;
  const paybackYears = parseFloat(
    (systemCost / (yearlySavings * 0.85 || 1)).toFixed(1),
  );

  return {
    systemSize,
    monthlySavings,
    yearlySavings,
    totalSavings,
    co2Reduction,
    paybackYears,
  };
}

/* ─── Trust items below results ─── */
const trustItems = [
  { icon: ShieldCheck, label: "25-Year Warranty" },
  { icon: Zap, label: "Tier-1 Panels" },
  { icon: Clock, label: "5-7 Year ROI" },
  { icon: Leaf, label: "1.5T CO₂ Saved/Year" },
];

export default function SavingsCalculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  const [bill, setBill] = useState(5000);
  const [propertyType, setPropertyType] = useState("home");
  const [roofType, setRoofType] = useState("flat");
  const [city, setCity] = useState("delhi");

  // Progressive reveal — show results after first interaction
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastChangedField, setLastChangedField] = useState<string | null>(null);

  // Auto-reveal after 2s even without interaction
  useEffect(() => {
    const timer = setTimeout(() => setHasInteracted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Clear field highlight after animation
  useEffect(() => {
    if (lastChangedField) {
      const timer = setTimeout(() => setLastChangedField(null), 600);
      return () => clearTimeout(timer);
    }
  }, [lastChangedField]);

  const results = calculateResults(bill, propertyType, roofType);

  const handleBillChange = useCallback((value: number) => {
    setBill(value);
    setHasInteracted(true);
    setLastChangedField("bill");
  }, []);

  const handlePropertyChange = useCallback((value: string) => {
    setPropertyType(value);
    setHasInteracted(true);
    setLastChangedField("property");
  }, []);

  const handleRoofChange = useCallback((value: string) => {
    setRoofType(value);
    setHasInteracted(true);
    setLastChangedField("roof");
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setCity(value);
    setHasInteracted(true);
    setLastChangedField("city");
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-32 md:py-44 section-identity-calculator"
    >
      {/* Background glow — centered gold */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 50%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            Calculate Savings
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            See how much you could save
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate">
            Adjust the parameters below to get a personalized estimate for your solar investment.
          </p>
        </motion.div>

        {/* Layout — Inputs as sleek sidebar, Results as showcase */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left — Inputs (narrower sidebar), slides from left */}
          <motion.div
            variants={calculatorReveal.panel}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
            className="w-full lg:max-w-sm"
          >
            <div className="relative overflow-hidden rounded-3xl border border-warm-gray/60 bg-white p-6 shadow-[0_2px_12px_rgba(10,22,40,0.04),0_8px_32px_rgba(10,22,40,0.03)] md:p-8">
              {/* Top glow */}
              <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

              {/* Bill Slider */}
              <div className="mb-8">
                <div className="mb-5 flex items-baseline justify-between">
                  <label className="text-sm font-semibold text-navy">
                    Monthly Bill
                  </label>
                  <motion.span
                    key={bill}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-2xl font-bold text-gold"
                  >
                    {"\u20B9"}
                    {bill.toLocaleString("en-IN")}
                  </motion.span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={500}
                    max={25000}
                    step={500}
                    value={bill}
                    onChange={(e) => handleBillChange(Number(e.target.value))}
                    className={`slider-gold h-2 w-full cursor-pointer appearance-none rounded-full bg-warm-gray ${lastChangedField === "bill" ? "input-highlight" : ""}`}
                  />
                  <div className="mt-3 flex justify-between text-[11px] text-muted">
                    <span>{"\u20B9"}500</span>
                    <span>{"\u20B9"}25,000</span>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-8">
                <label className="mb-3 block text-sm font-semibold text-navy">
                  Property Type
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "home", label: "Home", icon: Sun },
                    {
                      value: "commercial",
                      label: "Commercial",
                      icon: Building2,
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handlePropertyChange(opt.value)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                        propertyType === opt.value
                          ? "border-gold bg-gold/5 text-navy shadow-[0_0_0_3px_rgba(212,168,67,0.08)]"
                          : "border-warm-gray/60 bg-white text-slate hover:border-gold/30 hover:bg-gold/[0.02]"
                      } ${lastChangedField === "property" && propertyType === opt.value ? "input-highlight" : ""}`}
                    >
                      <opt.icon className="h-4 w-4 transition-transform duration-300" style={{ transform: propertyType === opt.value ? "scale(1.1)" : "scale(1)" }} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roof Type + City row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2.5 block text-sm font-semibold text-navy">
                    Roof Type
                  </label>
                  <div className="relative">
                    <select
                      value={roofType}
                      onChange={(e) => handleRoofChange(e.target.value)}
                      className={`input-premium w-full pr-10 ${lastChangedField === "roof" ? "input-highlight" : ""}`}
                    >
                      <option value="flat">Flat</option>
                      <option value="sloped">Sloped / Tiled</option>
                      <option value="metal">Metal Sheet</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>
                </div>
                <div>
                  <label className="mb-2.5 block text-sm font-semibold text-navy">
                    City
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className={`input-premium w-full pr-10 ${lastChangedField === "city" ? "input-highlight" : ""}`}
                    >
                      <option value="delhi">Delhi NCR</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="chennai">Chennai</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="pune">Pune</option>
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="other">Other City</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Energy Flow Connector — visible after interaction */}
          <AnimatePresence>
            {hasInteracted && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex lg:w-10 lg:items-center lg:justify-center"
              >
                <div className="energy-flow h-px w-full" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile energy flow — vertical */}
          <AnimatePresence>
            {hasInteracted && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center lg:hidden"
              >
                <div className="energy-flow-vertical h-12 w-px" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right — Results (larger showcase), progressive reveal */}
          <motion.div
            variants={calculatorReveal.results}
            initial="hidden"
            animate={hasInteracted ? "visible" : "hidden"}
            className="flex-1"
          >
            <CalculatorCard results={results} />

            {/* Trust Reinforcement — below results, sequential reveal */}
            <AnimatePresence>
              {hasInteracted && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8"
                >
                  {trustItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={calculatorTrustItem}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <item.icon className="h-3.5 w-3.5 text-gold/60" />
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx global>{`
        .slider-gold::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #d4a843;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(212, 168, 67, 0.35), 0 0 0 1px rgba(212, 168, 67, 0.1);
          transition: box-shadow 0.2s ease;
        }
        .slider-gold::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 16px rgba(212, 168, 67, 0.55), 0 0 0 3px rgba(212, 168, 67, 0.1);
        }
        .slider-gold::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #d4a843;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(212, 168, 67, 0.35), 0 0 0 1px rgba(212, 168, 67, 0.1);
        }
        .slider-gold::-moz-range-thumb:hover {
          box-shadow: 0 2px 16px rgba(212, 168, 67, 0.55), 0 0 0 3px rgba(212, 168, 67, 0.1);
        }
      `}</style>
    </section>
  );
}
