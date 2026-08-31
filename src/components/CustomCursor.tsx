"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./CustomCursor.module.css";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='pointer']";

/** Follow factor — 1 = glued to pointer; lower = slightly smoother trail. */
const LERP = 0.55;

/**
 * Custom cursor portaled to <body> so transforms / Lenis / stacking contexts
 * never pin it under page chrome. Hover is read from the real hit-target on
 * every move so nested elements don't make it hitch or miss clicks.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const raf = useRef(0);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const el = dotRef.current;
    if (!el) return;

    document.documentElement.classList.add("has-custom-cursor");
    el.style.opacity = "1";

    const paint = () => {
      const tx = target.current.x;
      const ty = target.current.y;
      const cx = current.current.x + (tx - current.current.x) * LERP;
      const cy = current.current.y + (ty - current.current.y) * LERP;
      current.current.x = cx;
      current.current.y = cy;

      const scale = hovering.current ? 1.45 : 1;
      el.style.transform = `translate3d(${cx - 12}px, ${cy - 12}px, 0) scale(${scale})`;

      const dx = Math.abs(tx - cx);
      const dy = Math.abs(ty - cy);
      if (dx > 0.1 || dy > 0.1) {
        raf.current = requestAnimationFrame(paint);
      } else {
        raf.current = 0;
        current.current.x = tx;
        current.current.y = ty;
        el.style.transform = `translate3d(${tx - 12}px, ${ty - 12}px, 0) scale(${scale})`;
      }
    };

    const schedule = () => {
      if (!raf.current) raf.current = requestAnimationFrame(paint);
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const hit =
        e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      const next = Boolean(hit);
      if (next !== hovering.current) hovering.current = next;

      schedule();
    };

    const onLeaveWindow = (e: MouseEvent) => {
      // Only hide when the pointer truly leaves the viewport.
      if (e.relatedTarget === null) {
        el.style.opacity = "0";
      }
    };

    const onEnterWindow = () => {
      el.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseout", onLeaveWindow);
    document.documentElement.addEventListener("mouseover", onEnterWindow);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseout", onLeaveWindow);
      document.documentElement.removeEventListener("mouseover", onEnterWindow);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div ref={dotRef} className={styles.cursor} aria-hidden />,
    document.body,
  );
}
