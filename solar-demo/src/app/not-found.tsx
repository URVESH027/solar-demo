"use client";

import { motion } from "framer-motion";
import { Sun, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fadeUp, ease, duration } from "@/lib/motion-variants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center"
        role="alert"
      >
        {/* Animated sun */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mb-8"
          aria-hidden="true"
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-gold/20" />
            <div className="absolute inset-2 rounded-full border border-gold/10" />
            <Sun className="h-10 w-10 text-gold" />
          </div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: duration.medium, ease: ease.standard }}
          className="font-display text-7xl font-bold text-white md:text-8xl"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: duration.medium, ease: ease.standard }}
          className="mt-4 max-w-sm text-base text-white/50"
        >
          This page doesn&apos;t exist. It may have been moved or the link might
          be incorrect.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: duration.medium, ease: ease.standard }}
          className="mt-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold-dark hover:shadow-[0_4px_16px_rgba(212,168,67,0.3)] focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
