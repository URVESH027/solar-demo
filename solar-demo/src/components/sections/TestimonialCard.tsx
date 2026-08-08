"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  cardEntrance,
  scaleSpring,
  fadeUp,
  staggerFast,
  inViewConfig,
  springTransition,
} from "@/lib/motion-variants";

interface TestimonialCardProps {
  name: string;
  location: string;
  projectType: string;
  review: string;
  rating: number;
  image: string;
  index: number;
  featured?: boolean;
}

export default function TestimonialCard({
  name,
  location,
  projectType,
  review,
  rating,
  image,
  index,
  featured = false,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={inViewConfig.early}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, transition: springTransition(400, 30) }}
      className="group relative"
    >
      {/* Ambient shadow */}
      <div className="absolute -inset-2 rounded-3xl opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)" }}
      />

      <div className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-warm-gray/60 bg-white transition-all duration-500 hover:border-gold/25 hover:shadow-[0_8px_40px_rgba(10,22,40,0.06),0_2px_8px_rgba(10,22,40,0.03)] p-6 md:p-7 ${featured ? "md:p-8" : ""}`}>
        {/* Top highlight line */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-700 group-hover:via-gold/30" />

        {/* Glass reflection sweep */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
          }}
        />

        {/* Inner cascade: icon → photo → text → author */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={inViewConfig.early}
          className="flex flex-col flex-1"
        >
          {/* Quote icon — reveals first, animates on hover */}
          <motion.div
            variants={fadeUp}
            className={`mb-5 flex items-center justify-center rounded-xl transition-all duration-500 group-hover:bg-gold/10 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)] ${featured ? "h-12 w-12" : "h-10 w-10"}`}
            style={{ background: "rgba(212,168,67,0.04)", border: "1px solid rgba(212,168,67,0.08)" }}
          >
            <Quote className={`text-gold/50 transition-all duration-500 group-hover:text-gold group-hover:scale-110 ${featured ? "h-5 w-5" : "h-4 w-4"}`} />
          </motion.div>

          {/* Stars */}
          <motion.div variants={fadeUp} className="mb-5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 transition-all duration-300 ${
                  i < rating
                    ? "fill-gold text-gold"
                    : "fill-warm-gray text-warm-gray"
                }`}
              />
            ))}
          </motion.div>

          {/* Review text — reveals after icon */}
          <motion.p variants={fadeUp} className={`mb-7 leading-relaxed text-navy/70 ${featured ? "text-base" : "text-sm"}`}>
            &ldquo;{review}&rdquo;
          </motion.p>

          {/* Author — reveals last */}
          <motion.div variants={fadeUp} className="mt-auto flex items-center gap-3.5">
            <div className="relative">
              <motion.div
                variants={scaleSpring}
                role="img"
                aria-label={`Photo of ${name}`}
                className={`rounded-full bg-cover bg-center ring-2 ring-warm-gray/50 transition-all duration-500 group-hover:ring-gold/30 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)] ${featured ? "h-12 w-12" : "h-11 w-11"}`}
                style={{ backgroundImage: `url('${image}')` }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-gold/80 transition-all duration-500 group-hover:bg-gold group-hover:shadow-[0_0_0_2px_rgba(212,168,67,0.2)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-navy transition-colors duration-400 group-hover:text-navy">{name}</div>
              <div className="text-[11px] text-muted transition-colors duration-400 group-hover:text-slate">
                {location} &middot; {projectType}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
