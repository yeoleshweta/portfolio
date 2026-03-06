import HeroSection from "@/components/HeroSection";
import ExperienceSnippet from "@/components/ExperienceSnippet";
import FeaturedWork from "@/components/FeaturedWork";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ExperienceSnippet />
      <FeaturedWork />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
