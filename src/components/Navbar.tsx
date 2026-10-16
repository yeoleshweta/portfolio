"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#work" },
  { label: "Work Experience", href: "/experience" },
  { label: "Contact", href: "/#contact" },
];

const cvHref = "/assets/UX_Researcher_Resume.pdf";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

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
                  onClick={() => setMobileOpen(false)}
                  data-track="nav_click"
                  data-track-link-label={link.label}
                  data-track-link-href={link.href}
                  data-track-location="navbar_mobile"
                >
                  {link.label}
                </Link>
              ))}
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
