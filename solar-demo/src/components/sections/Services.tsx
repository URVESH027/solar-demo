"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sun,
  Droplets,
  CalendarCheck,
  Building2,
  FileCheck,
  Battery,
} from "lucide-react";
import {
  fadeUp,
  slideUp,
  staggerMedium,
  inViewConfig,
} from "@/lib/motion-variants";
import ServiceCard from "./ServiceCard";

const services = [
  {
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
    featured: true,
  },
  {
    icon: Droplets,
    title: "Solar Panel Cleaning",
    description:
      "Professional cleaning services that restore your panels to peak efficiency — guaranteed.",
    features: [
      "Water-free eco cleaning available",
      "Before & after efficiency report",
      "Scheduled quarterly plans",
      "Removes all dust, debris & buildup",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Annual Maintenance",
    description:
      "Comprehensive AMC plans that keep your system running at optimal performance year-round.",
    features: [
      "2 scheduled visits per year",
      "Inverter health check",
      "Wiring & connection audit",
      "Performance guarantee SLA",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "Large-scale solar solutions for factories, offices, and commercial properties.",
    features: [
      "Up to 500kW+ systems",
      "ROI-focused system design",
      "Government tender support",
      "Dedicated project manager",
    ],
  },
  {
    icon: FileCheck,
    title: "Subsidy Assistance",
    description:
      "We handle all paperwork for government subsidies so you save even more on your solar investment.",
    features: [
      "MNRE subsidy application",
      "State policy guidance",
      "End-to-end documentation",
      "Fast-tracked processing",
    ],
  },
  {
    icon: Battery,
    title: "Battery Storage",
    description:
      "Store excess solar energy for use at night or during power cuts with our battery backup solutions.",
    features: [
      "Lithium-ion & lead-acid options",
      "Scalable storage capacity",
      "Automatic switchover",
      "Remote monitoring available",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  const featured = services[0];
  const rest = services.slice(1);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 section-identity-services">
      {/* Decorative background — warm top gradient */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[400px]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,67,0.04) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-[160px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header — left-aligned for editorial feel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 md:mb-24"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            Our Services
          </span>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl">
              Everything your solar system needs
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate lg:text-right">
              From installation to maintenance, we provide end-to-end solar solutions backed by 10+ years of expertise.
            </p>
          </div>
        </motion.div>

        {/* Featured Service — large hero card */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <ServiceCard
            icon={featured.icon}
            title={featured.title}
            description={featured.description}
            features={featured.features}
            index={0}
            featured
          />
        </motion.div>

        {/* Remaining Services — 2x2 offset grid */}
        <motion.div
          variants={staggerMedium}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((service, i) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              index={i + 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
