"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / 80, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const bgAlpha = 0.92 * scrollProgress;
  const blurAmount = Math.round(12 * scrollProgress);
  const borderAlpha = 0.5 * scrollProgress;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300 md:h-[72px]"
        style={{
          backgroundColor: `rgba(255,255,255,${bgAlpha})`,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          borderBottom: `1px solid rgba(226,232,240,${borderAlpha})`,
        }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gold/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-gold"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight text-navy">
                Go Green Solution
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative py-1 text-sm font-medium text-navy/70 transition-colors duration-200 hover:text-navy"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+919999999999"}`}
              className="flex items-center gap-1.5 text-sm font-medium text-navy/60 transition-colors hover:text-navy"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 99999 99999"}</span>
            </a>
            <CTAButton label="Get Free Quote" href="#quote" icon={false} />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-sm text-navy transition-colors hover:bg-cloud md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm border-l border-warm-gray bg-white shadow-2xl md:hidden"
          >
            <div className="flex h-16 items-center justify-end px-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-sm text-navy transition-colors hover:bg-cloud"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm px-4 py-3 text-base font-medium text-navy transition-colors hover:bg-cloud"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-8 border-t border-warm-gray px-6 pt-6">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+919999999999"}`}
                className="mb-4 flex items-center gap-2 text-sm text-slate"
              >
                <Phone className="h-4 w-4" />
                {process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 99999 99999"}
              </a>
              <CTAButton
                label="Get Free Quote"
                href="#quote"
                className="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
