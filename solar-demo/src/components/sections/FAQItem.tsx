"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cardEntrance, faqExpand, inViewConfig } from "@/lib/motion-variants";

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
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={inViewConfig.early}
      transition={{ delay: index * 0.06 }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-400"
        style={{
          background: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)",
          border: isOpen
            ? "1px solid rgba(212,168,67,0.25)"
            : "1px solid rgba(226,232,240,0.5)",
          boxShadow: isOpen
            ? "0 2px 8px rgba(10,22,40,0.04), 0 8px 24px rgba(10,22,40,0.04), 0 0 0 3px rgba(212,168,67,0.04)"
            : "0 1px 3px rgba(10,22,40,0.02)",
        }}
      >
        {/* Top accent line — appears on open */}
        <div className="pointer-events-none absolute top-0 left-0 h-px w-full transition-all duration-500"
          style={{
            background: isOpen
              ? "linear-gradient(90deg, transparent 10%, rgba(212,168,67,0.3) 50%, transparent 90%)"
              : "linear-gradient(90deg, transparent, rgba(212,168,67,0), transparent)",
          }}
        />

        {/* Hover state — non-open items */}
        {!isOpen && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            style={{
              background: "linear-gradient(180deg, rgba(212,168,67,0.02) 0%, transparent 100%)",
            }}
          />
        )}

        {/* Glass reflection on hover */}
        {!isOpen && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(165deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
            }}
          />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
          style={{ cursor: "pointer" }}
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <span
            className="text-sm font-semibold transition-colors duration-300 md:text-base"
            style={{
              color: isOpen ? "#0A1628" : "rgba(10,22,40,0.8)",
            }}
          >
            {question}
          </span>
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-400"
            style={{
              background: isOpen ? "rgba(212,168,67,0.1)" : "rgba(241,245,249,0.8)",
              border: isOpen ? "1px solid rgba(212,168,67,0.15)" : "1px solid transparent",
              boxShadow: isOpen ? "0 0 0 3px rgba(212,168,67,0.06)" : "none",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <Plus
              className="h-4 w-4 transition-colors duration-300"
              style={{
                color: isOpen ? "#D4A843" : "rgba(10,22,40,0.4)",
              }}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              role="region"
              variants={faqExpand}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6"
                style={{
                  borderTop: "1px solid rgba(226,232,240,0.4)",
                }}
              >
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
