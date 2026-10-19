"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import type { PrototypeStep } from "@/content/fuelSurvey";
import styles from "./LaptopPrototype.module.css";

/* ───────────────────────── Geometry ─────────────────────────
   Every value is a percentage of the laptop screen (a 1440×900 frame),
   measured off the Figma exports. Copy and images live in content. */

type Box = [x: number, y: number, w: number, h: number];
type Overlay =
  | { kind: "template"; selected?: boolean }
  | { kind: "library"; selected?: boolean }
  | { kind: "type"; box: Box; text: string }
  | { kind: "check"; x: number; y: number }
  | { kind: "menu"; x: number; y: number; w: number; items: string[]; on?: number[]; hover?: number; search?: boolean }
  | { kind: "chip"; x: number; y: number; text: string }
  | { kind: "tip"; x: number; y: number; text: string }
  | { kind: "selbar"; box: Box }
  | { kind: "toast"; text: string };
type Click = { x: number; y: number; overlays?: Overlay[]; highlight?: Box };
type StepGeometry = { duration: number; clicks: Click[] };

const GEOMETRY: Record<string, StepGeometry> = {
  dashboard: { duration: 5, clicks: [
    { x: 77, y: 13, highlight: [70.6, 10.6, 12.6, 5.2], overlays: [{ kind: "template" }] },
    { x: 42, y: 32.8, overlays: [{ kind: "template", selected: true }] },
  ] },
  details: { duration: 6, clicks: [
    { x: 45, y: 28.8, overlays: [{ kind: "type", box: [29.6, 27.3, 20, 3], text: "Channel IT feedback · FY24" }] },
    { x: 54.6, y: 55.6, overlays: [{ kind: "check", x: 54.6, y: 55.6 }] },
    { x: 50, y: 79.4, highlight: [29, 77.6, 45, 3.6], overlays: [{ kind: "menu", x: 29.2, y: 82, w: 44, items: ["English", "Español", "Português", "Deutsch"], on: [0, 1] }] },
  ] },
  welcome: { duration: 5, clicks: [
    { x: 86, y: 40.5, highlight: [64.5, 37.8, 23.5, 50], overlays: [{ kind: "library" }] },
    { x: 64, y: 43.5, overlays: [{ kind: "library", selected: true }] },
  ] },
  "welcome-new": { duration: 3.6, clicks: [{ x: 96, y: 20, highlight: [93.6, 17.6, 3.6, 4.6] }] },
  products: { duration: 6.5, clicks: [
    { x: 24, y: 42.2, overlays: [{ kind: "check", x: 24, y: 42.2 }] },
    { x: 52.1, y: 42.2, overlays: [{ kind: "check", x: 52.1, y: 42.2 }] },
    { x: 75.3, y: 42.2, overlays: [{ kind: "check", x: 75.3, y: 42.2 }, { kind: "chip", x: 55, y: 24.6, text: "3 of 3 selected" }] },
    { x: 92.4, y: 84.4, highlight: [87.8, 82.3, 9.4, 4.4] },
  ] },
  questions: { duration: 3.6, clicks: [{ x: 92.4, y: 33.8, highlight: [21, 30.6, 73.5, 6.6] }] },
  expanded: { duration: 4.5, clicks: [
    { x: 31.2, y: 89.3, highlight: [27.6, 87.4, 8.4, 3.8], overlays: [{ kind: "menu", x: 27.5, y: 74.5, w: 12, items: ["Page 1", "Page 2", "Page 3"], on: [0] }] },
  ] },
  custom: { duration: 4.6, clicks: [
    { x: 37.2, y: 45.8, highlight: [63.6, 44, 6.4, 3.8], overlays: [{ kind: "tip", x: 52, y: 37.4, text: "Edited, so now Custom" }] },
  ] },
  type: { duration: 5.2, clicks: [
    { x: 76.4, y: 65.8, overlays: [{ kind: "menu", x: 70.5, y: 68.2, w: 14, items: ["Choice", "Text", "Rating", "Ranking", "Likert", "NPS", "Date"], hover: 4 }] },
    { x: 76, y: 84.4, overlays: [{ kind: "selbar", box: [70.5, 82.6, 14, 3.5] }] },
  ] },
  loop: { duration: 4, clicks: [{ x: 6.4, y: 42.7, highlight: [21.5, 28.4, 69.6, 3.8] }] },
  "open-text": { duration: 4, clicks: [{ x: 95.6, y: 96.6, highlight: [28, 51.8, 61.2, 3.8] }] },
  "user-info": { duration: 5, clicks: [
    { x: 33.3, y: 54.4, overlays: [{ kind: "menu", x: 28, y: 57, w: 17, items: ["Search country…", "United States", "Brazil", "Germany", "India"], hover: 3, search: true }] },
    { x: 34, y: 69.4, overlays: [{ kind: "selbar", box: [28, 67.7, 17, 3.5] }] },
  ] },
  thanks: { duration: 4.6, clicks: [
    { x: 93.5, y: 93.3, highlight: [90.4, 91, 6.4, 4.6], overlays: [{ kind: "toast", text: "Survey saved · ready to preview" }] },
  ] },
};

const SLOTS = ["l1", "r1", "l2", "r2", "l3", "r3"] as const;
const ROTATE = [-3, 2.5, 1.5, -2, -1, 3];
const STICKY_LIFE = 9.5;

/* ───────────────────────── Timeline maths ───────────────────────── */

type Timed = { start: number; end: number; times: number[]; geo: StepGeometry };

function buildTimeline(steps: PrototypeStep[]) {
  let t = 0;
  const timed: Timed[] = steps.map((s) => {
    const geo = GEOMETRY[s.id] ?? { duration: 4, clicks: [] };
    const start = t;
    const end = t + geo.duration;
    const n = geo.clicks.length;
    const times =
      n <= 1
        ? [start + 1.3]
        : geo.clicks.map((_, k) => start + 1.1 + ((geo.duration - 2.2) * k) / (n - 1));
    t = end;
    return { start, end, times, geo };
  });
  return { timed, total: t };
}

const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const fade = (t: number, a: number, b: number, f = 0.25) =>
  clamp01(Math.min((t - a) / f + 1, (b - t) / f + 1));

function pct(v: number) {
  return `${v}%`;
}
function boxStyle([x, y, w, h]: Box): CSSProperties {
  return { left: pct(x), top: pct(y), width: pct(w), height: pct(h) };
}

/* ───────────────────────── Overlays ───────────────────────── */

const Tick = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2.5 6.2l2.2 2.2 4.8-4.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TEMPLATE_ROWS = [
  { title: "USAT Standard · Product", sub: "Standard questions, comparable results", y: 29.5 },
  { title: "USAT Standard · Services", sub: "For service teams", y: 37 },
  { title: "Custom", sub: "Start from your own questions", y: 44.5 },
];

function renderOverlay(o: Overlay, key: string, thumbs: { current: string; next: string }): ReactNode {
  switch (o.kind) {
    case "template":
      if (o.selected) {
        const r = TEMPLATE_ROWS[0];
        return (
          <div key={key} className={`${styles.ovRow} ${styles.ovRowSel}`} style={boxStyle([32.5, r.y, 35, 6.5])}>
            <span className={`${styles.ovRadio} ${styles.ovRadioOn}`} />
            <span><b>{r.title}</b><i>{r.sub}</i></span>
          </div>
        );
      }
      return (
        <Fragment key={key}>
          <div className={styles.ovDim} />
          <div className={styles.ovCard} style={boxStyle([31, 20, 38, 34])}>
            <p className={styles.ovH}>Create new survey</p>
            <p className={styles.ovSub}>Choose a template to start from</p>
          </div>
          {TEMPLATE_ROWS.map((r) => (
            <div key={r.title} className={styles.ovRow} style={boxStyle([32.5, r.y, 35, 6.5])}>
              <span className={styles.ovRadio} />
              <span><b>{r.title}</b><i>{r.sub}</i></span>
            </div>
          ))}
        </Fragment>
      );
    case "library":
      if (o.selected) {
        return (
          <div key={key} className={styles.ovThumbSel} style={boxStyle([58.3, 31, 11.5, 25])}>
            <span className={styles.ovTick}><Tick /></span>
          </div>
        );
      }
      return (
        <Fragment key={key}>
          <div className={styles.ovCard} style={boxStyle([44, 21, 40, 38])}>
            <p className={styles.ovH}>Approved images</p>
            <p className={styles.ovSub}>John Deere photo library</p>
          </div>
          <div className={styles.ovThumb} style={{ ...boxStyle([46, 31, 11.5, 25]), backgroundImage: `url(${thumbs.current})` }} />
          <div className={styles.ovThumb} style={{ ...boxStyle([58.3, 31, 11.5, 25]), backgroundImage: `url(${thumbs.next})` }} />
          <div className={`${styles.ovThumb} ${styles.ovThumbMore}`} style={boxStyle([70.6, 31, 11.5, 25])}>More</div>
        </Fragment>
      );
    case "type":
      return <div key={key} className={styles.ovType} style={boxStyle(o.box)}>{o.text}</div>;
    case "check":
      return <div key={key} className={styles.ovCheck} style={{ left: pct(o.x), top: pct(o.y) }}><Tick /></div>;
    case "menu":
      return (
        <div key={key} className={styles.ovMenu} style={{ left: pct(o.x), top: pct(o.y), width: pct(o.w) }}>
          {o.items.map((item, i) => {
            const on = o.on?.includes(i);
            const cls = [styles.ovItem, on && styles.ovItemOn, o.hover === i && styles.ovItemHover, o.search && i === 0 && styles.ovItemSearch]
              .filter(Boolean)
              .join(" ");
            return (
              <div key={item} className={cls}>
                {o.on ? <span className={`${styles.ovBox}${on ? ` ${styles.ovBoxOn}` : ""}`}>{on ? <Tick /> : null}</span> : null}
                {item}
              </div>
            );
          })}
        </div>
      );
    case "chip":
      return <div key={key} className={styles.ovChip} style={{ left: pct(o.x), top: pct(o.y) }}>{o.text}</div>;
    case "tip":
      return <div key={key} className={styles.ovTip} style={{ left: pct(o.x), top: pct(o.y) }}>{o.text}</div>;
    case "selbar":
      return <div key={key} className={styles.ovSelbar} style={boxStyle(o.box)} />;
    case "toast":
      return (
        <div key={key} className={styles.ovToast}>
          <span className={styles.ovToastTick}><Tick /></span>
          {o.text}
        </div>
      );
  }
}

/* ───────────────────────── Component ───────────────────────── */

type Props = {
  steps: PrototypeStep[];
  ariaLabel: string;
  note?: string;
};

export default function LaptopPrototype({ steps, ariaLabel, note }: Props) {
  const { timed, total } = useMemo(() => buildTimeline(steps), [steps]);
  const [t, setT] = useState(0);
  const reduceMotion = useReducedMotion();
  // null = not chosen yet: autoplay unless the visitor prefers reduced motion.
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const playing = userPlaying ?? !reduceMotion;
  const [visible, setVisible] = useState(false);
  const [announce, setAnnounce] = useState("");
  const rootRef = useRef<HTMLElement>(null);
  const last = useRef<number | null>(null);

  // Only run while on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) {
      last.current = null;
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (last.current !== null) {
        const dt = (now - last.current) / 1000;
        setT((prev) => (prev + dt) % total);
      }
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, visible, total]);

  const stepIndex = Math.max(0, timed.findIndex((s) => t >= s.start && t < s.end));
  const current = timed[stepIndex];

  const goTo = useCallback(
    (i: number) => {
      const idx = (i + timed.length) % timed.length;
      setUserPlaying(false);
      // Land just after the last click so the step's end state is visible.
      const s = timed[idx];
      setT(Math.min(s.end - 0.3, s.times[s.times.length - 1] + 0.6));
      setAnnounce(`Step ${idx + 1} of ${timed.length}: ${steps[idx].label}. ${steps[idx].decision}`);
    },
    [timed, steps],
  );

  // Cursor: travel to each click target, press on arrival.
  const clicks = timed.flatMap((s) => s.geo.clicks.map((c, k) => ({ ...c, at: s.times[k] })));
  let cursor = { x: clicks[clicks.length - 1].x, y: clicks[clicks.length - 1].y, press: 1 };
  for (let k = 0; k < clicks.length; k++) {
    const c = clicks[k];
    const prev = clicks[(k - 1 + clicks.length) % clicks.length];
    if (t >= c.at - 0.9) {
      const p = ease(clamp01((t - (c.at - 0.9)) / 0.78));
      cursor = { x: prev.x + (c.x - prev.x) * p, y: prev.y + (c.y - prev.y) * p, press: 1 };
      const d = t - c.at;
      if (d > -0.05 && d < 0.22) cursor.press = d < 0.05 ? 0.78 : 0.78 + (0.22 * (d - 0.05)) / 0.17;
    }
  }

  const thumbs = { current: steps[2]?.src ?? "", next: steps[3]?.src ?? "" };

  return (
    <figure ref={rootRef} className={styles.root} aria-label={ariaLabel}>
      {note ? (
        <p className={styles.note} aria-hidden="true">
          {note}
          <svg viewBox="0 0 54 40"><path d="M4 6 C 20 4, 40 12, 42 34" /><path d="M34 27 L 42 35 L 49 26" /></svg>
        </p>
      ) : null}

      <div className={styles.stage}>
        {(["l", "r"] as const).map((side) => (
          <div key={side} className={`${styles.col} ${side === "l" ? styles.colLeft : styles.colRight}`} aria-hidden="true">
            {timed.map((s, i) => {
              const slot = SLOTS[i % SLOTS.length];
              if (slot[0] !== side) return null;
              const a = s.start + 0.9;
              const b = a + STICKY_LIFE;
              const local = t < a - 0.5 && b > total ? t + total : t;
              const o = fade(local, a, b, 0.35);
              if (o <= 0) return null;
              const pop = clamp01((local - a) / 0.35);
              return (
                <div
                  key={steps[i].id}
                  className={`${styles.sticky} ${styles[slot]}`}
                  style={{ opacity: o, transform: `translateY(${(1 - pop) * 14}px) rotate(${ROTATE[i % ROTATE.length]}deg) scale(${0.86 + 0.14 * pop})` }}
                >
                  <span className={styles.stickyNum}>{String(i + 1).padStart(2, "0")}</span>
                  {steps[i].decision}
                  <svg className={styles.stickyArrow} viewBox="0 0 64 34">
                    {side === "l" ? (
                      <><path d="M3 24 C 18 4, 40 30, 58 12" /><path d="M49 9 L 59 11 L 55 21" /></>
                    ) : (
                      <><path d="M61 24 C 46 4, 24 30, 6 12" /><path d="M15 9 L 5 11 L 9 21" /></>
                    )}
                  </svg>
                </div>
              );
            })}
          </div>
        ))}

        <div className={styles.laptop}>
          <div className={styles.lid}>
            <span className={styles.cam} />
            <div className={styles.screen} role="img" aria-label={`${steps[stepIndex].label}. ${steps[stepIndex].alt}.`}>
              {steps.map((s, i) => {
                const span = timed[i];
                const o = i === 0 ? Math.max(fade(t, span.start, span.end, 0.3), clamp01((t - (total - 0.3)) / 0.3)) : fade(t, span.start, span.end, 0.3);
                if (o <= 0 && Math.abs(i - stepIndex) > 1) return null;
                return (
                  <Image
                    key={s.id}
                    src={s.src}
                    alt=""
                    fill
                    sizes="(max-width: 1100px) 92vw, 860px"
                    className={styles.frame}
                    style={{ opacity: o }}
                    priority={i === 0}
                  />
                );
              })}

              {current.geo.clicks.map((c, k) => {
                const at = current.times[k];
                const out: ReactNode[] = [];
                if (c.highlight) {
                  const o = fade(t, at - 0.35, Math.min(current.end - 0.2, at + 1.6), 0.2);
                  if (o > 0) out.push(<div key={`h${k}`} className={styles.highlight} style={{ ...boxStyle(c.highlight), opacity: o }} />);
                }
                const rp = (t - at) / 0.6;
                if (rp >= 0 && rp <= 1) {
                  out.push(
                    <span key={`r${k}`} className={styles.ring} style={{ left: pct(c.x), top: pct(c.y), opacity: 1 - rp, transform: `translate(-50%, -50%) scale(${0.4 + 1.3 * rp})` }} />,
                  );
                }
                if (c.overlays && t >= at + 0.08) {
                  const o = fade(t, at + 0.32, current.end - 0.15, 0.24);
                  out.push(
                    <div key={`o${k}`} className={styles.overlay} style={{ opacity: o }} aria-hidden="true">
                      {c.overlays.map((ov, j) => renderOverlay(ov, `${k}-${j}`, thumbs))}
                    </div>,
                  );
                }
                return out;
              })}

              <div className={styles.cursor} style={{ left: pct(cursor.x), top: pct(cursor.y) }} aria-hidden="true">
                <svg viewBox="0 0 24 24" style={{ transform: `scale(${cursor.press})` }}>
                  <path d="M4.5 2.5 L19 13.2 L12.2 14.1 L9 21 Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.deck} />
        </div>

        <div className={styles.under}>
          <p className={styles.label} aria-hidden="true">
            <b>{String(stepIndex + 1).padStart(2, "0")}</b> / {steps.length} · {steps[stepIndex].label}
          </p>
          {/* Shown under the laptop when the side stickies are hidden (narrow screens) */}
          <p className={styles.inlineDecision} aria-hidden="true">{steps[stepIndex].decision}</p>
          <div className={styles.bar} aria-hidden="true">
            <i style={{ transform: `scaleX(${t / total})` }} />
            {timed.map((s) => (
              <span key={s.start} className={styles.barTick} style={{ left: pct((s.start / total) * 100) }} />
            ))}
          </div>
          <div className={styles.controls}>
            <button type="button" className={styles.btn} onClick={() => goTo(stepIndex - 1)} aria-label="Previous step">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnMain}`}
              onClick={() => setUserPlaying(!playing)}
              aria-label={playing ? "Pause prototype" : "Play prototype"}
            >
              {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
              <span>{playing ? "Pause" : "Play"}</span>
            </button>
            <button type="button" className={styles.btn} onClick={() => goTo(stepIndex + 1)} aria-label="Next step">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
          <p className={styles.srOnly} aria-live="polite">{announce}</p>
        </div>
      </div>
    </figure>
  );
}
