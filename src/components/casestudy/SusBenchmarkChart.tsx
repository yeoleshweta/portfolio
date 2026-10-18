"use client";

type SusBenchmarkChartProps = {
  previous: { label: string; date: string; value: number };
  current: { label: string; date: string; value: number };
  benchmarks: { label: string; value: number }[];
  ariaLabel: string;
};

// Matches the design canvas's SUS chart: 0–100 scale, x = 200 + value*5.6.
const X0 = 200;
const SCALE = 5.6;
const CHART_TOP = 56;
const CHART_BOTTOM = 176;
const TICKS = [0, 20, 40, 60, 80, 100];

function x(value: number) {
  return X0 + value * SCALE;
}

/** SUS score vs. benchmarks (§3.8, Fig. 7). Bespoke SVG matching the design canvas. */
export default function SusBenchmarkChart({
  previous,
  current,
  benchmarks,
  ariaLabel,
}: SusBenchmarkChartProps) {
  const rows = [
    { ...previous, y: 72, fill: "var(--color-before)" },
    { ...current, y: 124, fill: "var(--color-accent-text)" },
  ];

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 800 210"
      style={{ width: "100%", minWidth: 480, height: "auto" }}
    >
      <g stroke="var(--color-border)" strokeWidth={1}>
        {TICKS.slice(1).map((t) => (
          <line key={t} x1={x(t)} y1={CHART_TOP} x2={x(t)} y2={CHART_BOTTOM} />
        ))}
      </g>

      {rows.map((r) => (
        <g key={r.label}>
          <rect x={X0} y={r.y} width={Math.max(0, x(r.value) - X0)} height={36} rx={6} fill={r.fill} />
          <text
            x={x(r.value) - 12}
            y={r.y + 23}
            textAnchor="end"
            fontSize={16}
            fontWeight={700}
            fill="#fff"
          >
            {r.value.toFixed(1)}
          </text>
          <text x={X0 - 12} y={r.y + 16} textAnchor="end" fontSize={15} fontWeight={600} fill="var(--color-text)">
            {r.label}
          </text>
          <text x={X0 - 12} y={r.y + 32} textAnchor="end" fontSize={13} fill="var(--color-text-secondary)">
            {r.date}
          </text>
        </g>
      ))}

      <g stroke="var(--color-text)" strokeWidth={1.5} strokeDasharray="4 4">
        {benchmarks.map((b) => (
          <line key={b.label} x1={x(b.value)} y1={54} x2={x(b.value)} y2={172} />
        ))}
      </g>
      {/* First benchmark's label sits left/below its line; the other two are
          close together in value, so they stack to the right instead. */}
      <text x={x(benchmarks[0].value) - 4} y={44} textAnchor="end" fontSize={13} fill="var(--color-text)">
        {benchmarks[0].label} {benchmarks[0].value}
      </text>
      {benchmarks.slice(1).map((b, i) => (
        <text key={b.label} x={x(benchmarks[1].value) + 6} y={28 + i * 18} fontSize={13} fill="var(--color-text)">
          {b.label} {b.value}
        </text>
      ))}

      <g fontSize={13} fill="var(--color-text-secondary)" textAnchor="middle">
        {TICKS.map((t) => (
          <text key={t} x={x(t)} y={198}>
            {t}
          </text>
        ))}
      </g>
    </svg>
  );
}
