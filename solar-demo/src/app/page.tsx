import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionReveal from "@/components/layout/SectionReveal";
import SectionConnector from "@/components/layout/SectionConnector";
import ScrollAtmosphere from "@/components/ui/ScrollAtmosphere";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Services from "@/components/sections/Services";
import WhyChoose from "@/components/sections/WhyChoose";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
import GoogleReviews from "@/components/sections/GoogleReviews";
import FAQ from "@/components/sections/FAQ";
import ContactCTA from "@/components/sections/ContactCTA";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollAtmosphere />
      <Navbar />
      <main id="main-content">
        {/* Hero — cinematic entrance, no connector above */}
        <Hero />

        {/* Hero → ProblemSolution: cloud → cloud */}
        <SectionConnector from="cloud" to="cloud" height={40} glow={false} />
        <SectionReveal variant="slide-up" glow="gold" glowPosition="top">
          <ProblemSolution />
        </SectionReveal>

        {/* ProblemSolution → Services: cloud → transparent */}
        <SectionConnector from="cloud" to="transparent" height={60} />
        <SectionReveal variant="fade" glow="gold" glowPosition="center">
          <Services />
        </SectionReveal>

        {/* Services → WhyChoose: transparent → navy */}
        <SectionConnector from="transparent" to="navy" height={80} />
        <SectionReveal variant="scale">
          <WhyChoose />
        </SectionReveal>

        {/* WhyChoose → SavingsCalculator: navy → cloud */}
        <SectionConnector from="navy" to="cloud" height={80} />
        <SectionReveal variant="slide-up" glow="gold" glowPosition="center">
          <SavingsCalculator />
        </SectionReveal>

        {/* SavingsCalculator → Timeline: cloud → transparent */}
        <SectionConnector from="cloud" to="transparent" height={60} />
        <SectionReveal variant="mask" glow="gold" glowPosition="top">
          <Timeline />
        </SectionReveal>

        {/* Timeline → Projects: transparent → cloud */}
        <SectionConnector from="transparent" to="cloud" height={60} />
        <SectionReveal variant="fade">
          <Projects />
        </SectionReveal>

        {/* Projects → BeforeAfter: cloud → transparent */}
        <SectionConnector from="cloud" to="transparent" height={60} />
        <SectionReveal variant="slide-up" glow="gold" glowPosition="center">
          <BeforeAfter />
        </SectionReveal>

        {/* BeforeAfter → Testimonials: transparent → cloud */}
        <SectionConnector from="transparent" to="cloud" height={60} />
        <SectionReveal variant="fade" glow="gold" glowPosition="center">
          <Testimonials />
        </SectionReveal>

        {/* Testimonials → GoogleReviews: cloud → navy */}
        <SectionConnector from="cloud" to="navy" height={80} />
        <SectionReveal variant="scale">
          <GoogleReviews />
        </SectionReveal>

        {/* GoogleReviews → FAQ: navy → transparent */}
        <SectionConnector from="navy" to="transparent" height={80} />
        <SectionReveal variant="slide-up">
          <FAQ />
        </SectionReveal>

        {/* FAQ → ContactCTA: transparent → navy */}
        <SectionConnector from="transparent" to="navy" height={80} />
        <SectionReveal variant="fade" glow="gold" glowPosition="center">
          <ContactCTA />
        </SectionReveal>

        {/* ContactCTA → Footer: navy → white */}
        <SectionConnector from="navy" to="white" height={60} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
