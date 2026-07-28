"use client";

import { motion } from "framer-motion";
import { MapPin, Zap, IndianRupee, ArrowUpRight } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

interface ProjectCardProps {
  image: string;
  title: string;
  location: string;
  systemSize: string;
  yearlySavings: string;
  completionDate: string;
  category: string;
  featured?: boolean;
  index: number;
}

export default function ProjectCard({
  image,
  title,
  location,
  systemSize,
  yearlySavings,
  completionDate,
  featured = false,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-sm ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div
        role="img"
        aria-label={`${title} solar project in ${location}`}
        className={`relative w-full overflow-hidden bg-cover bg-center ${
          featured ? "aspect-[16/10] md:aspect-auto md:h-full" : "aspect-[16/11]"
        }`}
        style={{ backgroundImage: `url('${image}')` }}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy/0 transition-all duration-500 group-hover:bg-navy/60" />

        {/* Always-visible bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />

        {/* Edge glow on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(212,168,67,0.2)" }}
        />

        {/* Bottom info — always visible */}
        <div className="absolute right-0 bottom-0 left-0 p-5 md:p-6">
          <div className="flex items-end justify-between">
            <div>
              <h3
                className={`mb-1 font-display font-bold text-white ${
                  featured ? "text-xl md:text-2xl" : "text-lg"
                }`}
              >
                {title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <MapPin className="h-3 w-3" />
                {location}
              </div>
            </div>

            {/* Hover CTA */}
            <div className="flex items-center gap-1.5 rounded-sm bg-gold px-3 py-1.5 text-xs font-semibold text-navy opacity-0 shadow-[0_2px_8px_rgba(212,168,67,0.3)] transition-all duration-300 group-hover:opacity-100">
              View Project
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Hover stats — top left glass badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {[
            { icon: Zap, value: systemSize },
            { icon: IndianRupee, value: yearlySavings },
          ].map((stat) => (
            <div
              key={stat.value}
              className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-md"
            >
              <stat.icon className="h-3 w-3 text-gold" />
              {stat.value}
            </div>
          ))}
        </div>

        {/* Completion badge */}
        <div className="absolute top-5 right-5 rounded-sm border border-white/10 bg-white/10 px-2.5 py-1.5 text-[10px] font-medium text-white/70 backdrop-blur-md transition-all duration-300 group-hover:border-gold/20 group-hover:bg-gold/20 group-hover:text-gold">
          {completionDate}
        </div>
      </div>
    </motion.div>
  );
}
