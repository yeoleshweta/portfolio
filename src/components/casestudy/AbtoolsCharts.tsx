"use client";

import { useEffect, useRef } from "react";
import styles from "./AbtoolsCharts.module.css";

function useGrowOnView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.dataset.grown = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.grown = "true";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function BarRow({
  label,
  value,
  kind,
}: {
  label: string;
  value: number;
  kind: "prev" | "bench" | "current";
}) {
  const ref = useGrowOnView<HTMLDivElement>();
  return (
    <div className={styles.barRow} ref={ref}>
      <div className={styles.barLabel}>{label}</div>
      <div className={styles.barTrack}>
        <div
          className={`${styles.barFill} ${styles[kind]}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className={styles.barValue}>{value}</div>
    </div>
  );
}

export function DimensionRow({
  label,
  before,
  after,
  change,
  highlight,
  muted,
  delayCurrent = false,
}: {
  label: string;
  before: number;
  after: number;
  change: number;
  highlight?: boolean;
  muted?: boolean;
  delayCurrent?: boolean;
}) {
  const ref = useGrowOnView<HTMLDivElement>();
  const width = (v: number) => `${v * 0.88}%`;
  return (
    <div
      className={`${styles.dimRow}${highlight ? ` ${styles.dimHighlight}` : ""}`}
      ref={ref}
    >
      <div className={styles.dimLabel}>{label}</div>
      <div className={styles.dimBars}>
        <div className={styles.dimStack}>
          <div className={styles.dimTrack}>
            <div
              className={`${styles.dimFill} ${styles.prev}`}
              style={{ width: width(before) }}
            />
          </div>
          <span className={styles.dimNum}>{before}</span>
        </div>
        <div className={styles.dimStack}>
          <div className={styles.dimTrack}>
            <div
              className={`${styles.dimFill} ${styles.current}${delayCurrent ? ` ${styles.delayed}` : ""}`}
              style={{ width: width(after) }}
            />
          </div>
          <span className={styles.dimNum}>{after}</span>
        </div>
      </div>
      <div
        className={`${styles.dimChange}${highlight ? ` ${styles.changeHot}` : ""}${muted ? ` ${styles.changeMuted}` : ""}`}
      >
        +{change}
      </div>
    </div>
  );
}

export function ThemeStack({
  rows,
}: {
  rows: { label: string; count: number; color: string; text: string }[];
}) {
  const ref = useGrowOnView<HTMLDivElement>();
  const total = rows.reduce((s, r) => s + r.count, 0);
  return (
    <div ref={ref}>
      <div className={styles.stack} role="img" aria-label={`35 issues by theme: ${rows.map((r) => `${r.label} ${r.count}`).join(", ")}`}>
        {rows.map((r, i) => {
          const whiteText = i === 0 || i === rows.length - 1;
          return (
            <div
              key={r.label}
              className={styles.stackSeg}
              style={{
                flexGrow: r.count,
                flexBasis: 0,
                background: r.color,
                color: whiteText ? "#fff" : "#1c1c1c",
              }}
              title={`${r.label}: ${r.count}`}
            >
              {r.count}
            </div>
          );
        })}
      </div>
      <div className={styles.themeLegend}>
        {rows.map((r) => (
          <div key={r.label} className={styles.themeItem}>
            <div className={styles.themeRule} style={{ background: r.color }} />
            <h3 className={styles.themeTitle}>
              {r.label} · {r.count}
              <span className={styles.themePct}>
                {" "}
                ({Math.round((r.count / total) * 100)}%)
              </span>
            </h3>
            <p className={styles.themeText}>{r.text}</p>
          </div>
        ))}
      </div>
      {/* Visually hidden table for a11y */}
      <table className={styles.srTable}>
        <thead>
          <tr>
            <th scope="col">Theme</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td>{r.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
