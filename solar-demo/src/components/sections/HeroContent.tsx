"use client";

import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const headlineLines = [
  { words: ["Own", "Your"], highlight: false },
  { words: ["Power"], highlight: true },
];

/* ═══════════════════════════════════════════════════════════
   HEADLINE — editorial word-by-word reveal
   ═══════════════════════════════════════════════════════════ */
function HeadlineReveal() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h1 className="font-display text-[56px] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[68px] md:text-[78px] lg:text-[86px] xl:text-[96px]">
      {headlineLines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.words.map((word, wordIdx) => {
            const globalIdx = lineIdx * 2 + wordIdx;
            return (
              <span key={word} className="mr-[0.25em] inline-block">
                <motion.span
                  className="inline-block"
                  style={{ transformOrigin: "bottom center" }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 50, scale: 0.97 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease,
                    delay: 0.2 + globalIdx * 0.12,
                  }}
                >
                  {line.highlight ? (
                    <span className="text-gold">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA BUTTON — clean, refined entrance
   ═══════════════════════════════════════════════════════════ */
function PremiumCTA({
  label,
  href,
  variant = "primary",
  delay = 0.75,
}: {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const spotlightX = useTransform(mouseX, [0, 1], [-50, 150]);
  const spotlightY = useTransform(mouseY, [0, 1], [-50, 150]);

  const springX = useSpring(spotlightX, { stiffness: 150, damping: 20 });
  const springY = useSpring(spotlightY, { stiffness: 150, damping: 20 });

  const magneticX = useSpring(
    useTransform(mouseX, [0, 0.5, 1], [-6, 0, 6]),
    { stiffness: 300, damping: 20 },
  );
  const magneticY = useSpring(
    useTransform(mouseY, [0, 0.5, 1], [-4, 0, 4]),
    { stiffness: 300, damping: 20 },
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
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay }}
      >
        <Link
          href={href}
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/80 transition-all duration-400 hover:border-gold/40 hover:text-gold hover:bg-white/[0.03]"
        >
          <span>{label}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <motion.div
        style={{ x: magneticX, y: magneticY }}
        className="inline-block"
      >
        <Link
          href={href}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-navy transition-shadow duration-400"
          style={{
            background:
              "linear-gradient(135deg, #D6A84A 0%, #EBC46A 45%, #D6A84A 100%)",
            boxShadow:
              "0 4px 16px rgba(214,168,74,0.3), 0 1px 3px rgba(214,168,74,0.15)",
          }}
        >
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-50"
            style={{
              background:
                "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.8) 50%, transparent 90%)",
            }}
          />
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 30%)",
            }}
          />
          <motion.span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,255,255,0.25), transparent)`,
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
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST STRIP — pure editorial text, no icons
   ═══════════════════════════════════════════════════════════ */
function TrustStrip() {
  const prefersReducedMotion = useReducedMotion();
  const items = [
    "25-Year Warranty",
    "MNRE Certified",
    "Tier-1 Panels",
    "5-7 Year ROI",
  ];

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 1.1 }}
      className="flex flex-wrap items-center gap-x-1 gap-y-2"
    >
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 1.2 + i * 0.08 }}
          className="text-[11px] font-medium uppercase tracking-[0.06em] text-white/40"
        >
          {i > 0 && <span className="mr-1 text-white/20">&middot;</span>}
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO CONTENT — main export
   ═══════════════════════════════════════════════════════════ */
export default function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-7 md:gap-8">
      {/* Eyebrow */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="inline-flex w-fit items-center gap-2"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/80">
          Solar Energy. Built for Tomorrow.
        </span>
      </motion.div>

      {/* Headline — editorial */}
      <HeadlineReveal />

      {/* Subheadline */}
      <motion.p
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
        className="max-w-[420px] text-[16px] leading-[1.7] text-white/50 md:text-lg"
      >
        Premium solar solutions for homes, businesses and industries. Save More, Live Greener. Power your today. Protect your tomorrow.
      </motion.p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <PremiumCTA
          label="Get Free Solar Quote"
          href="#contact"
          variant="primary"
          delay={0.75}
        />
        <PremiumCTA
          label="Explore Solutions"
          href="#services"
          variant="secondary"
          delay={0.85}
        />
      </div>

      {/* Trust Strip — editorial text only */}
      <TrustStrip />
    </div>
  );
}
