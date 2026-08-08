"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  heroContainer,
  heroWord,
  heroParagraph,
  ctaHover,
  ctaSecondaryHover,
  trustStripItem,
} from "@/lib/motion-variants";

/* ═══════════════════════════════════════════════════════════
   HEADLINE — word-by-word reveal with clip mask
   ═══════════════════════════════════════════════════════════ */
const headlineWords = [
  { text: "Own", delay: 0.6 },
  { text: "Your", delay: 0.75 },
  { text: "Power", delay: 0.9 },
];

function HeadlineReveal() {
  return (
    <h1 className="font-display text-[52px] font-bold leading-[1.02] tracking-[-0.035em] text-navy sm:text-[62px] md:text-[72px] lg:text-[80px] xl:text-[88px]" style={{ textWrap: "balance" }}>
      {headlineWords.map((word) => (
        <span
          key={word.text}
          className="mr-[0.28em] inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            variants={heroWord}
            style={{ transformOrigin: "bottom center" }}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA BUTTON — magnetic hover, soft glow, depth, press
   ═══════════════════════════════════════════════════════════ */
function PremiumCTA({
  label,
  href,
  variant = "primary",
}: {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spotlight position for inner glow
  const spotlightX = useTransform(mouseX, [0, 1], [-50, 150]);
  const spotlightY = useTransform(mouseY, [0, 1], [-50, 150]);

  const springX = useSpring(spotlightX, { stiffness: 150, damping: 20 });
  const springY = useSpring(spotlightY, { stiffness: 150, damping: 20 });

  // Magnetic pull — button follows cursor within 8px radius
  const magneticX = useSpring(
    useTransform(mouseX, [0, 0.5, 1], [-6, 0, 6]),
    { stiffness: 300, damping: 20 }
  );
  const magneticY = useSpring(
    useTransform(mouseY, [0, 0.5, 1], [-4, 0, 4]),
    { stiffness: 300, damping: 20 }
  );

  function handleMouse(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  if (variant === "secondary") {
    return (
      <motion.div variants={heroParagraph}>
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={ctaSecondaryHover}
        >
          <Link
            href={href}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-gold/30 bg-transparent px-7 py-3.5 text-sm font-semibold tracking-wide text-gold transition-all duration-400 hover:border-gold/50 hover:bg-gold/[0.04] hover:shadow-[0_0_20px_rgba(212,168,67,0.12)] active:scale-[0.98]"
          >
            {/* Inner highlight on hover */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-0 transition-opacity duration-400 group-hover:opacity-40"
              style={{ background: "linear-gradient(90deg, transparent 10%, rgba(212,168,67,0.5) 50%, transparent 90%)" }}
            />
            <span className="relative z-10">{label}</span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={heroParagraph}>
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={ctaHover}
      >
        <motion.div
          style={{ x: magneticX, y: magneticY }}
          className="inline-block"
        >
          <Link
            href={href}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold tracking-wide text-navy transition-shadow duration-400"
            style={{
              background: "linear-gradient(135deg, #D4A843 0%, #E8C066 45%, #D4A843 100%)",
              boxShadow: "0 4px 16px rgba(212,168,67,0.3), 0 1px 3px rgba(212,168,67,0.15)",
            }}
          >
          {/* Inner highlight (top edge sheen) */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-50"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.8) 50%, transparent 90%)" }}
          />

          {/* Soft reflection (subtle inner glow) */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 30%)" }}
          />

          {/* Light sweep on hover — follows cursor */}
          <motion.span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,255,255,0.25), transparent)`,
            }}
          />

          {/* Hover glow effect — shadow expansion + inner glow */}
          <span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: "0 0 30px rgba(212,168,67,0.35), inset 0 0 20px rgba(212,168,67,0.08)",
            }}
          />

          <span className="relative z-10">{label}</span>
          <motion.span
            className="relative z-10 inline-flex"
            whileHover={{ x: 4, rotate: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5" />
          </motion.span>
        </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST STRIP — sequential reveal, one after another
   ═══════════════════════════════════════════════════════════ */
function TrustStrip() {
  const stats = [
    { value: "700", suffix: "+", label: "Installations" },
    { value: "10", suffix: "+", label: "Years Experience" },
    { value: "4.9", suffix: "\u2605", label: "Rating" },
    { value: "MNRE", suffix: "", label: "Certified" },
  ];

  return (
    <motion.div variants={heroParagraph} className="mt-8">
      <div className="glass-subtle inline-flex flex-wrap items-center gap-x-1 gap-y-2 rounded-2xl px-1.5 py-1.5 sm:gap-x-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={trustStripItem}
            initial="hidden"
            animate="visible"
            className="flex items-center"
          >
            {i > 0 && (
              <div className="mx-3 hidden h-5 w-px bg-navy/[0.08] sm:block" />
            )}
            <div className="flex items-center gap-2 px-3 py-2.5 transition-all duration-300 hover:bg-gold/[0.04] rounded-xl">
              <span className="text-sm font-bold tracking-tight text-navy">
                {stat.value}
                <span className="text-gold">{stat.suffix}</span>
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO CONTENT — main export
   ═══════════════════════════════════════════════════════════ */
export default function HeroContent() {
  return (
    <motion.div
      variants={heroContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 md:gap-8"
    >
      {/* Headline — word-by-word */}
      <HeadlineReveal />

      {/* Subheadline */}
      <motion.p
        variants={heroParagraph}
        className="max-w-[400px] text-[16px] leading-[1.75] text-slate md:text-lg"
      >
        Premium solar installations and panel cleaning services that protect
        your investment for 25 years.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={heroParagraph} className="flex flex-wrap items-center gap-4 pt-2">
        <PremiumCTA label="Get Free Quote" href="#contact" variant="primary" />
        <PremiumCTA label="See Our Work" href="#projects" variant="secondary" />
      </motion.div>

      {/* Trust Strip — sequential reveal */}
      <TrustStrip />
    </motion.div>
  );
}
