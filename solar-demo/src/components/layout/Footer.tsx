"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Sun,
} from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

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
  return (
    <footer className="relative border-t border-warm-gray bg-white">
      {/* Animated gold divider */}
      <div className="absolute top-0 left-0 h-px w-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
          className="h-full w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gold/10">
                <Sun className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-tight text-navy">
                  Go Green Solution
                </span>
              </div>
            </div>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-slate">
              Premium solar installations and panel cleaning services that
              protect your investment for 25 years.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+919999999999"}`}
                className="group flex items-center gap-2.5 text-sm text-slate transition-colors hover:text-navy"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gold/5 transition-colors group-hover:bg-gold/10">
                  <Phone className="h-3.5 w-3.5 text-gold/60 transition-colors group-hover:text-gold" />
                </div>
                {process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 99999 99999"}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in"}`}
                className="group flex items-center gap-2.5 text-sm text-slate transition-colors hover:text-navy"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gold/5 transition-colors group-hover:bg-gold/10">
                  <Mail className="h-3.5 w-3.5 text-gold/60 transition-colors group-hover:text-gold" />
                </div>
                {process.env.NEXT_PUBLIC_EMAIL || "info@balajisolar.in"}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-slate">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-gold/5">
                  <MapPin className="h-3.5 w-3.5 text-gold/60" />
                </div>
                {process.env.NEXT_PUBLIC_ADDRESS || "Delhi NCR, India"}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-navy"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-slate transition-colors hover:text-navy"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Placeholder */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
              Our Location
            </h3>
              <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-sm border border-warm-gray bg-cloud">
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
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group flex h-8 w-8 items-center justify-center rounded-sm border border-warm-gray bg-white text-xs font-medium text-slate transition-all duration-200 hover:border-gold/25 hover:bg-gold/5 hover:text-gold"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-warm-gray pt-8 md:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Go Green Solution. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted transition-colors hover:text-navy"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted transition-colors hover:text-navy"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
