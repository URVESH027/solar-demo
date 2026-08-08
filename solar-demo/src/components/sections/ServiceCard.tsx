"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cardEntrance, inViewConfig } from "@/lib/motion-variants";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  index: number;
  featured?: boolean;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  index,
  featured = false,
}: ServiceCardProps) {
  if (featured) {
    return (
      <motion.div
        variants={cardEntrance}
        initial="hidden"
        whileInView="visible"
        viewport={inViewConfig.standard}
        transition={{ delay: index * 0.08 }}
        className="group relative"
      >
        {/* Ambient glow on hover */}
        <div className="absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(212,168,67,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative flex flex-col overflow-hidden rounded-3xl border border-warm-gray/60 bg-white transition-all duration-500 hover:border-gold/25 hover:shadow-[0_12px_48px_rgba(10,22,40,0.07),0_4px_12px_rgba(10,22,40,0.03)] md:flex-row">
          {/* Top highlight line — appears on hover */}
          <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-700 group-hover:via-gold/30" />

          {/* Glass reflection sweep */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
            }}
          />

          {/* Image side */}
          <div className="relative w-full overflow-hidden md:w-[45%] lg:w-[40%]">
            <div
              className="aspect-[16/10] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03] md:aspect-auto md:h-full md:min-h-[360px]"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 transition-opacity duration-500 md:to-white/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />

            {/* Floating badge */}
            <div className="absolute top-5 left-5 badge-gold badge-premium-interactive">
              <Icon className="h-3.5 w-3.5" />
              <span>Most Popular</span>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-1 flex-col p-8 md:p-10 lg:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 border border-gold/15 transition-all duration-500 group-hover:bg-gold/15 group-hover:border-gold/25 group-hover:shadow-[0_0_0_4px_rgba(212,168,67,0.06)]">
              <Icon className="h-6 w-6 text-gold transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,168,67,0.3)]" />
            </div>

            <h3 className="mb-4 font-display text-2xl font-bold tracking-[-0.01em] text-navy md:text-3xl">
              {title}
            </h3>

            <p className="mb-8 max-w-md text-base leading-relaxed text-slate">
              {description}
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-navy/60"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/40 transition-all duration-500 group-hover:bg-gold/60 group-hover:scale-125" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-all duration-400 group-hover:text-gold-dark group-hover:gap-3">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={inViewConfig.standard}
      transition={{ delay: index * 0.08 }}
      className="group relative"
    >
      {/* Ambient glow on hover */}
      <div className="absolute -inset-3 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-warm-gray/60 bg-white transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(10,22,40,0.06),0_2px_8px_rgba(10,22,40,0.03)] hover:-translate-y-1">
        {/* Top highlight line — appears on hover */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-700 group-hover:via-gold/30" />

        {/* Glass reflection sweep */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
          }}
        />

        <div className="p-8 md:p-9">
          {/* Icon in glass circle — refined hover */}
          <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-cloud/80 border border-warm-gray/40 transition-all duration-500 group-hover:bg-gold/10 group-hover:border-gold/25 group-hover:shadow-[0_0_0_4px_rgba(212,168,67,0.06)]">
            <Icon className="h-5.5 w-5.5 text-navy/35 transition-all duration-500 group-hover:text-gold group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(212,168,67,0.25)]" />
          </div>

          <h3 className="mb-3 font-display text-xl font-bold tracking-[-0.01em] text-navy">
            {title}
          </h3>

          <p className="mb-7 text-sm leading-relaxed text-slate">
            {description}
          </p>

          <ul className="mb-8 flex flex-col gap-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-navy/60"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/40 transition-all duration-500 group-hover:bg-gold/60 group-hover:scale-125" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2 text-sm font-medium text-gold opacity-0 translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 group-hover:gap-3">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
