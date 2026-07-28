"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sun, Building2, ChevronDown } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";
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

export default function SavingsCalculator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [bill, setBill] = useState(5000);
  const [propertyType, setPropertyType] = useState("home");
  const [roofType, setRoofType] = useState("flat");
  const [city, setCity] = useState("delhi");

  const results = calculateResults(bill, propertyType, roofType);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-14 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            Calculate Savings
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            See how much you could save
          </h2>
        </motion.div>

        {/* Calculator Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left — Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
            className="flex-1"
          >
            <div className="relative overflow-hidden rounded-sm border border-warm-gray bg-white p-6 md:p-8">
              {/* Top glow */}
              <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

              {/* Bill Slider */}
              <div className="mb-8">
                <div className="mb-4 flex items-baseline justify-between">
                  <label className="text-sm font-semibold text-navy">
                    Monthly Electricity Bill
                  </label>
                  <span className="font-display text-2xl font-bold text-gold">
                    {"\u20B9"}
                    {bill.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={500}
                    max={25000}
                    step={500}
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="slider-gold h-2 w-full cursor-pointer appearance-none rounded-full bg-warm-gray"
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-muted">
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
                      onClick={() => setPropertyType(opt.value)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        propertyType === opt.value
                          ? "border-gold bg-gold/5 text-navy"
                          : "border-warm-gray bg-white text-slate hover:border-gold/30"
                      }`}
                    >
                      <opt.icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roof Type + City row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy">
                    Roof Type
                  </label>
                  <div className="relative">
                    <select
                      value={roofType}
                      onChange={(e) => setRoofType(e.target.value)}
                      className="w-full appearance-none rounded border border-warm-gray bg-white px-4 py-3 pr-10 text-sm text-navy transition-colors focus:border-gold focus:outline-none"
                    >
                      <option value="flat">Flat</option>
                      <option value="sloped">Sloped / Tiled</option>
                      <option value="metal">Metal Sheet</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy">
                    City
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full appearance-none rounded border border-warm-gray bg-white px-4 py-3 pr-10 text-sm text-navy transition-colors focus:border-gold focus:outline-none"
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

          {/* Right — Results */}
          <div className="flex-1">
            <CalculatorCard results={results} />
          </div>
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx global>{`
        .slider-gold::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d4a843;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(212, 168, 67, 0.35);
          transition: box-shadow 0.2s ease;
        }
        .slider-gold::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 16px rgba(212, 168, 67, 0.55);
        }
        .slider-gold::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d4a843;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(212, 168, 67, 0.35);
        }
        .slider-gold::-moz-range-thumb:hover {
          box-shadow: 0 2px 16px rgba(212, 168, 67, 0.55);
        }
      `}</style>
    </section>
  );
}
