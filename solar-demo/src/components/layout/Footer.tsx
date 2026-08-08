"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Sun,
} from "lucide-react";
import {
  fadeUp,
  revealLine,
  staggerSlow,
  inViewConfig,
} from "@/lib/motion-variants";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Solar Installation",
  "Panel Cleaning",
  "Annual Maintenance",
  "Commercial Solar",
  "Subsidy Assistance",
];

const socials = [
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK || "#" },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM || "#" },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN || "#" },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE || "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, inViewConfig.standard);

  return (
    <footer ref={footerRef} className="relative border-t border-warm-gray/50 bg-white">
      {/* Animated gold divider */}
      <div className="absolute top-0 left-0 h-px w-full overflow-hidden">
        <motion.div
          variants={revealLine}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-full w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Subtle warm gradient at top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[200px]"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(212,168,67,0.02) 0%, transparent 60%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 lg:px-12">
        {/* Columns reveal sequentially: logo → nav → services → contact/social */}
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-16 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Company Info — reveals first (logo) */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 border border-gold/15 transition-all duration-300 hover:bg-gold/15 hover:border-gold/25 hover:shadow-[0_0_0_4px_rgba(212,168,67,0.06)]">
                <Sun className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight text-navy">
                  Go Green Solution
                </span>
              </div>
            </div>
            <p className="mb-7 max-w-xs text-sm leading-relaxed text-slate">
              Premium solar installations and panel cleaning services that
              protect your investment for 25 years.
            </p>
            <div className="flex flex-col gap-3.5">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+919999999999"}`}
                className="group flex items-center gap-3 text-sm text-slate transition-colors duration-300 hover:text-navy"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/5 border border-gold/8 transition-all duration-300 group-hover:bg-gold/10 group-hover:border-gold/15 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)]">
                  <Phone className="h-3.5 w-3.5 text-gold/60 transition-colors duration-300 group-hover:text-gold" />
                </div>
                {process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 99999 99999"}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in"}`}
                className="group flex items-center gap-3 text-sm text-slate transition-colors duration-300 hover:text-navy"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/5 border border-gold/8 transition-all duration-300 group-hover:bg-gold/10 group-hover:border-gold/15 group-hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)]">
                  <Mail className="h-3.5 w-3.5 text-gold/60 transition-colors duration-300 group-hover:text-gold" />
                </div>
                {process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in"}
              </a>
              <div className="flex items-start gap-3 text-sm text-slate">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/5 border border-gold/8">
                  <MapPin className="h-3.5 w-3.5 text-gold/60" />
                </div>
                {process.env.NEXT_PUBLIC_ADDRESS || "Delhi NCR, India"}
              </div>
            </div>
          </motion.div>

          {/* Quick Links — reveals second */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate transition-all duration-300 hover:text-navy hover:translate-x-0.5"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services — reveals third */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
              Services
            </h3>
            <ul className="flex flex-col gap-3.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-slate transition-all duration-300 hover:text-navy hover:translate-x-0.5 inline-block"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Map + Social — reveals fourth */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
              Our Location
            </h3>
              <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-xl border border-warm-gray/50 bg-cloud transition-all duration-300 hover:border-gold/15 hover:shadow-[0_4px_16px_rgba(10,22,40,0.05)]">
              <div className="flex h-full items-center justify-center text-xs text-muted">
                {process.env.NEXT_PUBLIC_GOOGLE_MAP ? (
                  <iframe
                    src={process.env.NEXT_PUBLIC_GOOGLE_MAP}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Office location"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="h-6 w-6 text-gold/40" />
                    <span>Google Maps</span>
                  </div>
                )}
              </div>
            </div>
            {/* Social — premium icon buttons */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-warm-gray/50 bg-white text-xs font-medium text-slate transition-all duration-300 hover:border-gold/25 hover:bg-gold/5 hover:text-gold hover:shadow-[0_0_0_3px_rgba(212,168,67,0.06)] hover:-translate-y-0.5"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-warm-gray/40 pt-8 md:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Go Green Solution. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted transition-colors duration-300 hover:text-navy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted transition-colors duration-300 hover:text-navy"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
