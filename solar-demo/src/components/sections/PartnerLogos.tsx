"use client";

import { motion } from "framer-motion";
import { partnerLogos } from "@/lib/motion-variants";

const partners = [
  "Tata Power Solar",
  "Adani Solar",
  "Luminous",
  "Havells",
  "Polycab",
];

export default function PartnerLogos() {
  return (
    <div className="relative z-10">
      {/* Divider line — premium gradient */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(226,232,240,0.4) 20%, rgba(226,232,240,0.6) 50%, rgba(226,232,240,0.4) 80%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        variants={partnerLogos.container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-10 lg:px-12"
      >
        <p className="mb-7 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/60">
          Trusted Technology Partners
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-4 md:gap-x-20">
          {partners.map((name) => (
            <motion.span
              key={name}
              variants={partnerLogos.item}
              className="cursor-default text-[13px] font-medium text-navy/15 transition-all duration-400 hover:text-navy/35 hover:tracking-wide hover:scale-105"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
