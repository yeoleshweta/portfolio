"use client";

export type DoodleAvatarTint = "lavender" | "yellow" | "green" | "peach";

type DoodleAvatarProps = {
  tint: DoodleAvatarTint;
  className?: string;
};

const TINTS: Record<DoodleAvatarTint, string> = {
  lavender: "#d9cfff",
  yellow: "#ffe6a3",
  green: "#c7ebd2",
  peach: "#ffd6bd",
};

/** Decorative sketch-style avatar (head + shoulders). Always aria-hidden. */
export default function DoodleAvatar({ tint, className }: DoodleAvatarProps) {
  return (
    <svg
      width={52}
      height={52}
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M8 48 C 10 34, 42 34, 44 48"
        stroke="var(--color-text)"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx={26}
        cy={19}
        r={10}
        fill={TINTS[tint]}
        stroke="var(--color-text)"
        strokeWidth={2.5}
      />
    </svg>
  );
}
