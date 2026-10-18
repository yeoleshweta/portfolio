"use client";

type SketchUnderlineProps = {
  width?: number;
  height?: number;
  className?: string;
};

/** Decorative sketch-style underline/emphasis mark. Always aria-hidden. */
export default function SketchUnderline({
  width = 190,
  height = 16,
  className,
}: SketchUnderlineProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 190 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 10 C 48 3, 118 14, 187 6"
        stroke="var(--color-accent)"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}
