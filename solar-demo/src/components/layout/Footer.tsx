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
    <footer ref={footerRef} className="relative border-t border-white/[0.06] bg-midnight">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-12">
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Company Info */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
                <Sun className="h-4 w-4 text-gold" />
              </div>
              <span className="text-[14px] font-semibold tracking-tight text-white">
                Go Green Solution
              </span>
            </div>
            <p className="mb-5 max-w-xs text-[13px] leading-[1.7] text-white/35">
              Premium solar installations and panel cleaning services that
              protect your investment for 25 years.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+919999999999"}`}
                className="flex items-center gap-2.5 text-[13px] text-white/35 transition-colors duration-300 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-gold/40" />
                {process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 99999 99999"}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in"}`}
                className="flex items-center gap-2.5 text-[13px] text-white/35 transition-colors duration-300 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-gold/40" />
                {process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in"}
              </a>
              <div className="flex items-start gap-2.5 text-[13px] text-white/35">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-gold/40" />
                {process.env.NEXT_PUBLIC_ADDRESS || "Delhi NCR, India"}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-[13px] text-white/35 transition-all duration-300 hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-[13px] text-white/35 transition-all duration-300 hover:text-white"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Map + Social */}
          <motion.div variants={fadeUp}>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
              Our Location
            </h3>
            <div className="mb-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]">
              <div className="flex h-full items-center justify-center text-xs text-white/20">
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
                    <MapPin className="h-5 w-5 text-gold/25" />
                    <span>Google Maps</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-[10px] font-medium text-white/25 transition-all duration-300 hover:border-gold/20 hover:bg-gold/5 hover:text-gold"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 md:flex-row">
          <p className="text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} Go Green Solution. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-[11px] text-white/20 transition-colors duration-300 hover:text-white/40"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[11px] text-white/20 transition-colors duration-300 hover:text-white/40"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
