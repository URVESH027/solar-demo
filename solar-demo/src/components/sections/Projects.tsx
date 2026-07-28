"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";
import ProjectCard from "./ProjectCard";

const categories = ["All", "Residential", "Commercial", "Industrial"] as const;

type Category = (typeof categories)[number];

interface Project {
  title: string;
  location: string;
  systemSize: string;
  yearlySavings: string;
  completionDate: string;
  category: Exclude<Category, "All">;
  image: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Sunridge Residence",
    location: "Delhi NCR",
    systemSize: "10 kW",
    yearlySavings: "Save \u20B91,44,000/yr",
    completionDate: "Jan 2026",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    featured: true,
  },
  {
    title: "Green Valley Apartments",
    location: "Gurugram",
    systemSize: "45 kW",
    yearlySavings: "Save \u20B96,48,000/yr",
    completionDate: "Nov 2025",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&q=80",
  },
  {
    title: "Apex Manufacturing",
    location: "Noida",
    systemSize: "120 kW",
    yearlySavings: "Save \u20B917,28,000/yr",
    completionDate: "Sep 2025",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
  },
  {
    title: "Metro Office Complex",
    location: "Jaipur",
    systemSize: "85 kW",
    yearlySavings: "Save \u20B912,24,000/yr",
    completionDate: "Dec 2025",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&q=80",
  },
  {
    title: "Sunshine Villa",
    location: "Bangalore",
    systemSize: "8 kW",
    yearlySavings: "Save \u20B91,15,200/yr",
    completionDate: "Feb 2026",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    title: "Pinnacle Textiles",
    location: "Tirupur",
    systemSize: "200 kW",
    yearlySavings: "Save \u20B928,80,000/yr",
    completionDate: "Aug 2025",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-10 md:mb-12"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            Our Work
          </span>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
              Projects that speak for themselves
            </h2>

            {/* Filter Tabs */}
            <div className="flex gap-1 rounded-sm bg-white p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative rounded px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                    active === cat
                      ? "bg-navy text-white"
                      : "text-slate hover:text-navy"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.title}
                image={project.image}
                title={project.title}
                location={project.location}
                systemSize={project.systemSize}
                yearlySavings={project.yearlySavings}
                completionDate={project.completionDate}
                category={project.category}
                featured={project.featured}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
