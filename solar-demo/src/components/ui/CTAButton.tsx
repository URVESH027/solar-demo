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

  // Magnetic pull — button follows cursor within ~8px radius
  const magneticX = useSpring(
    useTransform(mouseX, [0, 0.5, 1], [-6, 0, 6]),
    { stiffness: 300, damping: 20 }
  );
  const magneticY = useSpring(
    useTransform(mouseY, [0, 0.5, 1], [-4, 0, 4]),
    { stiffness: 300, damping: 20 }
  );

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-wide select-none outline-none";

  if (variant === "ghost") {
    return (
      <motion.div
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Link
          href={href}
          className={`${base} link-premium px-5 py-2.5 focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          aria-disabled={disabled}
        >
          {label}
        </Link>
      </motion.div>
    );
  }

  if (variant === "secondary") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Link
          href={href}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className={`${base} group relative overflow-hidden rounded-xl px-7 py-3.5 text-gold focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`}
          style={{
            border: "1px solid rgba(212,168,67,0.3)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          aria-disabled={disabled}
        >
          {/* Hover border glow — expands softly */}
          <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              border: "1px solid rgba(212,168,67,0.5)",
              boxShadow: "0 0 0 3px rgba(212,168,67,0.06), inset 0 0 16px rgba(212,168,67,0.04)",
            }}
          />

          {/* Inner highlight — top edge sheen */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(212,168,67,0.4) 50%, transparent 90%)" }}
          />

          {/* Subtle gradient sheen on hover */}
          <span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)" }}
          />

          <span className="relative z-10">{label}</span>
        </Link>
      </motion.div>
    );
  }

  /* ─── Primary ─── */
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="inline-block"
    >
      <motion.div
        style={{ x: magneticX, y: magneticY }}
        className="inline-block"
      >
        <Link
          href={href}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className={`${base} group relative overflow-hidden rounded-xl px-8 py-4 text-navy focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`}
          style={{
            background: "linear-gradient(135deg, #D4A843 0%, #E8C066 45%, #D4A843 100%)",
            boxShadow: "0 4px 16px rgba(212,168,67,0.3), 0 1px 3px rgba(212,168,67,0.15)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          aria-disabled={disabled}
        >
          {/* Top edge sheen — crisp light reflection */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-60"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.8) 50%, transparent 90%)" }}
          />

          {/* Inner reflection — soft gradient depth */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 35%)" }}
          />

          {/* Hover glow layer — shadow expansion */}
          <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: "0 8px 28px rgba(212,168,67,0.4), 0 2px 6px rgba(212,168,67,0.2), inset 0 0 20px rgba(212,168,67,0.06)",
            }}
          />

          {/* Mouse-tracking spotlight */}
          <motion.span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,255,255,0.25), transparent)`,
            }}
          />

          <span className="relative z-10">{label}</span>
          {icon && (
            <motion.span className="relative z-10 inline-flex">
              <ArrowRight className="h-4 w-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
            </motion.span>
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
}
