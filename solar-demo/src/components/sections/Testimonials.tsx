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

  const dominant = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cloud py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-14 md:mb-16"
        >
          <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate/60">
            What Clients Say
          </span>
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-navy md:text-4xl lg:text-5xl" style={{ textWrap: "balance" }}>
            Trusted by hundreds of homeowners
          </h2>
        </motion.div>

        {/* Dominant testimonial + smaller grid */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Dominant — large featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:w-[45%]"
          >
            <TestimonialCard
              name={dominant.name}
              location={dominant.location}
              projectType={dominant.projectType}
              review={dominant.review}
              rating={dominant.rating}
              image={dominant.image}
              index={0}
              featured
            />
          </motion.div>

          {/* Smaller grid */}
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex-1 grid gap-5 sm:grid-cols-2"
          >
            {rest.map((t, i) => (
              <div key={t.name}>
                <TestimonialCard
                  name={t.name}
                  location={t.location}
                  projectType={t.projectType}
                  review={t.review}
                  rating={t.rating}
                  image={t.image}
                  index={i + 1}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
