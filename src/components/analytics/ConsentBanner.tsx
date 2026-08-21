"use client";

import { useEffect, useState } from "react";
import { GA_ENABLED, readConsent, setConsent } from "@/lib/analytics";
import styles from "./ConsentBanner.module.css";

/**
 * Minimal cookie notice, shown once per visitor.
 *
 * Until a choice is made, Consent Mode v2 keeps `analytics_storage` denied,
 * so GA4 receives cookieless pings only — no identifiers, nothing stored on
 * the device. Accepting upgrades the session to normal (cookie-based)
 * measurement; declining keeps it cookieless forever.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ENABLED) return;
    if (readConsent() === null) {
      // Let the hero animation land first.
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
    <div className={styles.banner} role="dialog" aria-label="Cookie notice">
      <p className={styles.text}>
        I use Google Analytics to see which case studies people actually read.
        No ads, no profiles, no data sold.{" "}
        <span className={styles.muted}>Decline and nothing is stored on your device.</span>
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
    </div>
  );
}
