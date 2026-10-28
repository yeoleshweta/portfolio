"use client";
import { ANALYTICS_ENABLED } from "@/lib/analytics";
export default function PrivacyControl() {
  if (!ANALYTICS_ENABLED) return null;
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        padding: "24px",
        textAlign: "center",
        fontSize: 13,
      }}
    >
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("sw-open-privacy"))}
        style={{
          background: "none",
          border: 0,
          color: "var(--color-text-secondary)",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Privacy settings
      </button>
    </footer>
  );
}
