"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import styles from "./Navbar.module.css";
import { useMotionControl } from "@/components/MotionControl";
import { scrollToSection, scrollToTop } from "@/lib/scrollToSection";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#work" },
  { label: "Work Experience", href: "/experience" },
  { label: "Contact", href: "/#contact" },
];

const cvHref = "/assets/UX_Researcher_Resume.pdf";

export default function Navbar() {
  const pathname = usePathname();
  const { userPaused, togglePaused } = useMotionControl();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sections = ["work", "contact"]
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
    if (href === "/#contact") return activeSection === "contact" ? true : undefined;
    if (href === "/") {
      return pathname === "/" && activeSection !== "work" && activeSection !== "contact"
        ? "page"
        : undefined;
    }
    return undefined;
  };

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
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

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={styles.navbar} aria-label="Primary">
        <div className={styles.container}>
          <Link href="/" className={styles.brand} aria-label="Shweta Sharma, home">
            Shweta <span className={styles.brandScript}>Sharma</span>
          </Link>

          <div className={styles.links}>
            {navLinks.map((link) => (
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
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.pauseBtn}
              aria-pressed={userPaused}
              onClick={togglePaused}
            >
              {userPaused ? "Play animations" : "Pause animations"}
            </button>
            <a
              href={cvHref}
              target="_blank"
              rel="noreferrer"
              className={styles.cvBtn}
              data-track-location="navbar"
            >
              <Download size={16} aria-hidden />
              Download CV
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            className={styles.menuBtn}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            data-track="nav_click"
            data-track-link-label="mobile_menu_toggle"
            data-track-location="navbar_mobile"
          >
            {mobileOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={menuId}
            ref={mobileMenuRef}
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.mobileLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={styles.mobileLink}
                  aria-current={currentFor(link.href)}
                  onClick={(event) => onNavigate(event, link.href)}
                  data-track="nav_click"
                  data-track-link-label={link.label}
                  data-track-link-href={link.href}
                  data-track-location="navbar_mobile"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className={styles.mobilePauseBtn}
                aria-pressed={userPaused}
                onClick={togglePaused}
              >
                {userPaused ? "Play animations" : "Pause animations"}
              </button>
              <a
                href={cvHref}
                target="_blank"
                rel="noreferrer"
                className={styles.mobileCvBtn}
                onClick={() => setMobileOpen(false)}
                data-track-location="navbar_mobile"
              >
                Download CV
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
