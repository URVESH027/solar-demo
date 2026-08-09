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

const trustItems = [
  { icon: ShieldCheck, label: "25-Year Warranty" },
  { icon: Zap, label: "Tier-1 Panels" },
  { icon: Clock, label: "5-7 Year ROI" },
  { icon: Leaf, label: "1.5T CO\u2082 Saved/Year" },
];

export default function SavingsCalculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  const [bill, setBill] = useState(5000);
  const [propertyType, setPropertyType] = useState("home");
  const [roofType, setRoofType] = useState("flat");
  const [city, setCity] = useState("delhi");

  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastChangedField, setLastChangedField] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHasInteracted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,74,0.05) 0%, transparent 50%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header — minimal */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 md:mb-16"
        >
          <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
            Calculate Savings
          </span>
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            See how much you could save
          </h2>
        </motion.div>

        {/* Side-by-side layout */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left — Inputs */}
          <motion.div
            variants={calculatorReveal.panel}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.15 }}
            className="w-full lg:max-w-sm"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8">
              <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

              {/* Bill Slider */}
              <div className="mb-7">
                <div className="mb-4 flex items-baseline justify-between">
                  <label className="text-sm font-semibold text-white/80">
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
                    className={`h-2 w-full cursor-pointer appearance-none rounded-full ${lastChangedField === "bill" ? "input-highlight" : ""}`}
                    style={{
                      background: `linear-gradient(to right, #D4A843 0%, #D4A843 ${((bill - 500) / 24500) * 100}%, rgba(255,255,255,0.08) ${((bill - 500) / 24500) * 100}%, rgba(255,255,255,0.08) 100%)`,
                    }}
                  />
                  <div className="mt-3 flex justify-between text-[11px] text-white/30">
                    <span>{"\u20B9"}500</span>
                    <span>{"\u20B9"}25,000</span>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-7">
                <label className="mb-3 block text-sm font-semibold text-white/80">
                  Property Type
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "home", label: "Home", icon: Sun },
                    { value: "commercial", label: "Commercial", icon: Building2 },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handlePropertyChange(opt.value)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                        propertyType === opt.value
                          ? "border-gold/30 bg-gold/10 text-gold"
                          : "border-white/[0.06] bg-white/[0.03] text-white/50 hover:border-white/[0.12]"
                      }`}
                    >
                      <opt.icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roof + City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2.5 block text-sm font-semibold text-white/80">
                    Roof Type
                  </label>
                  <div className="relative">
                    <select
                      value={roofType}
                      onChange={(e) => handleRoofChange(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 pr-10 text-sm text-white/70 transition-all duration-300 hover:border-white/[0.12] focus:border-gold/30 focus:outline-none"
                    >
                      <option value="flat">Flat</option>
                      <option value="sloped">Sloped</option>
                      <option value="metal">Metal</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/30" />
                  </div>
                </div>
                <div>
                  <label className="mb-2.5 block text-sm font-semibold text-white/80">
                    City
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 pr-10 text-sm text-white/70 transition-all duration-300 hover:border-white/[0.12] focus:border-gold/30 focus:outline-none"
                    >
                      <option value="delhi">Delhi NCR</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="chennai">Chennai</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="pune">Pune</option>
                      <option value="ahmedabad">Ahmedabad</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-white/30" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Energy flow connector */}
          <AnimatePresence>
            {hasInteracted && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex lg:w-8 lg:items-center lg:justify-center"
              >
                <div className="h-px w-full bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile energy flow */}
          <AnimatePresence>
            {hasInteracted && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center lg:hidden"
              >
                <div className="h-10 w-px bg-gradient-to-b from-gold/0 via-gold/30 to-gold/0" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right — Results */}
          <motion.div
            variants={calculatorReveal.results}
            initial="hidden"
            animate={hasInteracted ? "visible" : "hidden"}
            className="flex-1"
          >
            <CalculatorCard results={results} />

            {/* Trust items */}
            <AnimatePresence>
              {hasInteracted && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-8"
                >
                  {trustItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={calculatorTrustItem}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 text-[11px] text-white/30"
                    >
                      <item.icon className="h-3 w-3 text-gold/50" />
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Custom slider thumb styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #D4A843;
          cursor: pointer;
          border: 3px solid #071A2B;
          box-shadow: 0 2px 8px rgba(212,168,74,0.35);
          transition: box-shadow 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 16px rgba(212,168,74,0.55), 0 0 0 3px rgba(212,168,74,0.1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #D4A843;
          cursor: pointer;
          border: 3px solid #071A2B;
          box-shadow: 0 2px 8px rgba(212,168,74,0.35);
        }
      `}</style>
    </section>
  );
}
