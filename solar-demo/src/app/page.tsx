import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
        <Hero />
        <ProblemSolution />
        <Services />
        <WhyChoose />
        <SavingsCalculator />
        <Timeline />
        <Projects />
        <BeforeAfter />
        <Testimonials />
        <GoogleReviews />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
