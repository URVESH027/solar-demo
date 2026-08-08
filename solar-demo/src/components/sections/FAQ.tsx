"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeLeft, staggerMedium, inViewConfig } from "@/lib/motion-variants";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "How long does solar installation take?",
    answer:
      "Residential installations typically take 3\u20137 days from start to finish. This includes site assessment, panel mounting, inverter setup, wiring, and final testing. Commercial projects may take 2\u20134 weeks depending on system size and complexity.",
  },
  {
    question: "Do you help with government subsidies?",
    answer:
      "Yes, we handle the complete subsidy process. This includes MNRE application, state policy compliance, all documentation, and follow-up. Most homeowners receive 20\u201340% subsidies on their installation cost. We process everything so you don\u2019t have to visit any government office.",
  },
  {
    question: "What warranty do you provide?",
    answer:
      "We provide a 25-year performance warranty on all solar panels (guaranteeing 90% output after 10 years and 80% after 25 years), a 10-year workmanship warranty on installation, and a 5\u201310 year inverter warranty depending on the brand. AMC plans extend coverage further.",
  },
  {
    question: "How often should solar panels be cleaned?",
    answer:
      "For optimal performance, we recommend cleaning every 3\u20136 months depending on your location. Areas with heavy dust, pollution, or bird activity may need quarterly cleaning. Our annual maintenance plans include scheduled cleanings with efficiency reports after each visit.",
  },
  {
    question: "Do you offer Annual Maintenance Contracts (AMC)?",
    answer:
      "Yes. Our AMC plans include 2 scheduled visits per year, inverter health checks, wiring audits, panel cleaning, and a performance guarantee SLA. We also offer priority support for AMC customers with 24/7 emergency assistance.",
  },
  {
    question: "Can commercial buildings install solar panels?",
    answer:
      "Absolutely. We design and install commercial solar systems from 25kW to 500kW+. Commercial installations include detailed ROI analysis, government tender support, dedicated project managers, and net metering setup. Many of our commercial clients see payback within 3\u20134 years.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Two-column editorial layout */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* Left — Editorial header (sticky), fades from left */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:sticky lg:top-32 lg:max-w-sm lg:self-start"
          >
            <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
              Common Questions
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl">
              Frequently asked questions
            </h2>
            <p className="text-base leading-relaxed text-slate">
              Everything you need to know about solar installation, subsidies, warranties, and maintenance. Can&apos;t find what you&apos;re looking for? Call us directly.
            </p>
          </motion.div>

          {/* Right — Accordion list, staggered */}
          <div className="flex-1">
            <motion.div
              variants={staggerMedium}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-3"
            >
              {faqs.map((faq, i) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  index={i}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
