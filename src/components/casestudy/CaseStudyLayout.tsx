"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./CaseStudyLayout.module.css";
import { EVENTS, projectSlugFor, track } from "@/lib/analytics";
import { scrollToSection } from "@/lib/scrollToSection";
import { studyFromPath, studyNeighbors } from "@/content/caseStudyBriefs";
import {
  CaseStudyPager,
  MicroTemplate,
  TldrCard,
} from "@/components/casestudy/CaseStudyExtras";

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  sections: { id: string; label: string }[];
  /** Skip the auto-rendered micro/TL;DR teaser — for a page that builds its own overview section. */
  hideBrief?: boolean;
}

function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return null;
  return Math.max(1, Math.round(words / 220));
}

function TocList({
  sections,
  activeSection,
  onNavigate,
}: {
  sections: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <ul className={styles.tocList}>
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={styles.tocLink}
            aria-current={activeSection === section.id ? "true" : undefined}
            onClick={(event) => onNavigate(event, section.id)}
            data-track="nav_click"
            data-track-link-label={`toc:${section.label}`}
            data-track-location="case_study_toc"
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyLayout({
  children,
  sections,
  hideBrief = false,
}: CaseStudyLayoutProps) {
  const pathname = usePathname();
  const brief = studyFromPath(pathname);
  const neighbors = brief ? studyNeighbors(brief.slug) : { previous: undefined, next: undefined };
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [minutes, setMinutes] = useState<number | null>(null);
  const seenSections = useRef<Set<string>>(new Set());
  const bodyRef = useRef<HTMLDivElement>(null);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    const measure = () => {
      const text = bodyRef.current?.innerText ?? "";
      setMinutes(readingMinutes(text));
    };
    measure();
    const timer = window.setTimeout(measure, 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const onNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className={styles.layout} data-case-study-layout>
      <nav className={styles.toc} aria-label="On this page">
        <p className={styles.tocHeading}>On this page</p>
        <TocList
          sections={sections}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      </nav>

      <div className={styles.main} data-case-study-body ref={bodyRef}>
        <details className={styles.tocCompact}>
          <summary>On this page</summary>
          <TocList
            sections={sections}
            activeSection={activeSection}
            onNavigate={onNavigate}
          />
        </details>

        {minutes ? (
          <p className={styles.readingTime} data-layout-reading-time>
            {minutes} min read
          </p>
        ) : null}

        {!hideBrief && brief?.kind === "featured" && brief.tldr ? (
          <TldrCard summary={brief.summary} tldr={brief.tldr} />
        ) : null}
        {!hideBrief && brief?.kind === "micro" && brief.micro ? (
          <MicroTemplate micro={brief.micro} />
        ) : null}

        {children}

        <CaseStudyPager previous={neighbors.previous} next={neighbors.next} />
      </div>
    </div>
  );
}
