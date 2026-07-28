"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e: PointerEvent) => updatePosition(e.clientX);
      const handleGlobalUp = () => setIsDragging(false);
      window.addEventListener("pointermove", handleGlobalMove);
      window.addEventListener("pointerup", handleGlobalUp);
      return () => {
        window.removeEventListener("pointermove", handleGlobalMove);
        window.removeEventListener("pointerup", handleGlobalUp);
      };
    }
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-sm"
      style={{ aspectRatio: "16/10" }}
    >
      {/* After image (full width, behind) */}
      <div
        role="img"
        aria-label="Clean solar panels after professional cleaning"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${afterImage}')` }}
      />

      {/* Before image (clipped) */}
      <div
        role="img"
        aria-label="Dirty solar panels before cleaning"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${beforeImage}')`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      {/* Edge shadow on before side */}
      <div
        className="absolute top-0 bottom-0 z-[2] w-8"
        style={{
          left: `${position}%`,
          transform: "translateX(-100%)",
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.15))",
        }}
      />

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-px bg-white/90"
        style={{ left: `${position}%` }}
      />

      {/* Slider handle — glass design */}
      <motion.div
        className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${position}%` }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/70 shadow-[0_4px_16px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <GripVertical className="h-4 w-4 text-white/90" />
        </div>
      </motion.div>

      {/* Labels — glass badges */}
      <div className="absolute top-4 left-4 z-10 rounded-sm border border-white/15 bg-navy/60 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-md">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-10 rounded-sm border border-gold/20 bg-gold/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-navy backdrop-blur-md">
        {afterLabel}
      </div>
    </div>
  );
}
