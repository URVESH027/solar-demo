import type { Variants, Transition, BezierDefinition } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   MOTION TOKENS — Reusable timing and easing
   ═══════════════════════════════════════════════════════════ */

export const ease = {
  /** Standard — smooth deceleration */
  standard: [0.22, 1, 0.36, 1] as const,
  /** Spring — bouncy overshoot */
  spring: [0.34, 1.56, 0.64, 1] as const,
  /** Gentle — very soft deceleration */
  gentle: [0.25, 0.1, 0.25, 1] as const,
  /** Dramatic — fast start, slow finish */
  dramatic: [0.16, 1, 0.3, 1] as const,
} as const;

export const duration = {
  /** 150ms — micro interactions */
  instant: 0.15,
  /** 250ms — button feedback, icon pulses */
  fast: 0.25,
  /** 400ms — card hovers, small reveals */
  medium: 0.4,
  /** 600ms — section reveals, text animations */
  slow: 0.6,
  /** 800ms — hero entrance, dramatic reveals */
  hero: 0.8,
  /** 1000ms — cinematic moments */
  cinematic: 1.0,
} as const;

export const stagger = {
  /** 40ms — tight groups (icon + label) */
  fast: 0.04,
  /** 80ms — card grids, list items */
  medium: 0.08,
  /** 120ms — section elements, editorial headers */
  slow: 0.12,
  /** 200ms — hero sequence stages */
  hero: 0.2,
} as const;

/* ═══════════════════════════════════════════════════════════
   REUSABLE TRANSITIONS
   ═══════════════════════════════════════════════════════════ */

export const springTransition = (
  stiffness = 300,
  damping = 30,
): Transition => ({
  type: "spring",
  stiffness,
  damping,
});

export const tweenTransition = (
  dur: number = duration.slow,
  easeFn: BezierDefinition = ease.standard as unknown as BezierDefinition,
): Transition => ({
  duration: dur,
  ease: easeFn,
});

/* ═══════════════════════════════════════════════════════════
   FADE — Pure opacity
   ═══════════════════════════════════════════════════════════ */

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: tweenTransition(duration.slow),
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenTransition(duration.slow),
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tweenTransition(duration.slow),
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: tweenTransition(duration.slow),
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: tweenTransition(duration.slow),
  },
};

/* ═══════════════════════════════════════════════════════════
   SLIDE — Directional with scale
   ═══════════════════════════════════════════════════════════ */

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: tweenTransition(duration.slow),
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: tweenTransition(duration.slow),
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: tweenTransition(duration.slow),
  },
};

/* ═══════════════════════════════════════════════════════════
   SCALE — Scale-focused reveals
   ═══════════════════════════════════════════════════════════ */

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: tweenTransition(duration.slow),
  },
};

export const scaleSpring: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition(200, 20),
  },
};

/* ═══════════════════════════════════════════════════════════
   STAGGER — Container variants for child orchestration
   ═══════════════════════════════════════════════════════════ */

export const staggerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: stagger.fast,
    },
  },
};

export const staggerMedium: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.medium,
      delayChildren: stagger.medium,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: stagger.slow,
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   REVEAL — Masked / clip-path reveals
   ═══════════════════════════════════════════════════════════ */

export const revealUp: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: 40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: duration.hero,
      ease: ease.standard,
    },
  },
};

export const revealLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: duration.slow,
      ease: ease.standard,
    },
  },
};

export const revealMask: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: duration.cinematic,
      ease: ease.dramatic,
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   CARDS — Card-specific hover and entrance
   ═══════════════════════════════════════════════════════════ */

export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: tweenTransition(duration.slow),
  },
};

export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: springTransition(400, 30),
  },
  hover: {
    y: -3,
    scale: 1.005,
    transition: springTransition(400, 30),
  },
};

export const cardHoverSubtle = {
  rest: {
    y: 0,
    transition: springTransition(400, 30),
  },
  hover: {
    y: -1.5,
    transition: springTransition(400, 30),
  },
};

/* ═══════════════════════════════════════════════════════════
   CTA — Button interactions
   ═══════════════════════════════════════════════════════════ */

export const ctaHover = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 4px 16px rgba(212,168,67,0.3), 0 1px 3px rgba(212,168,67,0.15)",
    transition: springTransition(400, 17),
  },
  hover: {
    y: -2,
    scale: 1.01,
    boxShadow: "0 8px 28px rgba(212,168,67,0.4), 0 2px 6px rgba(212,168,67,0.2), inset 0 0 20px rgba(212,168,67,0.06)",
    transition: springTransition(400, 17),
  },
  tap: {
    y: 0,
    scale: 0.985,
    boxShadow: "0 2px 8px rgba(212,168,67,0.2), 0 1px 2px rgba(212,168,67,0.1)",
    transition: springTransition(400, 17),
  },
};

export const ctaSecondaryHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: springTransition(400, 17),
  },
  hover: {
    y: -2,
    scale: 1.01,
    transition: springTransition(400, 17),
  },
  tap: {
    y: 0,
    scale: 0.985,
    transition: springTransition(400, 17),
  },
};

/* ═══════════════════════════════════════════════════════════
   HERO — Cinematic entrance sequence
   ═══════════════════════════════════════════════════════════ */

export const heroContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.hero,
      delayChildren: 0.5,
    },
  },
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.medium,
      ease: ease.standard,
    },
  },
};

export const heroWord: Variants = {
  hidden: { y: "110%", rotateX: 40 },
  visible: {
    y: 0,
    rotateX: 0,
    transition: {
      duration: duration.hero,
      ease: ease.standard,
    },
  },
};

export const heroParagraph: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.slow,
      ease: ease.standard,
    },
  },
};

export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: duration.cinematic,
      ease: ease.standard,
      delay: 0.4,
    },
  },
};

export const heroFloatingBadge: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.standard,
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   SIGNATURE HERO — Enhanced cinematic experience
   ═══════════════════════════════════════════════════════════ */

/** Floating badge breathing — gentle vertical pulse, each badge unique */
export const badgeBreathing = {
  /** MNRE badge — 4s cycle */
  mnre: {
    y: [0, -3, 0] as number[],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  /** Warranty badge — 5s cycle, delayed */
  warranty: {
    y: [0, -4, 0] as number[],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
  },
  /** Tier-1 badge — 3.5s cycle, offset */
  tier1: {
    y: [0, -2.5, 0] as number[],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
  },
};

/** Trust strip item — individual reveal with staggered delays */
export const trustStripItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.standard,
      delay: 1.8 + i * 0.1,
    },
  }),
};

/** Scroll indicator — elegant fade and float */
export const scrollIndicatorReveal: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.standard,
      delay: 2.2,
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   TIMELINE — Progressive step reveal
   ═══════════════════════════════════════════════════════════ */

export const timelineContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.3,
    },
  },
};

export const timelineNode: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition(200, 20),
  },
};

export const timelineLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: duration.cinematic,
      ease: ease.standard,
    },
  },
};

export const timelineLineVertical: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: duration.cinematic,
      ease: ease.standard,
    },
  },
};

/* ═══════════════════════════════════════════════════════════
   COUNTER — Number animation trigger
   ═══════════════════════════════════════════════════════════ */

export const counterTrigger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
};

/* ═══════════════════════════════════════════════════════════
   SECTION — Each section's unique reveal identity
   ═══════════════════════════════════════════════════════════ */

/** ProblemSolution — dark card slides left, image slides right */
export const problemSolution = {
  container: staggerSlow,
  darkCard: slideLeft,
  image: slideRight,
  solution: fadeUp,
};

/** Services — editorial header + featured card + grid */
export const services = {
  container: staggerSlow,
  header: fadeUp,
  featured: slideUp,
  grid: staggerMedium,
};

/** WhyChoose — stats + bento grid */
export const whyChoose = {
  container: staggerSlow,
  stats: fadeUp,
  bento: staggerMedium,
};

/** Calculator — sidebar + results */
export const calculator = {
  container: staggerSlow,
  sidebar: slideLeft,
  results: fadeUp,
};

/** Timeline — alternating progressive */
export const timeline = {
  container: timelineContainer,
  node: timelineNode,
  line: timelineLine,
  content: fadeUp,
};

/** Projects — portfolio showcase */
export const projects = {
  container: staggerSlow,
  hero: slideUp,
  grid: staggerMedium,
  /** Image reveals first with subtle scale */
  imageReveal: {
    hidden: { opacity: 0, scale: 1.06 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: tweenTransition(duration.cinematic),
    },
  },
  /** Content fades up after image */
  contentReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: tweenTransition(duration.slow),
    },
  },
  /** Individual metric stagger */
  metricReveal: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: tweenTransition(duration.medium),
    },
  },
  /** Floating badge entrance */
  badgeFloat: {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springTransition(200, 22),
    },
  },
  /** CTA reveal — last in sequence */
  ctaReveal: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: tweenTransition(duration.medium),
    },
  },
};

/** BeforeAfter — comparison + stats */
export const beforeAfter = {
  container: staggerSlow,
  comparison: slideLeft,
  stats: staggerFast,
};

/** Testimonials — masonry stagger */
export const testimonials = {
  container: staggerSlow,
  card: cardEntrance,
};

/** GoogleReviews — full-width reveal */
export const googleReviews = {
  container: staggerSlow,
  card: slideUp,
};

/** FAQ — two-column editorial */
export const faq = {
  container: staggerSlow,
  header: fadeLeft,
  accordion: staggerMedium,
};

/** ContactCTA — dramatic entrance */
export const contactCta = {
  container: staggerSlow,
  badge: heroBadge,
  heading: fadeUp,
  paragraph: fadeUp,
  buttons: fadeUp,
  trust: fadeUp,
};

/** PartnerLogos — delayed cascade */
export const partnerLogos = {
  container: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.medium,
        delayChildren: 1.6,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: tweenTransition(duration.slow),
    },
  },
};

/** TestimonialCard — inner cascade: icon → photo → text → author */
export const testimonialCard = {
  container: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.fast,
        delayChildren: stagger.fast,
      },
    },
  },
  icon: fadeUp,
  photo: scaleSpring,
  text: fadeUp,
  author: fadeUp,
};

/** FAQItem — expand animation */
export const faqExpand = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: duration.medium, ease: ease.standard },
      opacity: { duration: duration.fast, ease: ease.standard, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: duration.medium, ease: ease.standard },
      opacity: { duration: duration.fast, ease: ease.standard },
    },
  },
};

/** CalculatorCard — result item stagger */
export const calculatorResults = {
  container: staggerFast,
  item: fadeUp,
};

/* ═══════════════════════════════════════════════════════════
   SIGNATURE CALCULATOR — Premium interactive experience
   ═══════════════════════════════════════════════════════════ */

/** Calculator — progressive reveal sequence */
export const calculatorReveal = {
  panel: slideLeft,
  results: fadeUp,
  card: cardEntrance,
  trust: fadeUp,
};

/** CalculatorCard — hover depth and icon animation */
export const calculatorCardHover = {
  item: {
    rest: {
      y: 0,
      scale: 1,
      transition: springTransition(400, 30),
    },
    hover: {
      y: -3,
      scale: 1.005,
      transition: springTransition(400, 30),
    },
  },
  icon: {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 3,
      transition: springTransition(200, 15),
    },
  },
};

/** Savings emphasis — primary metric celebration on update */
export const savingsEmphasis = {
  scale: [1, 1.03, 1],
  transition: { duration: 0.4, ease: ease.standard },
};

/** Trust strip item — sequential reveal */
export const calculatorTrustItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.standard,
      delay: 0.8 + i * 0.1,
    },
  }),
};

/* ═══════════════════════════════════════════════════════════
   INVIEW CONFIG — Consistent trigger settings
   ═══════════════════════════════════════════════════════════ */

export const inViewConfig = {
  /** Standard — triggers when 20% visible */
  standard: { once: true, margin: "-80px" as const },
  /** Early — triggers when 30% visible */
  early: { once: true, margin: "-40px" as const },
  /** Late — triggers when 10% visible */
  late: { once: true, margin: "-120px" as const },
  /** Hero — triggers at viewport center */
  hero: { once: true, margin: "0px" as const },
} as const;
