"use client";

import { useEffect, useState } from "react";
import { GA_ENABLED, readConsent, setConsent } from "@/lib/analytics";
import styles from "./ConsentBanner.module.css";

/**
 * Minimal cookie notice, shown once per visitor.
 *
 * Non-modal region (not a dialog) so focus order stays natural and Escape
 * is not required. Consent Mode v2 keeps analytics denied until a choice.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ENABLED) return;
    if (readConsent() === null) {
      const timer = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const choose = (choice: "granted" | "denied") => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <aside
      className={styles.banner}
      role="region"
      aria-label="Analytics cookie notice"
    >
      <p className={styles.text} id="consent-banner-text">
        I use Google Analytics to see which case studies people actually read.
        No ads, no profiles, no data sold.{" "}
        <span className={styles.muted}>
          Decline and nothing is stored on your device.
        </span>
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.decline}
          onClick={() => choose("denied")}
        >
          Decline
        </button>
        <button
          type="button"
          className={styles.accept}
          onClick={() => choose("granted")}
        >
          Allow
        </button>
      </div>
    </aside>
  );
}
