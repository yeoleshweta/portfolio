"use client";

type SketchCircleProps = {
  width?: number;
  height?: number;
  className?: string;
};

/** Decorative sketch-style loop used to circle a number or bar. Always aria-hidden. */
export default function SketchCircle({
  width = 330,
  height = 120,
  className,
}: SketchCircleProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 330 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M30 18 C 120 -4, 290 6, 312 54 C 330 96, 210 116, 110 110 C 30 104, 4 78, 12 52 C 18 30, 50 20, 86 16"
        stroke="var(--color-accent-text)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
