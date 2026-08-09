"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

/* ═══════════════════════════════════════════════════════════
   SUNLIGHT BEAM — slow GSAP-animated diagonal light
   ═══════════════════════════════════════════════════════════ */
function SunlightBeam() {
  const beamRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!beamRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(beamRef.current, {
        x: "30vw",
        y: "-40vh",
        rotation: 30,
        opacity: 0,
      });
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(beamRef.current, {
        x: "-20vw",
        y: "60vh",
        opacity: 1,
        duration: 12.5,
        ease: "none",
      }).to(beamRef.current, {
        x: "-40vw",
        y: "100vh",
        opacity: 0,
        duration: 12.5,
        ease: "none",
      });
    }, beamRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={beamRef}
      className="sunlight-beam"
      style={{ top: 0, right: 0 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — Full-bleed cinematic composition
   Image occupies 60%+ of visual space, not trapped in a card
   ═══════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* ─── FULL-BLEED BACKGROUND IMAGE ─── */}
      <div className="absolute inset-0 z-0">
        <div
          role="img"
          aria-label="Modern solar panel installation on a residential rooftop at golden hour"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80')",
          }}
        />
        {/* Cinematic gradient overlays — ensure text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(7,26,43,0.7) 0%, rgba(7,26,43,0.4) 30%, rgba(7,26,43,0.5) 60%, rgba(7,26,43,0.85) 100%),
              linear-gradient(90deg, rgba(7,26,43,0.8) 0%, rgba(7,26,43,0.3) 50%, rgba(7,26,43,0.1) 100%)
            `,
          }}
        />
      </div>

      {/* ─── Warm orb — subtle solar presence ─── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div
          className="absolute -top-[10%] -right-[5%] h-[800px] w-[800px] rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, rgba(235,196,106,0.6) 0%, rgba(214,168,74,0.2) 35%, transparent 70%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <SunlightBeam />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[4] noise-overlay opacity-[0.08]" />

      {/* ─── MAIN CONTENT — Left-aligned editorial ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-8 lg:px-12 lg:pt-40 xl:pt-44">
        <div className="max-w-2xl">
          <HeroContent />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
