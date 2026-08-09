"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import {
  contactCta,
  staggerSlow,
  inViewConfig,
} from "@/lib/motion-variants";
import CTAButton from "@/components/ui/CTAButton";

const trustBadges = [
  { icon: ShieldCheck, label: "Govt Certified" },
  { icon: Clock, label: "25-Year Warranty" },
  { icon: BadgeCheck, label: "700+ Installations" },
];

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, inViewConfig.standard);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=70')",
        }}
      />
      <div className="absolute inset-0 bg-navy/85" />

      {/* Top accent line */}
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={contactCta.badge}
            className="mb-5 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40"
          >
            Get Started
          </motion.span>

          <motion.h2
            variants={contactCta.heading}
            className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl"
            style={{ textWrap: "balance" }}
          >
            Ready to own your power?
          </motion.h2>

          <motion.p
            variants={contactCta.paragraph}
            className="mx-auto mt-6 max-w-md text-[15px] leading-[1.7] text-white/45"
          >
            Get a free consultation and custom solar design for your home or
            business. No obligations, no pressure &mdash; just honest advice.
          </motion.p>

          <motion.div
            variants={contactCta.buttons}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <CTAButton label="Get Free Quote" href="#contact" />
            <a
              href="tel:+919999999999"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all duration-400 hover:border-gold/40 hover:text-gold hover:bg-white/[0.03]"
            >
              <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Call Now
              <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            variants={contactCta.trust}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-[13px] text-white/35"
              >
                <badge.icon className="h-3.5 w-3.5 text-gold/50" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
