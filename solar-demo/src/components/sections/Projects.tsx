"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  fadeUp,
  projects,
  inViewConfig,
} from "@/lib/motion-variants";
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
  tags?: string[];
}

const projectsData: Project[] = [
  {
    title: "Sunridge Residence",
    location: "Delhi NCR",
    systemSize: "10 kW",
    yearlySavings: "Save \u20B91,44,000/yr",
    completionDate: "Jan 2026",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    featured: true,
    tags: ["Net Metering", "25 Year Warranty", "Residential"],
  },
  {
    title: "Green Valley Apartments",
    location: "Gurugram",
    systemSize: "45 kW",
    yearlySavings: "Save \u20B96,48,000/yr",
    completionDate: "Nov 2025",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80",
    tags: ["Multi-Tenant", "25 Year Warranty"],
  },
  {
    title: "Apex Manufacturing",
    location: "Noida",
    systemSize: "120 kW",
    yearlySavings: "Save \u20B917,28,000/yr",
    completionDate: "Sep 2025",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
    tags: ["Net Metering", "120kW System", "Industrial"],
  },
  {
    title: "Metro Office Complex",
    location: "Jaipur",
    systemSize: "85 kW",
    yearlySavings: "Save \u20B912,24,000/yr",
    completionDate: "Dec 2025",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
    tags: ["Commercial", "85kW System"],
  },
  {
    title: "Sunshine Villa",
    location: "Bangalore",
    systemSize: "8 kW",
    yearlySavings: "Save \u20B91,15,200/yr",
    completionDate: "Feb 2026",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    tags: ["Residential", "Rooftop"],
  },
  {
    title: "Pinnacle Textiles",
    location: "Tirupur",
    systemSize: "200 kW",
    yearlySavings: "Save \u20B928,80,000/yr",
    completionDate: "Aug 2025",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80",
    tags: ["Net Metering", "200kW System", "Industrial"],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === active);

  const heroProject = filtered[0];
  const restProjects = filtered.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 md:mb-16"
        >
          <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate/60">
            Our Portfolio
          </span>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
              Projects that speak for themselves
            </h2>

            {/* Filter Tabs */}
            <div className="flex gap-0.5 rounded-lg bg-white p-0.5 border border-warm-gray/30">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-md px-3.5 py-1.5 text-[11px] font-medium transition-all duration-300 ${
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

        {/* Featured Project — full-width hero */}
        <AnimatePresence mode="popLayout">
          {heroProject && (
            <motion.div
              key={heroProject.title}
              layout
              variants={projects.hero}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              className="mb-6 md:mb-8"
            >
              <ProjectCard
                image={heroProject.image}
                title={heroProject.title}
                location={heroProject.location}
                systemSize={heroProject.systemSize}
                yearlySavings={heroProject.yearlySavings}
                completionDate={heroProject.completionDate}
                category={heroProject.category}
                tags={heroProject.tags}
                featured
                hero
                index={0}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supporting Projects — grid */}
        <motion.div
          layout
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {restProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                image={project.image}
                title={project.title}
                location={project.location}
                systemSize={project.systemSize}
                yearlySavings={project.yearlySavings}
                completionDate={project.completionDate}
                category={project.category}
                tags={project.tags}
                index={i + 1}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
