"use client";
import { useEffect, useSyncExternalStore } from "react";
type Theme = "system" | "light" | "dark";
const CHANGE = "sw-admin-theme";
let fallback: Theme = "system";
let volatile = false;
function readTheme() {
  let choice: Theme = fallback;
  try {
    const value = localStorage.getItem("sw_admin_theme");
    choice =
      value === "light" || value === "dark"
        ? value
        : volatile
          ? fallback
          : "system";
  } catch {
    /* in-memory fallback */
  }
  const resolved =
    choice === "system"
      ? matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : choice;
  return `${choice}:${resolved}`;
}
function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE, callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE, callback);
  };
}
export default function ThemeControl() {
  const snapshot = useSyncExternalStore(
    subscribe,
    readTheme,
    () => "system:light",
  );
  const [theme, resolved] = snapshot.split(":");
  useEffect(() => {
    document
      .querySelector<HTMLElement>("[data-admin-root]")
      ?.setAttribute("data-theme", resolved);
  }, [resolved]);
  const change = (choice: Theme) => {
    fallback = choice;
    volatile = false;
    try {
      localStorage.setItem("sw_admin_theme", choice);
    } catch {
      volatile = true;
    }
    window.dispatchEvent(new Event(CHANGE));
  };
  return (
    <label>
      Appearance
      <select
        aria-label="Admin appearance"
        value={theme}
        onChange={(e) => change(e.target.value as Theme)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
