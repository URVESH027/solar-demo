"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerSlow, inViewConfig } from "@/lib/motion-variants";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Delhi NCR",
    projectType: "Residential",
    review:
      "Our electricity bill dropped from \u20B94,800 to \u20B91,200 in the first month. The installation team was professional and finished in just 4 days. Best investment we\u2019ve made.",
    rating: 5,
    image: "https://i.pravatar.cc/80?img=11",
  },
  {
    name: "Priya Sharma",
    location: "Gurugram",
    projectType: "Residential",
    review:
      "Balaji handled everything \u2014 subsidy paperwork, net metering, installation. I didn\u2019t have to follow up even once. Truly hassle-free experience.",
    rating: 5,
    image: "https://i.pravatar.cc/80?img=5",
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad",
    projectType: "Commercial",
    review:
      "We installed a 50kW system for our factory. The ROI was better than projected. Their AMC plan keeps everything running perfectly.",
    rating: 5,
    image: "https://i.pravatar.cc/80?img=12",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    projectType: "Residential",
    review:
      "The panel cleaning service brought our efficiency back up by 28%. I didn\u2019t realize how much we were losing to dust. Now we schedule quarterly cleanings.",
    rating: 5,
    image: "https://i.pravatar.cc/80?img=9",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    projectType: "Residential",
    review:
      "From site visit to power generation, everything was completed in 6 days. The team explained every step. Very transparent and trustworthy.",
    rating: 5,
    image: "https://i.pravatar.cc/80?img=14",
  },
  {
    name: "Ananya Iyer",
    location: "Chennai",
    projectType: "Residential",
    review:
      "We were skeptical about solar in an apartment complex. Balaji designed a shared system that works for all 24 flats. Everyone\u2019s bills are down 70%.",
    rating: 5,
    image: "https://i.pravatar.cc/80?img=23",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, inViewConfig.standard);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-32 md:py-44 section-identity-testimonials"
    >
      {/* Background glow — soft centered */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 50%)" }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header — left-aligned for editorial feel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <span className="mb-5 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            What Clients Say
          </span>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
              Trusted by hundreds of homeowners
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-slate lg:text-right">
              Real results from real customers across India.
            </p>
          </div>
        </motion.div>

        {/* Masonry Grid with varied card sizes */}
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="columns-1 gap-6 sm:columns-2 lg:columns-3"
        >
          {testimonials.map((t, i) => (
            <div key={t.name} className="mb-6 break-inside-avoid">
              <TestimonialCard
                name={t.name}
                location={t.location}
                projectType={t.projectType}
                review={t.review}
                rating={t.rating}
                image={t.image}
                index={i}
                featured={i === 0 || i === 3}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
