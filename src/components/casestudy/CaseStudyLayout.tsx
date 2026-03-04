"use client";

import React, { useEffect, useState } from "react";
import styles from "./CaseStudyLayout.module.css";
import Navbar from "../Navbar";

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  sections: { id: string; label: string }[];
}

export default function CaseStudyLayout({
  children,
  sections,
}: CaseStudyLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for scroll progress line
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Logic for active section dots
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.layout}>
      <Navbar />

      <div className={styles.scrollSpy}>
        <div className={styles.progressLine} />
        <div
          className={styles.progressFill}
          style={{ height: `${scrollProgress}%` }}
        />
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.dot} ${activeSection === section.id ? styles.dotActive : ""}`}
            onClick={() => scrollTo(section.id)}
            aria-label={`Scroll to ${section.label}`}
          />
        ))}
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
