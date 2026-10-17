"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./covers.module.css";

type CoverFrameProps = {
  label: string;
  motionOff?: boolean;
  children: ReactNode;
};

export function CoverFrame({ label, motionOff, children }: CoverFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const resize = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      frame.style.setProperty("--scale", String(width / 1440));
    });
    resize.observe(frame);

    const io = new IntersectionObserver(
      ([entry]) => {
        frame.classList.toggle(styles.isPaused, !entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    io.observe(frame);

    return () => {
      resize.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      role="img"
      aria-label={label}
      data-motion={motionOff ? "off" : "on"}
    >
      <div className={styles.stage} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
