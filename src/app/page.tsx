import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import FeaturedWork from "@/components/FeaturedWork";
import ArticlesSection from "@/components/ArticlesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <AboutMeSection />
      <ArticlesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
