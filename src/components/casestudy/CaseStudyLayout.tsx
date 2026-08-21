"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./CaseStudyLayout.module.css";
import Navbar from "../Navbar";
import { EVENTS, projectSlugFor, track } from "@/lib/analytics";

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
  const seenSections = useRef<Set<string>>(new Set());

  /* Report the first time a reader reaches each section of the case study.
     This is what turns "they opened it" into "they read the methods". */
  useEffect(() => {
    if (!activeSection || seenSections.current.has(activeSection)) return;
    seenSections.current.add(activeSection);

    const index = sections.findIndex((s) => s.id === activeSection);
    track(EVENTS.CASE_STUDY_SECTION_VIEW, {
      project_slug: projectSlugFor(window.location.pathname),
      section_id: activeSection,
      section_label: sections[index]?.label ?? activeSection,
      section_index: index + 1,
      section_count: sections.length,
    });
  }, [activeSection, sections]);

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
            data-track="nav_click"
            data-track-link-label={`scrollspy:${section.label}`}
            data-track-location="case_study_scrollspy"
          />
        ))}
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
