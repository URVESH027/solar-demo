"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

/* ═══════════════════════════════════════════════════════════
   CONTAINER — choreographed stagger
   ═══════════════════════════════════════════════════════════ */
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

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
    <h1 className="font-display text-[44px] font-bold leading-[1.02] tracking-[-0.035em] text-navy sm:text-[54px] md:text-[62px] lg:text-[70px] xl:text-[76px]" style={{ textWrap: "balance" }}>
      {headlineWords.map((word) => (
        <span
          key={word.text}
          className="mr-[0.28em] inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: 40 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{
              duration: 0.9,
              ease: easeOutExpo,
              delay: word.delay,
            }}
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
   CTA BUTTON — premium gold gradient with effects
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

  const spotlightX = useTransform(mouseX, [0, 1], [-50, 150]);
  const spotlightY = useTransform(mouseY, [0, 1], [-50, 150]);

  const springX = useSpring(spotlightX, { stiffness: 150, damping: 20 });
  const springY = useSpring(spotlightY, { stiffness: 150, damping: 20 });

  function handleMouse(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  if (variant === "secondary") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.1 }}
      >
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link
            href={href}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded border border-gold/30 bg-transparent px-7 py-3.5 text-sm font-semibold tracking-wide text-gold transition-all duration-300 hover:border-gold/50 hover:bg-gold/5"
          >
            <span className="relative z-10">{label}</span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.95 }}
    >
      <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
        <Link
          href={href}
          onMouseMove={handleMouse}
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded px-8 py-4 text-sm font-semibold tracking-wide text-navy shadow-gold transition-shadow duration-300 hover:shadow-gold-lg"
          style={{
            background: "linear-gradient(135deg, #D4A843 0%, #E8C066 45%, #D4A843 100%)",
          }}
        >
          {/* Inner highlight (top edge sheen) */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-60"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.7) 50%, transparent 90%)" }}
          />

          {/* Soft reflection (subtle inner glow) */}
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%)" }}
          />

          {/* Light sweep on hover */}
          <motion.span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 120px at ${springX}px ${springY}px, rgba(255,255,255,0.25), transparent)`,
            }}
          />

          <span className="relative z-10">{label}</span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST STRIP — glass container with animated numbers
   ═══════════════════════════════════════════════════════════ */
function TrustStrip() {
  const stats = [
    { value: "700", suffix: "+", label: "Installations" },
    { value: "10", suffix: "+", label: "Years Experience" },
    { value: "4.9", suffix: "★", label: "Rating" },
    { value: "MNRE", suffix: "", label: "Certified" },
  ];

  return (
    <motion.div variants={item} className="mt-4">
      <div className="glass-subtle inline-flex flex-wrap items-center gap-x-1 gap-y-2 rounded-sm px-1 py-1 sm:gap-x-0">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            {i > 0 && (
              <div className="mx-3 hidden h-5 w-px bg-navy/[0.08] sm:block" />
            )}
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-sm font-bold tracking-tight text-navy">
                {stat.value}
                <span className="text-gold">{stat.suffix}</span>
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                {stat.label}
              </span>
            </div>
          </div>
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
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-5 md:gap-7"
    >
      {/* Headline */}
      <HeadlineReveal />

      {/* Subheadline */}
      <motion.p
        variants={item}
        className="max-w-[380px] text-[15px] leading-[1.7] text-slate md:text-base"
      >
        Premium solar installations and panel cleaning services that protect
        your investment for 25 years.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-1">
        <PremiumCTA label="Get Free Quote" href="#contact" variant="primary" />
        <PremiumCTA label="See Our Work" href="#projects" variant="secondary" />
      </motion.div>

      {/* Trust Strip */}
      <TrustStrip />
    </motion.div>
  );
}
