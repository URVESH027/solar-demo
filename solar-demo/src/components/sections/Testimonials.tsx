"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeOutExpo } from "@/lib/animations";
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
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.02] blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-14 text-center md:mb-16"
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.12em] text-slate">
            What Clients Say
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            What our customers say
          </h2>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <div key={t.name} className="mb-5 break-inside-avoid">
              <TestimonialCard
                name={t.name}
                location={t.location}
                projectType={t.projectType}
                review={t.review}
                rating={t.rating}
                image={t.image}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
