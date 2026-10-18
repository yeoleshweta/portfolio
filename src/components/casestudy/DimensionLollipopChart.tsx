"use client";

type DimensionRow = {
  label: string;
  before: number;
  after: number;
  change: number;
};

type DimensionLollipopChartProps = {
  rows: DimensionRow[];
  ariaLabel: string;
};

// Matches the design canvas's dimension chart: 50–100% scale, x = 200 + (v-50)*10.4.
const X0 = 200;
const SCALE = 10.4;
const Y0 = 40;
const ROW_GAP = 52;
const TICKS = [50, 60, 70, 80, 90, 100];

function x(value: number) {
  return X0 + (value - 50) * SCALE;
}

/** % favourable by dimension, before → after (§3.8, Fig. 8). Hollow = before, filled = after. */
export default function DimensionLollipopChart({ rows, ariaLabel }: DimensionLollipopChartProps) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 820 372"
      style={{ width: "100%", minWidth: 480, height: "auto" }}
    >
      <g stroke="var(--color-border)" strokeWidth={1}>
        {TICKS.map((t) => (
          <line key={t} x1={x(t)} y1={20} x2={x(t)} y2={324} />
        ))}
      </g>

      <g fontSize={15} fill="var(--color-text)" textAnchor="end" fontWeight={600}>
        {rows.map((r, i) => (
          <text key={r.label} x={188} y={Y0 + i * ROW_GAP + 5}>
            {r.label}
          </text>
        ))}
      </g>

      <g stroke="var(--color-accent-text)" strokeWidth={3}>
        {rows.map((r, i) => (
          <line
            key={r.label}
            x1={x(r.before)}
            y1={Y0 + i * ROW_GAP}
            x2={x(r.after)}
            y2={Y0 + i * ROW_GAP}
          />
        ))}
      </g>

      <g fill="#FFFFFF" stroke="var(--color-before)" strokeWidth={3}>
        {rows.map((r, i) => (
          <circle key={r.label} cx={x(r.before)} cy={Y0 + i * ROW_GAP} r={8} />
        ))}
      </g>
      <g fill="var(--color-accent-text)">
        {rows.map((r, i) => (
          <circle key={r.label} cx={x(r.after)} cy={Y0 + i * ROW_GAP} r={9} />
        ))}
      </g>

      <g fontSize={14} fill="var(--color-text-secondary)" textAnchor="end">
        {rows.map((r, i) => (
          <text key={r.label} x={x(r.before) - 14} y={Y0 + i * ROW_GAP + 5}>
            {r.before.toFixed(1)}
          </text>
        ))}
      </g>
      <g fontSize={14} fill="var(--color-text)" fontWeight={700}>
        {rows.map((r, i) => (
          <text key={r.label} x={x(r.after) + 14} y={Y0 + i * ROW_GAP + 5}>
            {r.after.toFixed(1)}
          </text>
        ))}
      </g>
      <g fontSize={14} fill="var(--color-accent-text)" fontWeight={700} textAnchor="end">
        {rows.map((r, i) => (
          <text key={r.label} x={812} y={Y0 + i * ROW_GAP + 5}>
            {r.change > 0 ? "+" : ""}
            {r.change.toFixed(1)}
          </text>
        ))}
      </g>

      <g fontSize={13} fill="var(--color-text-secondary)" textAnchor="middle">
        {TICKS.map((t) => (
          <text key={t} x={x(t)} y={346}>
            {t}%
          </text>
        ))}
      </g>

      <g fontSize={13} fill="var(--color-text-secondary)">
        <circle cx={210} cy={364} r={6} fill="#FFFFFF" stroke="var(--color-before)" strokeWidth={2.5} />
        <text x={222} y={368}>
          Before (hollow)
        </text>
        <circle cx={350} cy={364} r={6} fill="var(--color-accent-text)" />
        <text x={362} y={368}>
          After (filled)
        </text>
      </g>
    </svg>
  );
}
