"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CountUp.module.css";

type CountUpProps = {
  /** Final display string shown in HTML / for reduced motion. */
  display: string;
  /** Accessible label with the final value. */
  ariaLabel: string;
  /** Optional numeric animation. */
  from?: number;
  to?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  highlight?: boolean;
  className?: string;
};

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Counts a number into view once; final value always in the DOM for a11y. */
export default function CountUp({
  display,
  ariaLabel,
  from = 0,
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  highlight = false,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visual, setVisual] = useState(display);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (to === undefined || reduced) {
      setVisual(display);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let started = false;
    let raf = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const v = from + (to - from) * easeOut(t);
        setVisual(`${prefix}${v.toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setVisual(display);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [display, from, to, decimals, prefix, suffix, durationMs, reduced]);

  return (
    <span
      ref={ref}
      className={`${styles.value}${highlight ? ` ${styles.highlight}` : ""}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true" className={styles.visual}>
        {visual}
      </span>
      <span className={styles.srOnly}>{display}</span>
    </span>
  );
}
