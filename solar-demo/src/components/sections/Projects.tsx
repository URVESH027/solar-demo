"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  fadeUp,
  projects,
  inViewConfig,
  staggerMedium,
} from "@/lib/motion-variants";
import ProjectCard from "./ProjectCard";
import { ArrowUpRight } from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&q=80",
    tags: ["Multi-Tenant", "25 Year Warranty"],
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
    tags: ["Net Metering", "120kW System", "Industrial"],
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
    tags: ["Commercial", "85kW System"],
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
    tags: ["Residential", "Rooftop"],
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
      className="relative overflow-hidden bg-cloud py-32 md:py-44 section-identity-projects"
    >
      {/* Layered background — warm ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[200px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.035) 0%, transparent 55%)" }}
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, rgba(10,22,40,0.02) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header — editorial */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            Our Portfolio
          </span>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
              Projects that speak for themselves
            </h2>

            {/* Filter Tabs — refined */}
            <div className="flex gap-1 rounded-xl bg-white p-1 border border-warm-gray/30 shadow-[0_1px_3px_rgba(10,22,40,0.04)]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    active === cat
                      ? "bg-navy text-white shadow-[0_2px_8px_rgba(10,22,40,0.15)]"
                      : "text-slate hover:text-navy hover:bg-cloud/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Project — full-width cinematic case study */}
        <AnimatePresence mode="popLayout">
          {heroProject && (
            <motion.div
              key={heroProject.title}
              layout
              variants={projects.hero}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              className="mb-8 md:mb-10"
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

        {/* Supporting Projects — asymmetric editorial grid */}
        <motion.div
          layout
          variants={staggerMedium}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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

        {/* Conversion CTA — refined, understated */}
        <motion.div
          variants={projects.ctaReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center md:mt-20"
        >
          <div className="mx-auto max-w-lg">
            <h3 className="mb-3 font-display text-xl font-bold text-navy md:text-2xl">
              Let&apos;s Build Your Solar Project
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-slate">
              From residential rooftops to industrial-scale installations, we deliver
              precision-engineered solar systems built to last.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-[0_2px_12px_rgba(10,22,40,0.15),0_8px_24px_rgba(10,22,40,0.1)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(10,22,40,0.2),0_12px_32px_rgba(10,22,40,0.12)]"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
