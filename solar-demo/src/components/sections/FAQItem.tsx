"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { easeOutExpo } from "@/lib/animations";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export default function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `faq-answer-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: easeOutExpo, delay: index * 0.06 }}
      className="group"
    >
      <div
        className={`overflow-hidden rounded-sm border transition-all duration-300 ${
          isOpen
            ? "border-gold/30 bg-white shadow-[0_4px_16px_rgba(10,22,40,0.04)]"
            : "border-warm-gray bg-white hover:border-gold/20 hover:shadow-[0_2px_8px_rgba(10,22,40,0.03)]"
        }`}
      >
        {/* Top glow on open */}
        <div className={`pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/0 to-transparent transition-all duration-500 ${isOpen ? "via-gold/30" : ""}`} />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-inset md:p-6"
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <span
            className={`text-sm font-semibold transition-colors duration-300 md:text-base ${
              isOpen ? "text-navy" : "text-navy/80"
            }`}
          >
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? "bg-gold/10 shadow-[0_0_0_3px_rgba(212,168,67,0.08)]"
                : "bg-cloud group-hover:bg-gold/10"
            }`}
          >
            <Plus
              className={`h-4 w-4 transition-colors duration-300 ${
                isOpen ? "text-gold" : "text-navy/40"
              }`}
            />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              <div className="border-t border-warm-gray/50 px-5 pb-5 pt-4 md:px-6 md:pb-6">
                <p className="text-sm leading-relaxed text-slate">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
