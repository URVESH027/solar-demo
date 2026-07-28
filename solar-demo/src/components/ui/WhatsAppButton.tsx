"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { easeOutBack } from "@/lib/animations";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      <motion.a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: easeOutBack }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/25" />
        <span className="absolute -inset-1 animate-pulse rounded-full bg-[#25D366]/10" />

        {/* Icon */}
        <MessageCircle className="relative z-10 h-6 w-6 text-white" />

        {/* Unread dot */}
        <span className="absolute -top-0.5 -right-0.5 z-10 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500 shadow-[0_2px_6px_rgba(239,68,68,0.4)]" />
      </motion.a>
    </div>
  );
}
