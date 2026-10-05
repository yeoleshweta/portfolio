import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import FeaturedWork from "@/components/FeaturedWork";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import BeeTrail, { BEE_PATHS } from "@/components/casestudy/BeeTrail";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMeSection />
      <div
        aria-hidden
        style={{
          maxWidth: 720,
          margin: "-24px auto 8px",
          padding: "0 24px",
          opacity: 0.85,
        }}
      >
        <BeeTrail
          {...BEE_PATHS.homeBridge}
          decorative
          label="Decorative bee trail"
        />
      </div>
      <FeaturedWork />
      <AboutSection />
      <ContactSection />
    </>
  );
}
