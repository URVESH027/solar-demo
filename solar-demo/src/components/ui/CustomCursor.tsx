"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return true;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  const ringX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible],
  );

  useEffect(() => {
    if (isTouch) return;

    document.addEventListener("mousemove", onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, input, select, textarea, [role='button']");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch, onMouseMove]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference transition-[width,height,border-color] duration-200"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          borderColor: isHovering
            ? "rgba(212,168,67,0.5)"
            : "rgba(212,168,67,0.25)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
