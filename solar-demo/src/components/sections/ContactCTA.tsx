"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";
import CTAButton from "@/components/ui/CTAButton";

const trustBadges = [
  { icon: ShieldCheck, label: "Govt Certified" },
  { icon: Clock, label: "25-Year Warranty" },
  { icon: BadgeCheck, label: "700+ Installations" },
];

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      {/* Animated background glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[150px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/[0.015] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white/60"
          >
            Get Started
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 }}
            className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl"
            style={{ textWrap: "balance" }}
          >
            Ready to own your power?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/50"
          >
            Get a free consultation and custom solar design for your home or
            business. No obligations, no pressure — just honest advice.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <CTAButton label="Get Free Quote" href="#contact" />
            <a
              href="tel:+919999999999"
              className="group inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:border-gold/40 hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              Call Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-white/40"
              >
                <badge.icon className="h-4 w-4 text-gold/60" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
