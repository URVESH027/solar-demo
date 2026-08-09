"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sun,
  Droplets,
  CalendarCheck,
  Building2,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import {
  fadeUp,
  inViewConfig,
} from "@/lib/motion-variants";

const services = [
  {
    num: "01",
    icon: Sun,
    title: "Solar Installation",
    description:
      "End-to-end residential and commercial solar panel installation designed for maximum energy output.",
    features: [
      "Site assessment & custom design",
      "Tier-1 panel brands only",
      "Net metering setup included",
      "25-year performance warranty",
    ],
  },
  {
    num: "02",
    icon: Droplets,
    title: "Solar Panel Cleaning",
    description:
      "Professional cleaning services that restore your panels to peak efficiency.",
    features: ["Water-free eco cleaning", "Before & after efficiency report"],
  },
  {
    num: "03",
    icon: CalendarCheck,
    title: "Annual Maintenance",
    description:
      "Comprehensive AMC plans that keep your system running at optimal performance.",
    features: ["2 scheduled visits per year", "Inverter health check"],
  },
  {
    num: "04",
    icon: Building2,
    title: "Commercial Solar",
    description:
      "Large-scale solar solutions for factories, offices, and commercial properties.",
    features: ["Up to 500kW+ systems", "ROI-focused system design"],
  },
  {
    num: "05",
    icon: FileCheck,
    title: "Subsidy Assistance",
    description:
      "We handle all paperwork for government subsidies so you save even more.",
    features: ["MNRE subsidy application", "Fast-tracked processing"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  const featured = services[0];
  const rest = services.slice(1);

  return (
    <section ref={sectionRef} id="services" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate/60">
            Our Services
          </span>
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl">
            Everything your solar system needs
          </h2>
        </motion.div>

        {/* Featured service — large with image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mb-8"
        >
          <div className="group relative overflow-hidden rounded-3xl border border-warm-gray/40 bg-white shadow-[0_2px_8px_rgba(10,22,40,0.04)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(10,22,40,0.08)]">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative lg:w-[55%]">
                <div
                  role="img"
                  aria-label="Professional solar panel installation on a modern rooftop"
                  className="aspect-[16/10] w-full bg-cover bg-center lg:aspect-[16/9]"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/10" />
                <div className="absolute top-5 left-5 flex items-center gap-2 rounded-lg bg-gold/90 px-3 py-1.5 text-[11px] font-bold text-navy">
                  {featured.num}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-center p-8 lg:p-10">
                <div className="mb-3 flex items-center gap-2.5">
                  <featured.icon className="h-5 w-5 text-gold" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gold">
                    Featured Service
                  </span>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-navy md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mb-6 max-w-md text-[14px] leading-[1.7] text-slate">
                  {featured.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-3">
                  {featured.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-cloud px-3.5 py-1.5 text-[12px] font-medium text-navy/60"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-navy/90 hover:shadow-[0_4px_16px_rgba(10,22,40,0.2)]"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compact list — 02-05 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.08 }}
              className="group rounded-2xl border border-warm-gray/40 bg-white p-6 transition-all duration-300 hover:border-gold/20 hover:shadow-[0_4px_16px_rgba(10,22,40,0.05)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-warm-gray/40 transition-colors group-hover:text-gold/40">
                  {service.num}
                </span>
                <service.icon className="h-4 w-4 text-gold/60" />
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-navy">
                {service.title}
              </h3>
              <p className="mb-3 text-[13px] leading-[1.6] text-slate">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-[11px] text-navy/40"
                  >
                    <span className="mr-1 text-gold/40">&middot;</span>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
