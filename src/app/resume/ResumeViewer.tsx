"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CONSENT_EVENT, EVENTS, readConsent, track } from "@/lib/analytics";
import { shareResume } from "@/lib/analytics/resume-share";
import styles from "./resume.module.css";
import { Suspense } from "react";
function Viewer() {
  const params = useSearchParams();
  const reported = useRef(false);
  const [shareStatus, setShareStatus] = useState("");
  const [sharing, setSharing] = useState(false);
  const raw = params.get("from");
  const location = ["navbar", "hero", "contact_section", "share"].includes(
    raw ?? "",
  )
    ? raw!
    : "direct";
  const report = useCallback(() => {
    if (readConsent() !== "granted") {
      reported.current = false;
      return;
    }
    if (!reported.current) {
      reported.current = true;
      track(EVENTS.RESUME_VIEWED, {
        location,
        resume_version: "ux-researcher",
      });
    }
  }, [location]);
  useEffect(() => {
    report();
    window.addEventListener(CONSENT_EVENT, report);
    return () => window.removeEventListener(CONSENT_EVENT, report);
  }, [report]);
  const onShare = async () => {
    setSharing(true);
    setShareStatus("");
    try {
      const result = await shareResume(
        `${window.location.origin}/resume?from=share`,
        {
          share: navigator.share?.bind(navigator),
          copy: navigator.clipboard?.writeText.bind(navigator.clipboard),
        },
      );
      if (result !== "cancelled") {
        track(EVENTS.RESUME_SHARED, {
          location,
          method: result === "shared" ? "native_share" : "copy_link",
          resume_version: "ux-researcher",
        });
        setShareStatus(
          result === "shared" ? "Résumé shared." : "Résumé link copied.",
        );
      }
    } catch {
      setShareStatus(
        "Unable to share. Copy the page address from your browser.",
      );
    } finally {
      setSharing(false);
    }
  };
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>SHWETA SHARMA</p>
          <h1>Résumé</h1>
          <p>UX research, behavioral analytics, and data science.</p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.share}
            onClick={onShare}
            disabled={sharing}
          >
            {sharing ? "Sharing…" : "Share résumé"}
          </button>
          <a
            className={styles.download}
            href="/api/resume/download"
            download="Shweta_Sharma_Resume.pdf"
            data-track="resume_downloaded"
            data-track-location={location}
            data-track-resume-version="ux-researcher"
          >
            Download PDF
          </a>
        </div>
      </div>
      <p role="status" className={styles.shareStatus}>
        {shareStatus}
      </p>
      <iframe
        className={styles.viewer}
        title="Shweta Sharma résumé PDF"
        src="/assets/UX_Researcher_Resume.pdf"
      />
      <p className={styles.fallback}>
        PDF not displaying?{" "}
        <a
          href="/assets/UX_Researcher_Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </section>
  );
}
export default function ResumeViewer() {
  return (
    <Suspense>
      <Viewer />
    </Suspense>
  );
}
