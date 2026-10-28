"use client";

import { useEffect, useState } from "react";
import { ANALYTICS_ENABLED, CONSENT_EVENT, readConsent, setConsent } from "@/lib/analytics";
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
    if (!ANALYTICS_ENABLED) return;
    const timer = readConsent() === null ? window.setTimeout(() => setVisible(true), 1200) : null;
    const show = () => setVisible(true);
    const sync = () => setVisible(false);
    window.addEventListener("sw-open-privacy", show);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => { if(timer) clearTimeout(timer); window.removeEventListener("sw-open-privacy",show); window.removeEventListener(CONSENT_EVENT,sync); };
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
        With your permission, I measure visits, case-study reading, and résumé interactions. No ads or data sold.{" "}
        <span className={styles.muted}>
          Decline to stop analytics. Your choice is saved; you can change it below.
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
