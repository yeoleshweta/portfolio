import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Stack from "@/components/Stack";
import Recommendations from "@/components/Recommendations";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Stack />
        <Recommendations />
        <Contact />
      </main>
    </div>
  );
}
