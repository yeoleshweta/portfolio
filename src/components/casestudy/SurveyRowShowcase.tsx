"use client";

/**
 * SurveyRowShowcase — a coded mock of the Deere Survey results row that steps
 * through collapsed → details → charts → comments, with sticky notes per step.
 *
 * The mock is a picture, not a control: it uses text, description lists and
 * labelled SVG charts, with no fake buttons or inputs. Stepping, autoplay and
 * the notes come from PhasedShowcase.
 */

import PhasedShowcase, { type ShowcasePhase } from "@/components/casestudy/PhasedShowcase";
import styles from "./SurveyRowShowcase.module.css";

type Stat = { label: string; value: string };

export type SurveyRowData = {
  name: string;
  audience: string;
  closes: string;
  stats: Stat[];
  others: string[];
  details: Stat[];
  byProduct: { label: string; value: number }[];
  months: string[];
  received: number[];
  abandons: number[];
  comment: Stat[];
};

function StatList({ items, className }: { items: Stat[]; className: string }) {
  return (
    <dl className={className}>
      {items.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BarChart({ data }: { data: SurveyRowData["byProduct"] }) {
  const max = Math.max(...data.map((d) => d.value));
  const w = 260;
  const h = 140;
  const slot = w / data.length;
  const summary = data.map((d) => `${d.label} ${d.value}`).join(", ");
  return (
    <svg viewBox={`0 0 ${w} ${h + 18}`} className={styles.chart} role="img" aria-label={`Responses by product: ${summary}.`}>
      <line x1="0" y1={h} x2={w} y2={h} className={styles.axis} />
      {data.map((d, i) => {
        const bh = (d.value / max) * (h - 18);
        const x = i * slot + slot * 0.2;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={h - bh}
              width={slot * 0.6}
              height={bh}
              rx="2"
              className={styles.bar}
              style={{ animationDelay: `${i * 70}ms` }}
            />
            <text x={x + slot * 0.3} y={h - bh - 4} className={styles.barValue}>{d.value}</text>
            <text x={x + slot * 0.3} y={h + 13} className={styles.tick}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ months, received, abandons }: Pick<SurveyRowData, "months" | "received" | "abandons">) {
  const w = 260;
  const h = 140;
  const max = Math.max(...received) * 1.15;
  const x = (i: number) => (i / (months.length - 1)) * (w - 8) + 4;
  const y = (v: number) => h - (v / max) * h;
  const path = (values: number[]) => values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const label = `Responses and abandons per month, ${months[0]} to ${months[months.length - 1]}. Responses ${received.join(", ")}. Abandons ${abandons.join(", ")}.`;
  return (
    <svg viewBox={`0 0 ${w} ${h + 18}`} className={styles.chart} role="img" aria-label={label}>
      <line x1="0" y1={h} x2={w} y2={h} className={styles.axis} />
      <path d={path(received)} pathLength={1} className={`${styles.line} ${styles.lineReceived}`} />
      <path d={path(abandons)} pathLength={1} className={`${styles.line} ${styles.lineAbandons}`} />
      {months.map((m, i) =>
        i % 2 === 0 ? <text key={m} x={x(i)} y={h + 13} className={styles.tick}>{m}</text> : null,
      )}
    </svg>
  );
}

function Panel({ phase, survey }: { phase: string; survey: SurveyRowData }) {
  if (phase === "details") {
    return (
      <div className={styles.details}>
        <div className={styles.owners}>
          <span className={styles.panelLabel}>Owners</span>
          <span className={styles.redacted} role="img" aria-label="Two owners, names withheld">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </span>
        </div>
        <StatList items={survey.details} className={styles.detailList} />
        <div className={styles.links}>
          <span className={styles.panelLabel}>Survey links</span>
          <span className={styles.linkText}>Developer · test build</span>
          <span className={styles.linkText}>Production · live survey</span>
        </div>
      </div>
    );
  }
  if (phase === "charts") {
    return (
      <div className={styles.charts}>
        <div>
          <span className={styles.panelLabel}>Responses by digital product</span>
          <BarChart data={survey.byProduct} />
        </div>
        <div>
          <span className={styles.panelLabel}>Surveys received and abandoned</span>
          <LineChart months={survey.months} received={survey.received} abandons={survey.abandons} />
          <div className={styles.legend} aria-hidden="true">
            <span className={styles.keyReceived} /> Received
            <span className={styles.keyAbandons} /> Abandoned
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.comments}>
      {[0, 1].map((i) => (
        <div key={i} className={styles.comment} style={{ animationDelay: `${i * 120}ms` }}>
          <StatList items={survey.comment} className={styles.commentMeta} />
          <span className={styles.commentText} role="img" aria-label="Comment text, prototype placeholder">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </span>
        </div>
      ))}
    </div>
  );
}

function SurveyRowMock({ phase, survey }: { phase: string; survey: SurveyRowData }) {
  const open = phase !== "collapsed";
  return (
    <>
      <div className={`${styles.row} ${open ? styles.rowOpen : ""}`}>
        <div className={styles.rowName}>
          <span className={styles.surveyName}>{survey.name}</span>
          <span className={styles.surveyMeta}>{survey.audience} · closes {survey.closes}</span>
        </div>
        <StatList items={survey.stats} className={styles.rowStats} />
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Active
        </span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} aria-hidden="true">›</span>
      </div>

      {open ? (
        <div key={phase} className={styles.panel}>
          <Panel phase={phase} survey={survey} />
        </div>
      ) : (
        survey.others.map((name) => (
          <div key={name} className={`${styles.row} ${styles.rowMuted}`} aria-hidden="true">
            <div className={styles.rowName}>
              <span className={styles.surveyName}>{name}</span>
              <span className={styles.surveyMeta}>{survey.audience}</span>
            </div>
            <span className={styles.skeleton} />
            <span className={styles.chevron}>›</span>
          </div>
        ))
      )}
    </>
  );
}

export default function SurveyRowShowcase({
  survey,
  phases,
}: {
  survey: SurveyRowData;
  phases: ShowcasePhase[];
}) {
  return (
    <PhasedShowcase phases={phases} label="Survey row states">
      {(phase) => <SurveyRowMock phase={phase.id} survey={survey} />}
    </PhasedShowcase>
  );
}
