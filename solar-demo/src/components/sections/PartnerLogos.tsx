"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";

const partners = [
  "Tata Power Solar",
  "Adani Solar",
  "Luminous",
  "Havells",
  "Polycab",
];

const logoContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.6,
    },
  },
};

const logoItem = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export default function PartnerLogos() {
  return (
    <div className="relative z-10">
      {/* Divider line */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-navy/[0.08] to-transparent" />
      </div>

      <motion.div
        variants={logoContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-7 lg:px-12"
      >
        <p className="mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/70">
          Trusted Technology Partners
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {partners.map((name) => (
            <motion.span
              key={name}
              variants={logoItem}
              className="cursor-default text-[13px] font-medium text-navy/20 transition-all duration-300 hover:text-navy/40 hover:tracking-wide"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
