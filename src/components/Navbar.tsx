"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Book,
  Briefcase,
  Download,
  Home,
  Mail,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import styles from "./Navbar.module.css";
import { useMotionOff } from "@/components/MotionControl";
import { scrollToSection, scrollToTop } from "@/lib/scrollToSection";

const navLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/#work", icon: Book },
  { label: "Blog", href: "/#articles", icon: Newspaper },
  { label: "Career", href: "/experience", icon: Briefcase },
  { label: "Contact", href: "/#contact", icon: Mail },
];

const pageSections = ["work", "articles", "contact"];

const cvHref = "/assets/UX_Researcher_Resume.pdf";

/** Quiet time after the last scroll event before the bar grows back. */
const SCROLL_SETTLE_MS = 200;

export default function Navbar() {
  const pathname = usePathname();
  const motionOff = useMotionOff();
  const [compact, setCompact] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let settle = 0;
    const onScroll = () => {
      setCompact(true);
      window.clearTimeout(settle);
      settle = window.setTimeout(() => setCompact(false), SCROLL_SETTLE_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = pageSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        setActiveSection(best && best[1] > 0 ? best[0] : null);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const currentFor = (href: string): "page" | true | undefined => {
    if (href === "/experience") return pathname === "/experience" ? "page" : undefined;
    if (href === "/#work") return activeSection === "work" ? true : undefined;
    if (href === "/#articles") return activeSection === "articles" ? true : undefined;
    if (href === "/#contact") return activeSection === "contact" ? true : undefined;
    if (href === "/") {
      return pathname === "/" &&
        activeSection !== "work" &&
        activeSection !== "articles" &&
        activeSection !== "contact"
        ? "page"
        : undefined;
    }
    return undefined;
  };

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/" && pathname === "/") {
      event.preventDefault();
      scrollToTop();
      return;
    }
    const hashAt = href.indexOf("#");
    if (hashAt === -1) return;
    if (pathname === "/") {
      event.preventDefault();
      scrollToSection(href.slice(hashAt + 1));
    }
  };

  return (
    <nav
      className={styles.navbar}
      aria-label="Primary"
      data-compact={compact ? "true" : "false"}
      data-motion={motionOff ? "off" : "on"}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.brand} aria-label="Shweta Sharma, home">
          Shweta <span className={styles.brandScript}>Sharma</span>
        </Link>

        <div className={styles.links}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={styles.navLink}
                aria-current={currentFor(link.href)}
                onClick={(event) => onNavigate(event, link.href)}
                data-track="nav_click"
                data-track-link-label={link.label}
                data-track-link-href={link.href}
                data-track-location="navbar"
              >
                <Icon className={styles.navIcon} size={20} strokeWidth={2.1} aria-hidden />
                <span className={styles.navLabel}>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <a
          href={cvHref}
          target="_blank"
          rel="noreferrer"
          className={styles.cvBtn}
          data-track-location="navbar"
        >
          <Download size={16} aria-hidden />
          <span className={styles.cvLabel}>Download CV (PDF)</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </nav>
  );
}
