"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

interface TestimonialCardProps {
  name: string;
  location: string;
  projectType: string;
  review: string;
  rating: number;
  image: string;
  index: number;
}

export default function TestimonialCard({
  name,
  location,
  projectType,
  review,
  rating,
  image,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: easeOutExpo } }}
      className="group relative"
    >
      {/* Ambient shadow */}
      <div className="absolute -inset-1 rounded-sm opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-warm-gray bg-white transition-all duration-500 hover:border-gold/20 hover:shadow-[0_8px_32px_rgba(10,22,40,0.06)] md:p-7 p-6">
        {/* Top highlight line */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 group-hover:via-gold/25" />

        {/* Surface sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Quote icon — elevated treatment */}
        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm transition-all duration-500 group-hover:bg-gold/10 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)]"
          style={{ background: "rgba(212,168,67,0.04)" }}
        >
          <Quote className="h-4 w-4 text-gold/50 transition-colors duration-500 group-hover:text-gold" />
        </div>

        {/* Stars */}
        <div className="mb-4 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 transition-colors duration-300 ${
                i < rating
                  ? "fill-gold text-gold"
                  : "fill-warm-gray text-warm-gray"
              }`}
            />
          ))}
        </div>

        {/* Review */}
        <p className="mb-6 text-sm leading-relaxed text-navy/70">
          &ldquo;{review}&rdquo;
        </p>

        {/* Author — premium avatar with ring */}
        <div className="mt-auto flex items-center gap-3">
          <div className="relative">
            <div
              role="img"
              aria-label={`Photo of ${name}`}
              className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-warm-gray transition-all duration-500 group-hover:ring-gold/30"
              style={{ backgroundImage: `url('${image}')` }}
            />
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-gold/80" />
          </div>
          <div>
            <div className="text-sm font-semibold text-navy">{name}</div>
            <div className="text-[11px] text-muted">
              {location} &middot; {projectType}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
