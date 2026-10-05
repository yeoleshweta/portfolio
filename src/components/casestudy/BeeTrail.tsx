"use client";

import type { CSSProperties } from "react";
import styles from "./BeeTrail.module.css";

type BeeTrailProps = {
  d: string;
  viewBox: string;
  duration?: number;
  arrow?: string;
  label?: string;
  onDark?: boolean;
  decorative?: boolean;
  className?: string;
};

/** Decorative bee that flies along a dotted purple trail. */
export default function BeeTrail({
  d,
  viewBox,
  duration = 9,
  arrow,
  label = "Decorative bee trail",
  onDark = false,
  decorative = false,
  className,
}: BeeTrailProps) {
  return (
    <svg
      viewBox={viewBox}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      className={`${styles.svg}${className ? ` ${className}` : ""}`}
    >
      <path className={styles.trail} d={d} />
      {arrow ? <path className={styles.arrow} d={arrow} /> : null}
      <g
        className={styles.bee}
        style={
          {
            offsetPath: `path('${d}')`,
            animationDuration: `${duration}s`,
          } as CSSProperties
        }
      >
        <ellipse
          className={styles.wing}
          cx="-2"
          cy="-9"
          rx="6"
          ry="9"
          fill="#D9CEFF"
          opacity="0.9"
        />
        <ellipse
          className={styles.wing}
          cx="5"
          cy="-9"
          rx="5"
          ry="8"
          fill={onDark ? "#EDE7FF" : "#C9B8FF"}
          opacity="0.9"
        />
        <ellipse cx="0" cy="0" rx="12" ry="8" fill="#F5B93A" />
        <path d="M-4 -7.5v15M2 -7.9v15.8" stroke="#1C1C1C" strokeWidth="3" />
        <circle cx="8.5" cy="-1.5" r="1.5" fill="#1C1C1C" />
        <path
          d="M-12 0h-5"
          stroke="#1C1C1C"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/** Paths from the ABTools case study spec. */
export const BEE_PATHS = {
  hero: {
    viewBox: "0 0 900 90",
    d: "M20 60 C160 0 260 110 400 50 S620 0 700 45 c30 20 60 -40 20 -40 c-40 0 -10 60 60 40 S860 40 880 30",
    duration: 9,
  },
  beforeAfter: {
    viewBox: "0 0 900 110",
    d: "M210 100 C260 10 400 0 450 45 c30 28 70 -30 30 -38 c-40 -6 -30 60 40 50 C600 55 660 40 690 96",
    arrow: "M679 83 L690 98 L703 85",
    duration: 7,
  },
  timeline: {
    viewBox: "0 0 900 44",
    d: "M10 30 Q225 -8 450 26 T890 22",
    duration: 8,
  },
  homeHero: {
    viewBox: "0 0 520 56",
    d: "M10 40 C80 8 140 52 220 28 S360 8 420 32 S500 20 510 18",
    duration: 10,
  },
  homeFeatured: {
    viewBox: "0 0 640 48",
    d: "M8 30 Q160 4 320 28 T632 22",
    duration: 9,
  },
  homeBridge: {
    viewBox: "0 0 720 52",
    d: "M20 36 C140 4 240 50 360 24 S560 4 700 28",
    duration: 11,
  },
} as const;
