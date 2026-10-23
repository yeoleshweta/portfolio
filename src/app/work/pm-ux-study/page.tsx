import React from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection } from "@/components/casestudy/CaseStudyContent";
import BeeTrail, { BEE_PATHS } from "@/components/casestudy/BeeTrail";
import StickyNote from "@/components/casestudy/doodles/StickyNote";
import {
  hero,
  overview,
  rhythm,
  process,
  gathering,
  interviews,
  persona,
  decisionFlow,
  delivery,
  impact,
  nextSteps,
  type Rich,
} from "@/content/designThinking";
import styles from "./designThinking.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "rhythm", label: "Quarterly Cycle" },
  { id: "process", label: "The Process" },
  { id: "gathering", label: "Gathering Insights" },
  { id: "interviews", label: "Interviews" },
  { id: "persona", label: "Persona" },
  { id: "decision", label: "Decision Flow" },
  { id: "delivery", label: "Delivery" },
  { id: "impact", label: "Impact" },
  { id: "next", label: "Next Steps" },
];

function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <strong key={i}>{part.strong}</strong>
        ),
      )}
    </>
  );
}

function Bee({ path }: { path: keyof typeof BEE_PATHS }) {
  return (
    <div className={styles.bee}>
      <BeeTrail {...BEE_PATHS[path]} decorative />
    </div>
  );
}

function ModeIcon({ mode }: { mode: "diverge" | "converge" }) {
  return (
    <span className={styles.modeIcon} aria-hidden="true">
      {mode === "diverge" ? (
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
          <path
            d="M16 1L2 8l14 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor">
          <path d="M2 1l14 7-14 7V1z" />
        </svg>
      )}
    </span>
  );
}

/** Rows stack into labelled cards on phones; each data cell needs a `data-label`. */
function DataTable({
  caption,
  heads,
  className,
  children,
}: {
  caption: string;
  heads: string[];
  className: string;
  children: React.ReactNode;
}) {
  return (
    <table className={`${styles.table} ${className}`}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          {heads.map((head) => (
            <th key={head} scope="col">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function MuralBoard() {
  const { board } = gathering;
  return (
    <figure className={styles.figure}>
      <div className={styles.board}>
        <p className={styles.boardBar}>{board.title}</p>
        <div className={styles.clusters}>
          {board.columns.map((column) => (
            <div key={column.title} className={styles.cluster}>
              <h3 className={styles.clusterTitle}>
                {column.title}
                <span className={styles.clusterCount}>{column.count}</span>
              </h3>
              <ul className={styles.notes}>
                {column.notes.map((note, i) => (
                  <StickyNote
                    key={note}
                    as="li"
                    size="sm"
                    rotate={i % 2 === 0 ? -1 : 1}
                  >
                    &ldquo;{note}&rdquo;
                  </StickyNote>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.boardNote}>{board.footnote}</p>
      </div>
      <figcaption className={styles.caption}>{board.caption}</figcaption>
    </figure>
  );
}

export default function PmPersonaStudyPage() {
  return (
    <div className={styles.page}>
      <CaseStudyHero
        category="Qualitative Research"
        title={hero.title}
        subtitle={hero.subtitle}
        role={hero.role}
        team={hero.team}
        method={hero.method}
        timeline={hero.timeline}
      />

      <CaseStudyLayout sections={sections}>
        <CaseStudySection id="overview" heading="Overview">
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className={styles.stats}>
            {overview.stats.map((stat) => (
              <div
                key={stat.label}
                className={
                  stat.dark ? `${styles.stat} ${styles.statDark}` : styles.stat
                }
              >
                <dt>{stat.label}</dt>
                <dd>{stat.number}</dd>
              </div>
            ))}
          </dl>
        </CaseStudySection>

        <Bee path="timeline" />

        <CaseStudySection id="rhythm" heading="Quarterly Cycle">
          <p>{rhythm.intro}</p>
          <DataTable
            caption={rhythm.caption}
            heads={rhythm.heads}
            className={styles.quarters}
          >
            {rhythm.quarters.map((row) => (
              <tr key={row.quarter} className={row.current ? styles.current : undefined}>
                <th scope="row">
                  {row.quarter}
                  {row.tag ? (
                    <span
                      className={
                        row.current
                          ? styles.tag
                          : `${styles.tag} ${styles.tagPlanned}`
                      }
                    >
                      {row.tag}
                    </span>
                  ) : null}
                </th>
                <td data-label={rhythm.heads[1]}>{row.focus}</td>
                <td data-label={rhythm.heads[2]}>{row.method}</td>
                <td data-label={rhythm.heads[3]}>{row.outcome}</td>
              </tr>
            ))}
          </DataTable>
        </CaseStudySection>

        <Bee path="homeFeatured" />

        <CaseStudySection id="process" heading="The Process">
          <p>
            <RichText parts={process.intro} />
          </p>
          <ol className={styles.process}>
            {process.cards.map((card) => (
              <li key={card.title} className={styles.card}>
                <ModeIcon mode={card.mode} />
                <span className={styles.label}>{card.label}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </li>
            ))}
          </ol>
        </CaseStudySection>

        <Bee path="homeBridge" />

        <CaseStudySection id="gathering" heading="Gathering Insights">
          {gathering.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <ul className={styles.blocks}>
            {gathering.blocks.map((block) => (
              <li key={block.title} className={styles.card}>
                <span className={styles.label}>{block.label}</span>
                <h3 className={styles.cardTitle}>{block.title}</h3>
                <p className={styles.cardText}>{block.text}</p>
              </li>
            ))}
          </ul>
          <MuralBoard />
        </CaseStudySection>

        <Bee path="timeline" />

        <CaseStudySection id="interviews" heading="What the Interviews Showed">
          <p>{interviews.intro}</p>
          <DataTable
            caption={interviews.caption}
            heads={interviews.heads}
            className={styles.themes}
          >
            {interviews.themes.map((row) => (
              <tr key={row.theme}>
                <th scope="row">{row.theme}</th>
                <td data-label={interviews.heads[1]}>
                  <span className={styles.count}>
                    {row.count} of {interviews.total}
                  </span>
                  <span className={styles.track} aria-hidden="true">
                    <span
                      className={styles.fill}
                      style={{ width: `${(row.count / interviews.total) * 100}%` }}
                    />
                  </span>
                </td>
                <td data-label={interviews.heads[2]} className={styles.quoteCell}>
                  &ldquo;{row.note}&rdquo;
                </td>
              </tr>
            ))}
          </DataTable>
          <p className={styles.caption}>{interviews.note}</p>

          <h3 className={styles.subhead}>{interviews.framing.title}</h3>
          <ol className={styles.framing}>
            {interviews.framing.steps.map((step) => (
              <li key={step.title} className={styles.card}>
                <span className={styles.label}>{step.label}</span>
                <h4 className={styles.cardTitle}>{step.title}</h4>
                <p className={styles.cardText}>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className={styles.reframe}>
            <span className={styles.label}>{interviews.reframe.label}</span>
            <p className={styles.reframeStatement}>
              {interviews.reframe.statement}
            </p>
            <p className={styles.reframeText}>{interviews.reframe.text}</p>
          </div>

          <h3 className={styles.subhead}>{interviews.hypothesis.title}</h3>
          <div className={styles.hypothesis}>
            <p className={styles.hypothesisStatement}>
              <RichText parts={interviews.hypothesis.statement} />
            </p>
            <dl className={styles.checks}>
              <div className={styles.check}>
                <dt>{interviews.hypothesis.success.label}</dt>
                <dd>{interviews.hypothesis.success.text}</dd>
              </div>
              <div className={`${styles.check} ${styles.checkWrong}`}>
                <dt>{interviews.hypothesis.failure.label}</dt>
                <dd>{interviews.hypothesis.failure.text}</dd>
              </div>
            </dl>
          </div>
        </CaseStudySection>

        <Bee path="homeFeatured" />

        <CaseStudySection id="persona" heading="Persona">
          <p>
            <RichText parts={persona.intro} />
          </p>
          <ul className={styles.profiles}>
            {persona.profiles.map((profile) => (
              <li key={profile.title} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  {profile.icon}
                </span>
                <h3 className={styles.cardTitle}>{profile.title}</h3>
                <p className={styles.label}>{profile.who}</p>
                <p className={styles.profileQuote}>
                  &ldquo;{profile.quote}&rdquo;
                </p>
              </li>
            ))}
          </ul>
          <p className={styles.status}>
            <span aria-hidden="true">↻</span>
            {persona.status}
          </p>
        </CaseStudySection>

        <Bee path="homeBridge" />

        <CaseStudySection
          id="decision"
          heading="Where a Product Decision Loses User Insight"
        >
          <p>{decisionFlow.intro}</p>
          <DataTable
            caption={decisionFlow.caption}
            heads={decisionFlow.heads}
            className={styles.flow}
          >
            {decisionFlow.rows.map((row) => (
              <tr key={row.step}>
                <th scope="row">{row.step}</th>
                <td data-label={decisionFlow.heads[1]}>{row.pain}</td>
                <td
                  data-label={decisionFlow.heads[2]}
                  className={
                    row.none ? `${styles.add} ${styles.addNone}` : styles.add
                  }
                >
                  {row.add}
                </td>
              </tr>
            ))}
          </DataTable>
        </CaseStudySection>

        <Bee path="timeline" />

        <CaseStudySection id="delivery" heading="Delivery">
          <p>{delivery.intro}</p>
          <ul className={styles.delivery}>
            {delivery.cards.map((card) => (
              <li
                key={card.title}
                className={
                  card.dark
                    ? `${styles.deliveryCard} ${styles.deliveryDark}`
                    : styles.deliveryCard
                }
              >
                {card.label ? (
                  <span className={styles.label}>{card.label}</span>
                ) : null}
                <h3 className={styles.deliveryTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </li>
            ))}
          </ul>
          <p>
            <RichText parts={delivery.closing} />
          </p>
        </CaseStudySection>

        <Bee path="homeFeatured" />

        <CaseStudySection id="impact" heading="Impact">
          <p>{impact.intro}</p>
          <DataTable
            caption={impact.caption}
            heads={impact.heads}
            className={styles.levels}
          >
            {impact.rows.map((row) => (
              <tr key={row.level} className={row.open ? styles.open : undefined}>
                <th scope="row">{row.level}</th>
                <td data-label={impact.heads[1]}>{row.change}</td>
                <td data-label={impact.heads[2]}>{row.signal}</td>
              </tr>
            ))}
          </DataTable>
        </CaseStudySection>

        <Bee path="homeBridge" />

        <CaseStudySection id="next" heading="Next Steps">
          <p>{nextSteps.intro}</p>
          <ol className={styles.next}>
            {nextSteps.items.map((item) => (
              <li key={item.strong}>
                <p>
                  <strong>{item.strong}</strong> {item.text}
                </p>
              </li>
            ))}
          </ol>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
