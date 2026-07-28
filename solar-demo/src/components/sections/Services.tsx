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
import { easeOutExpo } from "@/lib/animations";
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
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-14 md:mb-16"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            Our Services
          </span>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl">
            Everything your solar system needs
          </h2>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
