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
      className="relative overflow-hidden bg-navy py-32 md:py-44 surface-navy-deep"
    >
      {/* Layered background glows — premium depth */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[700px] w-[700px] rounded-full blur-[200px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 50%)" }}
      />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.03) 0%, transparent 50%)" }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 50%)" }}
      />

      {/* Top accent line */}
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Section label — first to appear */}
          <motion.span
            variants={contactCta.badge}
            className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-white/60"
          >
            Get Started
          </motion.span>

          {/* Headline — second */}
          <motion.h2
            variants={contactCta.heading}
            className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl"
            style={{ textWrap: "balance" }}
          >
            Ready to own your power?
          </motion.h2>

          {/* Subtext — third */}
          <motion.p
            variants={contactCta.paragraph}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/50"
          >
            Get a free consultation and custom solar design for your home or
            business. No obligations, no pressure — just honest advice.
          </motion.p>

          {/* CTAs — fourth */}
          <motion.div
            variants={contactCta.buttons}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <CTAButton label="Get Free Quote" href="#contact" />
            <a
              href="tel:+919999999999"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-medium text-white transition-all duration-400 hover:border-gold/40 hover:text-gold hover:bg-white/[0.03] hover:shadow-[0_0_20px_rgba(212,168,67,0.12)] active:scale-[0.98]"
            >
              <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Call Now
              <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Trust Badges — fifth, last to appear */}
          <motion.div
            variants={contactCta.trust}
            className="mt-14 flex flex-wrap items-center justify-center gap-10"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 text-sm text-white/40 transition-all duration-300 hover:text-white/60"
              >
                <badge.icon className="h-4 w-4 text-gold/60 transition-all duration-300 hover:text-gold/80 hover:scale-110" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
