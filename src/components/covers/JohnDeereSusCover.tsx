import styles from "./covers.module.css";

const POINTS = [
  { m: "M1", v: 60 },
  { m: "M2", v: 62.3 },
  { m: "M3", v: 65.1 },
  { m: "M4", v: 68.9 },
  { m: "M5", v: 73.5 },
  { m: "M6", v: 77.8 },
  { m: "M7", v: 82.1 },
  { m: "M8", v: 85.6 },
] as const;

const X0 = 86;
const XSTEP = 86;
const Y_AT = (v: number) => 248 - ((v - 58) / 30) * 168;

const coords = POINTS.map((p, i) => ({
  ...p,
  x: X0 + i * XSTEP,
  y: Y_AT(p.v),
}));

const line = coords.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
const area = `${line} L ${coords[7].x} 268 L ${coords[0].x} 268 Z`;

export function JohnDeereSusCover() {
  return (
    <div className={`${styles.board} ${styles.c1}`}>
      <div className={styles.visual}>
        <div className={styles.visualTop}>
          <span className={styles.kicker}>
            {"// CASE STUDY 01  ·  LONGITUDINAL USABILITY"}
          </span>
          <span className={styles.brand}>ABTOOLS</span>
        </div>

        <svg className={styles.c1Chart} viewBox="0 0 760 320" aria-hidden="true">
          <defs>
            <pattern
              id="c1Hatch"
              width="10"
              height="10"
              patternTransform="rotate(38)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="10" stroke="#C9BDF5" strokeWidth="2" />
            </pattern>
          </defs>
          <text className={styles.c1Axis} x="28" y="168" transform="rotate(-90 28 168)">
            SUS score
          </text>
          {[60, 70, 80].map((tick) => (
            <g key={tick}>
              <line
                className={styles.c1Grid}
                x1="70"
                y1={Y_AT(tick)}
                x2="730"
                y2={Y_AT(tick)}
              />
              <text className={styles.c1Tick} x="62" y={Y_AT(tick) + 4}>
                {tick}
              </text>
            </g>
          ))}
          <path className={styles.c1Area} d={area} />
          <path className={styles.c1Line} d={line} />
          {coords.map((p, i) => (
            <g key={p.m}>
              <circle
                className={i === 7 ? styles.c1End : styles.c1Dot}
                cx={p.x}
                cy={p.y}
                r={i === 7 ? 8 : 6}
              />
              <text
                className={i === 7 ? styles.c1EndLabel : styles.c1Val}
                x={p.x}
                y={p.y - (i === 7 ? 22 : 16)}
              >
                {p.v}
              </text>
              <text className={styles.c1Month} x={p.x} y="292">
                {p.m}
              </text>
            </g>
          ))}
        </svg>

        <aside className={styles.c1Note}>
          <span>SUS SCORE</span>
          <strong>60 → 85.6</strong>
          <em>did “better” hold up?</em>
        </aside>
        <span className={`${styles.spark} ${styles.c1SparkA}`} />
        <span className={`${styles.spark} ${styles.c1SparkB}`} />
        <p className={styles.caption}>8 months, two waves</p>
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <p className={styles.badgeRow}>
            <span className={styles.badge}>01</span>
            MIXED METHODS
          </p>
          <span className={styles.go} aria-hidden="true">
            →
          </span>
        </div>
        <h3 className={styles.title}>
          When Did Better Actually Mean <em>Better?</em>
        </h3>
        <p className={styles.meta}>SUS 60 → 85.6 · 8 MONTHS · TWO WAVES</p>
        <p className={styles.lede}>
          A two-wave longitudinal usability study for ABTools, testing whether
          the improvements people felt at first still held months later.
        </p>
        <div className={styles.pills}>
          <span>Longitudinal study</span>
          <span>Usability testing</span>
          <span>SUS benchmarking</span>
          <span>Mixed methods</span>
        </div>
      </div>
    </div>
  );
}
