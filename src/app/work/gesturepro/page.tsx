import type { ReactNode } from "react";
import CaseStudyLayout from "@/components/casestudy/CaseStudyLayout";
import CaseStudyHero from "@/components/casestudy/CaseStudyHero";
import { CaseStudySection } from "@/components/casestudy/CaseStudyContent";
import { TldrCard } from "@/components/casestudy/CaseStudyExtras";
import { BeeBreak } from "@/components/casestudy/BeeTrail";
import DataTable from "@/components/casestudy/DataTable";
import { RichText } from "@/components/casestudy/RichText";
import {
  hero,
  tldr,
  overview,
  reframe,
  empathize,
  define,
  principles,
  decisions,
  loop,
  test,
  community,
  accessibility,
  evidence,
  next,
  sources,
  type LeadIn,
} from "@/content/gesturePro";
import styles from "./gesturepro.module.css";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "reframe", label: "The reframe" },
  { id: "empathize", label: "Empathize" },
  { id: "define", label: "Define" },
  { id: "principles", label: "HCAI principles" },
  { id: "decisions", label: "Design decisions" },
  { id: "loop", label: "The interaction loop" },
  { id: "test", label: "Prototype and test" },
  { id: "community", label: "Community" },
  { id: "accessibility", label: "Accessibility" },
  { id: "evidence", label: "Evidence" },
  { id: "next", label: "Next steps" },
  { id: "sources", label: "Sources" },
];

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

function Status({ built, children }: { built: boolean; children: string }) {
  return (
    <span className={cx(styles.status, built ? styles.statusBuilt : styles.statusDesigned)}>
      {children}
    </span>
  );
}

const leadIn = ({ lead, text }: LeadIn) => (
  <>
    <strong>{lead}</strong> {text}
  </>
);

function ProsAndCons({
  columns,
}: {
  columns: { title: string; items: ReactNode[] }[];
}) {
  return (
    <div className={cx(styles.panel, styles.two)}>
      {columns.map((column) => (
        <div key={column.title}>
          <h3 className={styles.eyebrow}>{column.title}</h3>
          <ul className={cx(styles.plain, styles.stack)}>
            {column.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function GestureProCaseStudy() {
  return (
    <div className={styles.page}>
      <CaseStudyHero
        category={hero.category}
        title={hero.title}
        subtitle={hero.subtitle}
        role={hero.role}
        team={hero.team}
        method={hero.method}
        stack={hero.stack}
      />

      <CaseStudyLayout sections={sections} hideBrief>
        <TldrCard summary={<RichText parts={tldr.summary} />} fields={tldr.fields} />

        <CaseStudySection
          id="overview"
          label={overview.label}
          heading={overview.heading}
        >
          {overview.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className={cx(styles.panel, styles.stats)}>
            {overview.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </CaseStudySection>

        <BeeBreak path="timeline" />

        <CaseStudySection id="reframe" label={reframe.label} heading={reframe.heading}>
          <p>{reframe.body}</p>
          <div className={styles.versus}>
            <div className={styles.before}>
              <p className={styles.eyebrow}>{reframe.before.label}</p>
              <p className={styles.question}>{reframe.before.question}</p>
              <p className={styles.small}>{reframe.before.note}</p>
            </div>
            <div className={styles.after}>
              <p className={styles.eyebrow}>{reframe.after.label}</p>
              <p className={styles.question}>{reframe.after.question}</p>
              <p className={styles.small}>{reframe.after.note}</p>
            </div>
          </div>
        </CaseStudySection>

        <BeeBreak path="homeFeatured" />

        <CaseStudySection
          id="empathize"
          label={empathize.label}
          heading={empathize.heading}
        >
          <p>{empathize.intro}</p>
          <ul className={cx(styles.plain, styles.panel, styles.three)}>
            {empathize.sources.map((source) => (
              <li key={source.title}>
                <p className={styles.eyebrow}>{source.kicker}</p>
                <h3 className={styles.cardTitle}>{source.title}</h3>
                <p className={styles.small}>{source.body}</p>
                <p className={styles.cite}>{source.cite}</p>
              </li>
            ))}
          </ul>

          <h3 className={styles.subhead}>{empathize.survey.title}</h3>
          <p>{empathize.survey.intro}</p>
          <DataTable
            caption={empathize.survey.caption}
            heads={empathize.survey.heads}
            className={styles.survey}
          >
            {empathize.survey.rows.map(([finding, ...counts]) => (
              <tr key={finding}>
                <th scope="row">{finding}</th>
                {counts.map((count, i) => (
                  <td key={i} data-label={empathize.survey.heads[i + 1]}>
                    {count}
                  </td>
                ))}
              </tr>
            ))}
          </DataTable>
          <p className={styles.note}>{empathize.survey.note}</p>

          <div className={styles.callout}>
            <p className={styles.calloutLabel}>{empathize.changed.label}</p>
            <h3 className={styles.calloutTitle}>{empathize.changed.title}</h3>
            <p className={styles.calloutBody}>{empathize.changed.body}</p>
          </div>
        </CaseStudySection>

        <BeeBreak path="homeBridge" />

        <CaseStudySection id="define" label={define.label} heading={define.heading}>
          <p>{define.intro}</p>
          <ul className={cx(styles.plain, styles.panel, styles.one)}>
            {define.statements.map((item) => (
              <li
                key={item.statement}
                className={item.chosen ? styles.chosen : undefined}
              >
                <span
                  className={cx(styles.tag, item.chosen ? styles.tagRoot : styles.tagSymptom)}
                >
                  {item.tag}
                </span>
                <p className={styles.statement}>{item.statement}</p>
                <p className={styles.small}>{item.note}</p>
              </li>
            ))}
          </ul>

          <h3 className={styles.subhead}>{define.hmw.title}</h3>
          <ul className={cx(styles.plain, styles.panel, styles.three)}>
            {define.hmw.items.map((item) => (
              <li key={item}>
                <p className={styles.hmw}>{item}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <BeeBreak path="timeline" />

        <CaseStudySection
          id="principles"
          label={principles.label}
          heading={principles.heading}
        >
          <p>{principles.intro}</p>
          <ul className={cx(styles.plain, styles.panel, styles.two)}>
            {principles.items.map((item) => (
              <li key={item.id}>
                <p className={styles.eyebrow}>
                  {item.id} · {item.source}
                </p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.small}>{item.body}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <BeeBreak path="homeFeatured" />

        <CaseStudySection
          id="decisions"
          label={decisions.label}
          heading={decisions.heading}
        >
          <p>
            Each decision is tagged by status. <Status built>In prototype</Status> means
            it runs in the build today. <Status built={false}>Designed</Status> means it
            was specified from research and testing but not built in the capstone
            timeframe.
          </p>
          <DataTable
            caption={decisions.caption}
            heads={decisions.heads}
            className={styles.decisions}
          >
            {decisions.rows.map((row) => (
              <tr key={row.decision}>
                <th scope="row">{row.decision}</th>
                <td data-label={decisions.heads[1]}>{row.why}</td>
                <td data-label={decisions.heads[2]}>{row.principle}</td>
                <td data-label={decisions.heads[3]}>{row.tradeoff}</td>
                <td data-label={decisions.heads[4]}>
                  <Status built={row.built}>{row.status}</Status>
                </td>
              </tr>
            ))}
          </DataTable>
          <p className={styles.note}>{decisions.note}</p>
        </CaseStudySection>

        <BeeBreak path="homeBridge" />

        <CaseStudySection id="loop" label={loop.label} heading={loop.heading}>
          <p>{loop.intro}</p>
          <ol className={cx(styles.plain, styles.loop)}>
            {loop.steps.map((step) => (
              <li
                key={step.title}
                className={step.actor === "Person" ? styles.person : styles.model}
              >
                <p className={styles.actor}>{step.actor}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className={styles.note}>{loop.note}</p>

          <h3 className={styles.subhead}>{loop.hypothesis.title}</h3>
          <div className={styles.hypothesis}>
            <p className={styles.believe}>{loop.hypothesis.believe}</p>
            <p className={styles.small}>
              <strong>{loop.hypothesis.know.label}</strong> {loop.hypothesis.know.text}
            </p>
            <p className={styles.small}>
              <strong>{loop.hypothesis.wrong.label}</strong> {loop.hypothesis.wrong.text}
            </p>
          </div>
        </CaseStudySection>

        <BeeBreak path="timeline" />

        <CaseStudySection id="test" label={test.label} heading={test.heading}>
          <p>{test.intro}</p>
          <ul className={cx(styles.plain, styles.panel, styles.three)}>
            {test.setup.map((item) => (
              <li key={item.label}>
                <p className={styles.eyebrow}>{item.label}</p>
                <p className={styles.small}>{item.text}</p>
              </li>
            ))}
          </ul>
          <DataTable
            caption={test.caption}
            heads={test.heads}
            className={styles.findings}
          >
            {test.rows.map((row) => (
              <tr key={row.finding}>
                <th scope="row">{row.finding}</th>
                <td data-label={test.heads[1]}>{row.count}</td>
                <td data-label={test.heads[2]}>{row.ledTo}</td>
              </tr>
            ))}
          </DataTable>
          <p className={styles.note}>{test.note}</p>
        </CaseStudySection>

        <BeeBreak path="homeFeatured" />

        <CaseStudySection
          id="community"
          label={community.label}
          heading={community.heading}
        >
          <p>{community.intro}</p>
          <ProsAndCons
            columns={[community.help, community.harm].map((column) => ({
              title: column.title,
              items: column.items.map(leadIn),
            }))}
          />
        </CaseStudySection>

        <BeeBreak path="homeBridge" />

        <CaseStudySection
          id="accessibility"
          label={accessibility.label}
          heading={accessibility.heading}
        >
          <p>{accessibility.intro}</p>
          <DataTable
            caption={accessibility.caption}
            heads={accessibility.heads}
            className={styles.requirements}
          >
            {accessibility.rows.map((row) => (
              <tr key={row.requirement}>
                <th scope="row">{row.requirement}</th>
                <td data-label={accessibility.heads[1]}>{row.why}</td>
              </tr>
            ))}
          </DataTable>
        </CaseStudySection>

        <BeeBreak path="timeline" />

        <CaseStudySection
          id="evidence"
          label={evidence.label}
          heading={evidence.heading}
        >
          <ProsAndCons columns={[evidence.supported, evidence.unsupported]} />
        </CaseStudySection>

        <BeeBreak path="homeFeatured" />

        <CaseStudySection id="next" label={next.label} heading={next.heading}>
          <ol className={cx(styles.plain, styles.panel, styles.three, styles.numbered)}>
            {next.steps.map((step) => (
              <li key={step.title}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.small}>{step.text}</p>
              </li>
            ))}
          </ol>

          <h3 className={styles.subhead}>{next.lessons.title}</h3>
          {next.lessons.items.map((item) => (
            <p key={item.lead}>{leadIn(item)}</p>
          ))}
        </CaseStudySection>

        <CaseStudySection id="sources">
          <h2 className={styles.sourcesTitle}>{sources.title}</h2>
          <ul className={cx(styles.plain, styles.sources)}>
            {sources.items.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.text}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      </CaseStudyLayout>
    </div>
  );
}
