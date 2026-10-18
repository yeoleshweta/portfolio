"use client";

type SketchArrowProps = {
  width?: number;
  height?: number;
  direction?: "right" | "down";
  tone?: "ink" | "accent";
  className?: string;
};

/** Decorative sketch-style connector arrow. Always aria-hidden. */
export default function SketchArrow({
  width = 96,
  height = 48,
  direction = "right",
  tone = "ink",
  className,
}: SketchArrowProps) {
  const stroke = tone === "accent" ? "var(--color-accent-text)" : "var(--color-text)";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={direction === "down" ? { transform: "rotate(90deg)" } : undefined}
    >
      <path
        d="M4 34 C 26 8, 58 6, 86 22"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74 12 L88 23 L72 30"
        stroke={stroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
