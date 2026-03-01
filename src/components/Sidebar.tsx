"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Menu,
  X,
} from "lucide-react";
import Magnetic from "./Magnetic";
import styles from "./Sidebar.module.css";

const navLinks = [
  { label: "Intro", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className={styles.mobileBar}>
        <span className={styles.mobileName}>Shweta Sharma</span>
        <button
          className={styles.menuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>SS</span>
            </div>
            <div className={styles.statusDot} />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for Work
          </div>
          <h1 className={styles.name}>Shweta Sharma</h1>
          <p className={styles.role}>
            UX Researcher · AI &amp; ML Grad Student
          </p>
          <div className={styles.location}>
            <MapPin size={14} />
            Philadelphia, US
          </div>

          <div className={styles.socials}>
            <Magnetic>
              <a
                href="https://github.com/yeoleshweta"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/sharmashweta08"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="mailto:shwetayeolesharma@gmail.com"
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </Magnetic>
          </div>
        </div>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://www.dropbox.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cvButton}
        >
          <Download size={16} />
          Download CV
        </a>
      </motion.aside>
    </>
  );
}
