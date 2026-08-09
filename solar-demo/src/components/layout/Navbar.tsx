"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAVBAR_HEIGHT = 72;

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

function scrollToAnchor(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

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

  useEffect(() => {
    if (window.location.hash) {
      const timer = setTimeout(() => {
        scrollToAnchor(window.location.hash);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const bgAlpha = 0.9 * scrollProgress;
  const blurAmount = Math.round(16 * scrollProgress);

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: scrollProgress > 0 ? "56px" : `${NAVBAR_HEIGHT}px`,
          backgroundColor: scrollProgress > 0
            ? `rgba(7,26,43,${bgAlpha})`
            : "transparent",
          backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
        }}
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-gold"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-white">
              Go Green Solution
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor(link.href);
                }}
                className="py-1 text-[12px] font-medium text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToAnchor("#contact");
              }}
              className="rounded-full bg-gold/90 px-5 py-2 text-[12px] font-semibold text-navy transition-all duration-300 hover:bg-gold hover:shadow-[0_2px_12px_rgba(214,168,74,0.3)]"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all duration-300 hover:bg-white/10 active:scale-95 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </motion.header>

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
            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm border-l border-warm-gray bg-white/95 backdrop-blur-xl shadow-2xl md:hidden"
          >
            <div className="flex h-14 items-center justify-end px-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-navy transition-all duration-300 hover:bg-cloud active:scale-95"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-0.5 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => scrollToAnchor(link.href), 300);
                  }}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-navy transition-all duration-300 hover:bg-cloud active:scale-[0.98]"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-6 border-t border-warm-gray px-6 pt-6">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => scrollToAnchor("#contact"), 300);
                }}
                className="block w-full rounded-xl bg-navy px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-navy/90"
              >
                Get Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
