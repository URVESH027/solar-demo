"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  MapPin,
  Zap,
  IndianRupee,
  Leaf,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import {
  projects,
  inViewConfig,
  ease,
  duration,
} from "@/lib/motion-variants";

interface ProjectCardProps {
  image: string;
  title: string;
  location: string;
  systemSize: string;
  yearlySavings: string;
  completionDate: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  hero?: boolean;
  index: number;
}

function ProjectMetrics({
  systemSize,
  yearlySavings,
  completionDate,
  hero = false,
}: {
  systemSize: string;
  yearlySavings: string;
  completionDate: string;
  hero?: boolean;
}) {
  const metrics = [
    { icon: Zap, label: "System", value: systemSize },
    { icon: IndianRupee, label: "Savings", value: yearlySavings.replace("Save ", "") },
    { icon: Calendar, label: "Completed", value: completionDate },
    { icon: Leaf, label: "CO\u2082 Offset", value: `${(parseFloat(systemSize) * 1.5).toFixed(0)}T/yr` },
  ];

  return (
    <motion.div
      variants={projects.contentReveal}
      className={`flex ${hero ? "flex-wrap gap-4 md:gap-6" : "flex-col gap-3"}`}
    >
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          custom={i}
          variants={projects.metricReveal}
          initial="hidden"
          whileInView="visible"
          viewport={inViewConfig.early}
          className={`flex items-center gap-2.5 transition-all duration-400 group-hover:border-gold/20 ${hero ? "rounded-xl bg-white/8 px-3.5 py-2.5 backdrop-blur-sm" : "rounded-lg bg-white/6 px-3 py-2"}`}
          style={{
            border: "1px solid rgba(226,232,240,0.3)",
          }}
        >
          <div className={`flex items-center justify-center transition-all duration-400 group-hover:bg-gold/15 ${hero ? "h-7 w-7 rounded-lg" : "h-6 w-6 rounded-md"}`}
            style={{
              background: "rgba(212,168,67,0.08)",
              border: "1px solid rgba(212,168,67,0.12)",
            }}
          >
            <m.icon className={`${hero ? "h-3.5 w-3.5" : "h-3 w-3"} text-gold`} />
          </div>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted transition-colors duration-400 group-hover:text-white/70">
              {m.label}
            </div>
            <div className={`${hero ? "text-sm" : "text-xs"} font-semibold text-navy transition-colors duration-400 group-hover:text-white`}>
              {m.value}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function ProjectCard({
  image,
  title,
  location,
  systemSize,
  yearlySavings,
  completionDate,
  category,
  tags = [],
  hero = false,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, inViewConfig.early);

  // Subtle parallax on mouse move — max 2° tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (hero) {
    return (
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: duration.cinematic, ease: ease.standard }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1200 }}
        className="group relative cursor-default overflow-hidden rounded-[2rem] will-change-transform"
      >
        {/* Multi-layer shadow — premium depth, grows on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-all duration-700 group-hover:opacity-100"
          style={{
            boxShadow: "0 8px 32px rgba(10,22,40,0.08), 0 16px 48px rgba(10,22,40,0.06), 0 32px 80px rgba(10,22,40,0.04)",
          }}
        />
        {/* Default shadow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem]"
          style={{
            boxShadow: "0 2px 8px rgba(10,22,40,0.04), 0 4px 16px rgba(10,22,40,0.03)",
          }}
        />

        {/* Border — warm gold on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] border border-transparent transition-all duration-700 group-hover:border-gold/15"
        />

        {/* Image container */}
        <div className="relative w-full overflow-hidden aspect-[21/9] md:aspect-[24/9]">
          {/* Image with cinematic reveal */}
          <motion.div
            variants={projects.imageReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </motion.div>

          {/* Layered gradients — cinematic framing */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-navy/10 transition-opacity duration-500 group-hover:via-navy/30" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-transparent" />
          {/* Top edge highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Bottom edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

          {/* Glass overlay — premium surface, shifts on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(212,168,67,0.04) 100%)",
            }}
          />

          {/* Floating tags — top, react on hover */}
          <motion.div
            variants={projects.badgeFloat}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute top-5 left-5 flex flex-wrap gap-2 md:top-7 md:left-7"
          >
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-md border border-white/10 transition-all duration-400 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/15 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* System size badge — top right */}
          <motion.div
            variants={projects.badgeFloat}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="absolute top-5 right-5 md:top-7 md:right-7"
          >
            <div className="flex items-center gap-1.5 rounded-xl bg-gold/90 px-3.5 py-2 text-xs font-bold text-navy shadow-[0_2px_12px_rgba(212,168,67,0.3)] backdrop-blur-sm transition-all duration-400 group-hover:shadow-[0_4px_20px_rgba(212,168,67,0.4)] group-hover:scale-[1.02]">
              <Zap className="h-3.5 w-3.5" />
              {systemSize}
            </div>
          </motion.div>

          {/* Bottom content — title, location, metrics, CTA */}
          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <motion.div
                variants={projects.contentReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex-1"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-md bg-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-gold border border-gold/15 transition-all duration-400 group-hover:bg-gold/20 group-hover:border-gold/25">
                    {category}
                  </span>
                  <span className="text-[11px] text-white/50 transition-colors duration-400 group-hover:text-white/65">{completionDate}</span>
                </div>
                <h3 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl transition-all duration-400 group-hover:text-white">
                  {title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-400 group-hover:text-white/75">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </div>
              </motion.div>

              {/* Metrics row — right side on desktop */}
              <div className="md:text-right">
                <ProjectMetrics
                  systemSize={systemSize}
                  yearlySavings={yearlySavings}
                  completionDate={completionDate}
                  hero
                />
              </div>
            </div>

            {/* CTA — appears last */}
            <motion.div
              variants={projects.ctaReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-6 flex items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/10 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/15 group-hover:border-white/15 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
                View Case Study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="text-xs text-white/40 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:text-white/55">
                Full project details
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ─── Standard project card ───
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: duration.slow, ease: ease.standard, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="group relative cursor-default overflow-hidden rounded-[1.75rem] will-change-transform"
    >
      {/* Multi-layer shadow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-all duration-700 group-hover:opacity-100"
        style={{
          boxShadow: "0 6px 24px rgba(10,22,40,0.07), 0 12px 36px rgba(10,22,40,0.05), 0 24px 60px rgba(10,22,40,0.03)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{
          boxShadow: "0 1px 4px rgba(10,22,40,0.03), 0 2px 8px rgba(10,22,40,0.02)",
        }}
      />

      {/* Border — warm gold on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-transparent transition-all duration-700 group-hover:border-gold/12"
      />

      {/* Image container */}
      <div className="relative w-full overflow-hidden aspect-[16/11]">
        {/* Image with reveal */}
        <motion.div
          variants={projects.imageReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={{ backgroundImage: `url('${image}')` }}
          />
        </motion.div>

        {/* Layered gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/20 via-transparent to-transparent" />
        {/* Top edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Glass overlay on hover — shifts */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(212,168,67,0.03) 100%)",
          }}
        />

        {/* Floating tags — top left */}
        <motion.div
          variants={projects.badgeFloat}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute top-4 left-4 flex flex-wrap gap-1.5 md:top-5 md:left-5"
        >
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/75 backdrop-blur-md border border-white/8 transition-all duration-400 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/15"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Completion badge — top right */}
        <motion.div
          variants={projects.badgeFloat}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.05 }}
          className="absolute top-4 right-4 md:top-5 md:right-5"
        >
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/60 backdrop-blur-md border border-white/8 transition-all duration-400 group-hover:bg-gold/15 group-hover:text-gold group-hover:border-gold/15">
            {completionDate}
          </span>
        </motion.div>

        {/* Bottom content */}
        <div className="absolute right-0 bottom-0 left-0 p-5 md:p-6">
          <motion.div
            variants={projects.contentReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="mb-2 flex items-center gap-1.5">
              <span className="rounded bg-gold/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-gold border border-gold/10 transition-all duration-400 group-hover:bg-gold/15 group-hover:border-gold/15">
                {category}
              </span>
            </div>
            <h3 className="mb-1.5 font-display text-lg font-bold text-white transition-colors duration-400 group-hover:text-white">
              {title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-white/55 transition-colors duration-400 group-hover:text-white/70">
              <MapPin className="h-3 w-3" />
              {location}
            </div>
          </motion.div>

          {/* Metrics — revealed on hover */}
          <motion.div
            variants={projects.contentReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-3 flex flex-col gap-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-lg bg-white/8 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm border border-white/8 transition-all duration-400 group-hover:bg-white/12 group-hover:border-white/12">
                <Zap className="h-3 w-3 text-gold" />
                {systemSize}
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-white/8 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm border border-white/8 transition-all duration-400 group-hover:bg-white/12 group-hover:border-white/12">
                <IndianRupee className="h-3 w-3 text-gold" />
                {yearlySavings.replace("Save ", "")}
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/8 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm border border-white/8 w-fit transition-all duration-400 group-hover:bg-white/12 group-hover:border-white/12">
              <Leaf className="h-3 w-3 text-gold" />
              {(parseFloat(systemSize) * 1.5).toFixed(0)}T CO\u2082/yr
            </div>
          </motion.div>

          {/* CTA — appears last */}
          <div className="mt-3 flex items-center gap-1.5 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-xs font-medium text-white/70 transition-colors duration-400 group-hover:text-white/85">View Project</span>
            <ArrowUpRight className="h-3 w-3 text-white/70 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/85" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
