"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface CTAButtonProps {
  label: string;
  href?: string;
  variant?: ButtonVariant;
  icon?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function CTAButton({
  label,
  href = "#",
  variant = "primary",
  icon = true,
  className = "",
  disabled = false,
}: CTAButtonProps) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glX = useTransform(mouseX, [0, 1], [-40, 140]);
  const glY = useTransform(mouseY, [0, 1], [-40, 140]);
  const springX = useSpring(glX, { stiffness: 150, damping: 20 });
  const springY = useSpring(glY, { stiffness: 150, damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-sm text-sm font-semibold tracking-wide select-none outline-none transition-all duration-200";

  if (variant === "ghost") {
    return (
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="inline-block">
        <Link
          href={href}
          className={`${base} px-4 py-2 text-gold underline-offset-4 hover:text-gold-dark hover:underline focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`}
        >
          {label}
        </Link>
      </motion.div>
    );
  }

  if (variant === "secondary") {
    const secondary = (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="inline-block">
        <Link
          href={href}
          onMouseMove={handleMouse}
          className={`${base} group relative overflow-hidden border border-gold/30 bg-transparent px-7 py-3.5 text-gold hover:border-gold/50 hover:bg-gold/5 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`}
        >
          <span className="relative z-10">{label}</span>
        </Link>
      </motion.div>
    );
    return secondary;
  }

  /* ─── Primary ─── */
  const primary = (
    <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="inline-block">
      <Link
        href={href}
        onMouseMove={handleMouse}
        className={`${base} group relative overflow-hidden px-8 py-4 text-navy shadow-[0_4px_14px_-2px_rgba(212,168,67,0.3)] hover:shadow-[0_8px_24px_-4px_rgba(212,168,67,0.35)] focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`}
        style={{
          background: "linear-gradient(135deg, #D4A843 0%, #E8C066 45%, #D4A843 100%)",
        }}
      >
        {/* Top edge sheen */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-60"
          style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.7) 50%, transparent 90%)" }}
        />

        {/* Inner reflection */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 35%)" }}
        />

        {/* Mouse-tracking spotlight */}
        <motion.span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,255,255,0.22), transparent)`,
          }}
        />

        <span className="relative z-10">{label}</span>
        {icon && (
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </Link>
    </motion.div>
  );

  return primary;
}
