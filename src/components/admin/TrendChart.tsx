"use client";
import { useId, useState } from "react";
import type { SeriesPoint } from "@/lib/admin/chart";
import styles from "./admin.module.css";
const metrics = [
  { key: "views", label: "Page views" },
  { key: "visits", label: "Visits with events" },
  { key: "resumeViews", label: "Résumé views" },
  { key: "resumeDownloads", label: "Download clicks" },
  { key: "resumeShares", label: "Résumé shares" },
] as const;
type Key = (typeof metrics)[number]["key"];
/** Extends the reference chart's bucket/max scaling with explicit zero buckets and selectable series. */
export default function TrendChart({ points, resumeOnly = false }: {
  points: SeriesPoint[];
  resumeOnly?: boolean;
}) {
  const availableMetrics = resumeOnly
    ? metrics.filter((m) => m.key.startsWith("resume"))
    : metrics;
  const [metric, setMetric] = useState<Key>(resumeOnly ? "resumeViews" : "views");
  const [style, setStyle] = useState<"line" | "bars">("line");
  const id = useId();
  const label = metrics.find((m) => m.key === metric)!.label;
  const max = Math.max(1, ...points.map((p) => p[metric]));
  const sum = points.reduce((n, p) => n + p[metric], 0);
  const coords = points.map((p, i) => [
    points.length < 2 ? 500 : (i / (points.length - 1)) * 1000,
    190 - (p[metric] / max) * 175,
  ]);
  const path = coords.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <>
      <div className={styles.chartControls}>
        <label>
          Metric
          <select
            aria-label="Chart metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value as Key)}
          >
            {availableMetrics.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <div>
          <button
            type="button"
            aria-pressed={style === "line"}
            onClick={() => setStyle("line")}
          >
            Line
          </button>
          <button
            type="button"
            aria-pressed={style === "bars"}
            onClick={() => setStyle("bars")}
          >
            Bars
          </button>
        </div>
        <strong>
          {sum.toLocaleString()} <span>{label.toLowerCase()}</span>
        </strong>
      </div>
      <svg
        className={styles.svgChart}
        viewBox="0 0 1000 210"
        role="img"
        aria-labelledby={id}
        preserveAspectRatio="none"
      >
        <title id={id}>
          {label}: {sum} across {points.length} UTC time buckets
        </title>
        {[15, 59, 103, 147, 190].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="1000"
            y2={y}
            className={styles.gridLine}
          />
        ))}
        {style === "line" && coords.length > 0 ? (
          <>
            <path
              d={`${path} L${coords.at(-1)![0]},190 L${coords[0][0]},190 Z`}
              className={styles.chartArea}
            />
            <path d={path} className={styles.chartLine} />
            {coords.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={points.length < 100 ? 3 : 1.5}
                className={styles.chartPoint}
              >
                <title>
                  {new Date(points[i].bucket).toLocaleString()}:{" "}
                  {points[i][metric]} {label.toLowerCase()}
                </title>
              </circle>
            ))}
          </>
        ) : (
          points.map((p, i) => (
            <rect
              key={p.bucket}
              x={(i / points.length) * 1000 + 1}
              y={190 - (p[metric] / max) * 175}
              width={Math.max(1, 1000 / points.length - 3)}
              height={(p[metric] / max) * 175}
              className={styles.chartPoint}
            >
              <title>
                {new Date(p.bucket).toLocaleString()}: {p[metric]}{" "}
                {label.toLowerCase()}
              </title>
            </rect>
          ))
        )}
      </svg>
      <div className={styles.chartLabels}>
        <span>
          {points[0] ? new Date(points[0].bucket).toLocaleDateString() : ""}
        </span>
        <span>
          {points.at(-1)
            ? new Date(points.at(-1)!.bucket).toLocaleDateString()
            : ""}
        </span>
      </div>
      {!sum && (
        <p className={styles.small}>
          No {label.toLowerCase()} recorded in this period.
        </p>
      )}
      <details className={styles.chartData}>
        <summary>View chart data</summary>
        <table>
          <caption>{label} by UTC time bucket</caption>
          <thead>
            <tr>
              <th scope="col">UTC time</th>
              <th scope="col">{label}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.bucket}>
                <th scope="row">{p.bucket.slice(0, 16).replace("T", " ")}</th>
                <td>{p[metric]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </>
  );
}
