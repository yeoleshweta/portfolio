"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Download,
  Eye,
  FileText,
  LogOut,
  RefreshCw,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { signOut } from "@/app/admin/actions";
import { EXCLUDE_KEY } from "@/lib/analytics/client";
import GoogleAnalyticsPanel from "./GoogleAnalyticsPanel";
import AlertSettings from "./AlertSettings";
import ThemeControl from "./ThemeControl";
import TrendChart from "./TrendChart";
import type {
  ActivityResult,
  ActivityRow,
  AnalyticsReport,
  Breakdown,
  Totals,
} from "./types";
import styles from "./admin.module.css";

type Tab =
  | "overview"
  | "cases"
  | "audience"
  | "activity"
  | "google"
  | "settings";
const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "cases", label: "Case studies" },
  { id: "audience", label: "Audience" },
  { id: "activity", label: "Activity" },
  { id: "google", label: "Google Analytics" },
  { id: "settings", label: "Settings" },
];
function dateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}
/** Reused from reference AdminDashboard comparisonLabel. */
function comparisonLabel(current: number, previous: number) {
  if (!previous) return current ? "New in this period" : "No change";
  const change = Math.round(((current - previous) / previous) * 100);
  return `${change >= 0 ? "+" : ""}${change}% vs previous`;
}
function fmt(value?: string) {
  return value ? new Date(value).toLocaleString() : "";
}
function title(path: string) {
  return path
    .replace("/work/", "")
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}
function BreakdownList({
  title: heading,
  rows,
}: {
  title: string;
  rows: Breakdown[];
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section className={styles.panel}>
      <h2>{heading}</h2>
      {rows.length ? (
        <ul className={styles.breakdown}>
          {rows.map((row) => (
            <li key={row.label}>
              <div>
                <span>{row.label}</span>
                <strong>{row.count.toLocaleString()}</strong>
              </div>
              <div className={styles.track}>
                <span style={{ width: `${(row.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No data in this range.</p>
      )}
    </section>
  );
}
const metricKeys: {
  key: keyof Totals;
  label: string;
  description: string;
  icon: typeof Eye;
}[] = [
  {
    key: "visitors",
    label: "Visitors",
    description:
      "Distinct anonymous browsers active in this period. Different devices may be the same person.",
    icon: Users,
  },
  {
    key: "visits",
    label: "Visits",
    description:
      "Visits are separated after 30 minutes without visible activity.",
    icon: Activity,
  },
  {
    key: "pageViews",
    label: "Page views",
    description:
      "Initial page loads and client navigations after analytics consent.",
    icon: Eye,
  },
  {
    key: "caseViews",
    label: "Case-study opens",
    description:
      "Content opened after consent. A protected gate alone does not count.",
    icon: FileText,
  },
  {
    key: "resumeViews",
    label: "Résumé views",
    description:
      "The on-site résumé viewer opened, or a direct résumé PDF link was clicked.",
    icon: FileText,
  },
  {
    key: "resumeDownloads",
    label: "Download clicks",
    description:
      "Clicks on Download PDF. This does not confirm the file was saved.",
    icon: Download,
  },
  {
    key: "contactClicks",
    label: "Contact clicks",
    description:
      "Email or phone intent. A click does not confirm a message was sent.",
    icon: ArrowUpRight,
  },
  {
    key: "reachedEnd",
    label: "Reached the end",
    description:
      "Case-study scroll reached 90%. This does not prove the content was read.",
    icon: Eye,
  },
];
export default function AdminDashboard({
  email,
  configured,
  collectionEnabled,
}: {
  email: string;
  configured: boolean;
  collectionEnabled: boolean;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [from, setFrom] = useState(() =>
    dateInputValue(new Date(Date.now() - 29 * 86400000)),
  );
  const [to, setTo] = useState(() => dateInputValue(new Date()));
  const [bots, setBots] = useState(false);
  const [internal, setInternal] = useState(false);
  const [kind, setKind] = useState("events");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [report, setReport] = useState<AnalyticsReport | null>(null);
  const [activity, setActivity] = useState<ActivityResult>({
    total: 0,
    rows: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [notice, setNotice] = useState("");
  const [excluded, setExcluded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [journey, setJourney] = useState<ActivityResult | null>(null);
  const [journeyError, setJourneyError] = useState("");
  const [journeyOffset, setJourneyOffset] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const base = new URLSearchParams({
    from,
    to,
    bots: String(bots),
    internal: String(internal),
  }).toString();
  const activityQuery = new URLSearchParams({
    kind: tab === "audience" ? "visits" : kind,
    search,
    offset: String(offset),
    limit: "50",
  }).toString();
  useEffect(() => {
    try {
      setExcluded(localStorage.getItem(EXCLUDE_KEY) === "true");
    } catch {
      /* no local storage */
    }
  }, []);
  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const [r, a] = await Promise.all([
          fetch(`/api/admin/analytics?${base}`, {
            signal: controller.signal,
            cache: "no-store",
          }),
          fetch(`/api/admin/analytics?${base}&${activityQuery}&view=activity`, {
            signal: controller.signal,
            cache: "no-store",
          }),
        ]);
        if (r.status === 401 || a.status === 401) {
          window.location.assign("/admin/login");
          return;
        }
        if (!r.ok || !a.ok) {
          const failed = await (!r.ok ? r : a).json();
          throw Error(failed.error || "Unable to load analytics.");
        }
        const [rd, ad] = await Promise.all([r.json(), a.json()]);
        if (!controller.signal.aborted) {
          setReport(rd);
          setActivity(ad);
        }
      } catch (e) {
        if (!controller.signal.aborted)
          setError(
            e instanceof Error ? e.message : "Unable to load analytics.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void load();
    const timer = setInterval(() => void load(), 30000);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, [base, activityQuery, refresh, configured]);
  useEffect(() => {
    if (!selected) {
      dialog.current?.close();
      setJourney(null);
      return;
    }
    const controller = new AbortController();
    setJourney(null);
    setJourneyError("");
    dialog.current?.showModal();
    void fetch(
      `/api/admin/analytics?${base}&view=activity&kind=events&visit=${selected}&limit=100&offset=${journeyOffset}`,
      { signal: controller.signal, cache: "no-store" },
    )
      .then(async (response) => {
        if (!response.ok) throw Error("Unable to load this journey.");
        const data = await response.json();
        if (!controller.signal.aborted) setJourney(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setJourneyError(error.message);
      });
    return () => controller.abort();
  }, [selected, base, refresh, journeyOffset]);
  const closeJourney = () => {
    setSelected(null);
    opener.current?.focus();
  };
  const openJourney = (id: string) => {
    opener.current = document.activeElement as HTMLElement;
    setJourneyOffset(0);
    setSelected(id);
  };
  const chooseTab = (id: Tab) => {
    setTab(id);
    setOffset(0);
    setSearch("");
  };
  const exportData = async () => {
    setExporting(true);
    setNotice("");
    try {
      const response = await fetch(
        `/api/admin/analytics?${base}&${activityQuery}&view=export`,
        { cache: "no-store" },
      );
      if (!response.ok) throw Error("Export failed. Try again.");
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `portfolio-${tab === "audience" ? "visits" : kind}-${from}.csv`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(
        response.headers.get("X-Export-Truncated") === "true"
          ? "Exported the first 5,000 matching records. Narrow the date range for the remaining records."
          : "Export downloaded.",
      );
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setExporting(false);
    }
  };
  const markInternal = async () => {
    if (!selected) return;
    setJourneyError("");
    try {
      const response = await fetch("/api/admin/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitId: selected, isInternal: true }),
      });
      if (!response.ok) throw Error("Unable to exclude this visit.");
      closeJourney();
      setRefresh((n) => n + 1);
      setNotice("Visit marked as internal.");
    } catch (e) {
      setJourneyError((e as Error).message);
    }
  };
  const excludeBrowser = (value: boolean) => {
    try {
      localStorage.setItem(EXCLUDE_KEY, String(value));
      setExcluded(value);
      setNotice(
        value
          ? "Future activity from this browser is excluded. Existing visits can be marked internal from their timeline."
          : "Future visits from this browser can be measured with consent.",
      );
    } catch {
      setNotice("Browser storage is unavailable. Use visit exclusion instead.");
    }
  };
  const previous = () => {
    setOffset((n) => Math.max(0, n - 50));
  };
  return (
    <div className={styles.admin} data-admin-root data-theme="light">
      <a className="skipLink" href="#admin-content">
        Skip to analytics
      </a>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.wordmark}>
          Shweta<span> / studio</span>
        </Link>
        <p className={styles.sidebarNote}>Portfolio analytics</p>
        <nav aria-label="Admin sections">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => chooseTab(item.id)}
              aria-current={tab === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <a href="/" target="_blank" rel="noreferrer">
            Open portfolio <ArrowUpRight size={15} />
          </a>
          <span title={email}>{email}</span>
          <form action={signOut}>
            <button type="submit">
              <LogOut size={15} /> Sign out
            </button>
          </form>
        </div>
      </aside>
      <main id="admin-content" className={styles.main}>
        <header className={styles.header}>
          <div>
            <p className={styles.muted}>Your portfolio at a glance</p>
            <h1>{tabs.find((t) => t.id === tab)?.label}</h1>
          </div>
          <div className={styles.headerActions}>
            <ThemeControl />
            <button
              className={styles.iconButton}
              onClick={() => setRefresh((n) => n + 1)}
              aria-label="Refresh analytics"
              disabled={loading}
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </header>
        <form className={styles.filters} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.quickRanges} aria-label="Date presets">
            {[1, 7, 30].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => {
                  setFrom(
                    dateInputValue(
                      new Date(Date.now() - (days - 1) * 86400000),
                    ),
                  );
                  setTo(dateInputValue(new Date()));
                  setOffset(0);
                }}
              >
                {days === 1 ? "Today" : `${days} days`}
              </button>
            ))}
          </div>
          <label>
            From
            <input
              aria-label="From date"
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setOffset(0);
              }}
            />
          </label>
          <label>
            To
            <input
              aria-label="To date"
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                setOffset(0);
              }}
            />
          </label>
          <span className={styles.small}>Dates in UTC</span>
        </form>
        <div className={styles.statusLine}>
          <span role="status">
            {loading
              ? "Updating analytics…"
              : report
                ? `Updated ${new Date(report.updatedAt).toLocaleTimeString()}. Refreshes every 30 seconds.`
                : "Waiting for a connection."}
          </span>
          <span>Consent-based activity only</span>
        </div>
        {notice && (
          <p className={styles.notice} role="status">
            {notice}
          </p>
        )}
        {error && (
          <div className={styles.error} role="alert">
            {error}{" "}
            <button onClick={() => setRefresh((n) => n + 1)}>Try again</button>
          </div>
        )}
        {!configured && (
          <p className={styles.notice}>
            Analytics storage is not connected yet. Complete the Supabase
            connection before collecting visits.
          </p>
        )}
        {!collectionEnabled && (
          <p className={styles.notice}>
            Collection is disabled in this environment. Existing reports remain
            available.
          </p>
        )}
        <div aria-busy={loading}>
          {tab === "overview" && (
            <>
              <section className={styles.metrics} aria-label="Overview metrics">
                {metricKeys.map(({ key, label, description, icon: Icon }) => (
                  <article key={key} className={styles.metric}>
                    <div>
                      <span>{label}</span>
                      <Icon size={17} />
                    </div>
                    <strong>
                      {report ? report.totals[key].toLocaleString() : "—"}
                    </strong>
                    <p>
                      {report
                        ? comparisonLabel(
                            report.totals[key],
                            report.previousTotals[key],
                          )
                        : "Waiting for data"}
                    </p>
                    <button
                      type="button"
                      className={styles.metricInfo}
                      title={description}
                      aria-label={description}
                      data-detail={description}
                    >
                      i
                    </button>
                  </article>
                ))}
              </section>
              <section
                className={styles.funnel}
                aria-label="Visit conversion funnel"
              >
                <h2>From visit to action</h2>
                <p>
                  Unique visits performing each action; stages may occur
                  independently.
                </p>
                <div>
                  {(
                    [
                      "visits",
                      "caseStudies",
                      "resume",
                      "downloads",
                      "shares",
                      "contacts",
                    ] as const
                  ).map((key) => (
                    <article key={key}>
                      <strong>
                        {(report?.funnel?.[key] ?? 0).toLocaleString()}
                      </strong>
                      <span>
                        {{
                          visits: "Visits",
                          caseStudies: "Case studies",
                          resume: "Résumé",
                          downloads: "Downloads",
                          shares: "Shares",
                          contacts: "Contact",
                        }[key] ?? key}
                      </span>
                    </article>
                  ))}
                </div>
              </section>
              <div className={styles.overviewGrid}>
                <section className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <div>
                      <h2>Attention over time</h2>
                      <p>
                        Explore traffic and résumé actions in the selected
                        period
                      </p>
                    </div>
                    <Eye size={18} />
                  </div>
                  {report ? (
                    <TrendChart points={report.series} />
                  ) : (
                    <div className={styles.skeleton}>Loading traffic…</div>
                  )}
                </section>
                <BreakdownList
                  title="Where visits come from"
                  rows={report?.sources ?? []}
                />
              </div>
              <section className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <h2>Recently active</h2>
                    <p>
                      Seen within the past two minutes, regardless of the
                      selected date range
                    </p>
                  </div>
                  <span className={styles.liveCount}>
                    {report?.live.length ?? 0} shown
                  </span>
                </div>
                {report?.live.length ? (
                  <ul className={styles.liveList}>
                    {report.live.map((visitor) => (
                      <li key={visitor.id}>
                        <span>
                          <i className={styles.liveDot} />
                          {visitor.current_path}
                        </span>
                        <span>
                          {visitor.device} · {visitor.browser}
                        </span>
                        <button onClick={() => openJourney(visitor.id)}>
                          View journey
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>
                    No visitors active in the past two minutes.
                  </p>
                )}
              </section>
              <section className={styles.panel}>
                <h2>Résumé interest</h2>
                <p className={styles.muted}>
                  Which placements lead people to the résumé and download
                  action.
                </p>
                {report?.placements.length ? (
                  <div className={styles.tableWrap}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Placement</th>
                          <th scope="col">Views</th>
                          <th scope="col">Download clicks</th>
                          <th scope="col">Shares</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.placements.map((p) => (
                          <tr key={p.label}>
                            <th scope="row">{p.label.replaceAll("_", " ")}</th>
                            <td>{p.views}</td>
                            <td>{p.downloads}</td>
                            <td>{p.shares ?? 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={styles.empty}>
                    Résumé activity will appear after a visitor opens the
                    viewer.
                  </p>
                )}
              </section>
            </>
          )}
          {tab === "cases" && (
            <>
              <section className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <h2>What people spend time with</h2>
                    <p>Opens, reader reach, and visible time by case study</p>
                  </div>
                  <FileText size={20} />
                </div>
                {report?.cases.length ? (
                  <div className={styles.tableWrap}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Case study</th>
                          <th scope="col">Opens</th>
                          <th scope="col">Readers</th>
                          <th scope="col">Visits reaching 90%</th>
                          <th scope="col">Visible time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.cases.map((study) => (
                          <tr key={study.path}>
                            <th scope="row">
                              <a
                                href={study.path}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {title(study.path)} <ArrowUpRight size={13} />
                              </a>
                            </th>
                            <td>{study.views}</td>
                            <td>{study.readers}</td>
                            <td>{study.completed}</td>
                            <td>
                              {Math.round(study.active_seconds / 60)} min total
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={styles.empty}>
                    No case-study activity in this range. Try a wider date
                    range.
                  </p>
                )}
              </section>
              <section className={styles.panel}>
                <h2>Section reach</h2>
                <p className={styles.muted}>
                  Visits where the section became active. Reaching a section
                  does not imply reading it.
                </p>
                {report?.sections.length ? (
                  <div className={styles.tableWrap}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Case study</th>
                          <th scope="col">Section</th>
                          <th scope="col">Visits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.sections.map((section) => (
                          <tr key={`${section.path}:${section.section_id}`}>
                            <td>{title(section.path)}</td>
                            <th scope="row">
                              {section.label || section.section_id}
                            </th>
                            <td>{section.visits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className={styles.empty}>
                    Section activity appears as readers move through case
                    studies.
                  </p>
                )}
              </section>
            </>
          )}
          {tab === "audience" && (
            <>
              <p className={styles.notice}>
                {report?.totals.newVisitors ?? 0} first-time browsers ·{" "}
                {report?.totals.returningVisitors ?? 0} returning browsers in
                the selected dates. Based on retained history.
              </p>
              <div className={styles.breakdownGrid}>
                <BreakdownList title="Devices" rows={report?.devices ?? []} />
                <BreakdownList title="Browsers" rows={report?.browsers ?? []} />
                <BreakdownList
                  title="Campaigns"
                  rows={report?.campaigns ?? []}
                />
              </div>
              <p className={styles.muted}>
                A visitor is an anonymous browser. Each row below is a separate
                visit.
              </p>
            </>
          )}
          {(tab === "activity" || tab === "audience") && (
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <h2>
                  {tab === "audience" ? "Visitor journeys" : "Activity log"}
                </h2>
                <button
                  onClick={exportData}
                  disabled={exporting || loading}
                  className={styles.secondary}
                >
                  <Download size={15} />
                  {exporting ? "Exporting…" : "Export CSV"}
                </button>
              </div>
              <div className={styles.activityTools}>
                <label className={styles.search}>
                  <span className={styles.srOnly}>Search activity</span>
                  <Search size={16} />
                  <input
                    aria-label="Search activity"
                    placeholder="Search paths, events, or visit IDs"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setOffset(0);
                    }}
                  />
                </label>
                {tab === "activity" && (
                  <label>
                    Show
                    <select
                      value={kind}
                      onChange={(e) => {
                        setKind(e.target.value);
                        setOffset(0);
                      }}
                    >
                      <option value="events">All events</option>
                      <option value="cases">Case studies</option>
                      <option value="resumes">Résumé</option>
                      <option value="contacts">Contact intent</option>
                    </select>
                  </label>
                )}
              </div>
              {activity.rows.length ? (
                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">
                          {tab === "audience" ? "Visitor" : "Event"}
                        </th>
                        <th scope="col">Page</th>
                        <th scope="col">Device</th>
                        <th scope="col">Time</th>
                        <th scope="col">Journey</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.rows.map((row: ActivityRow) => (
                        <tr key={row.id}>
                          <th scope="row">
                            {row.name
                              ? row.name.replaceAll("_", " ")
                              : `Browser ${row.browser_id.slice(0, 8)}`}
                            {row.is_internal && <small>Internal</small>}
                            {row.is_bot && <small>Detected bot</small>}
                          </th>
                          <td className={styles.path}>
                            {row.path ?? row.current_path}
                          </td>
                          <td>
                            {row.device}
                            <small>{row.browser}</small>
                          </td>
                          <td className={styles.date}>
                            {fmt(row.occurred_at ?? row.last_seen_at)}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                openJourney(row.visit_id ?? row.id)
                              }
                            >
                              Open
                              <span className={styles.srOnly}>
                                {" "}
                                journey for {row.id}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className={styles.empty}>
                  {loading
                    ? "Loading activity…"
                    : "Nothing matches these filters. Try a wider date range or clear your search."}
                </p>
              )}
              <div className={styles.pagination}>
                <span>
                  {activity.total
                    ? `${offset + 1}–${Math.min(offset + 50, activity.total)} of ${activity.total.toLocaleString()}`
                    : "0 records"}
                </span>
                <div>
                  <button onClick={previous} disabled={offset === 0 || loading}>
                    Previous
                  </button>
                  <button
                    onClick={() => setOffset((n) => n + 50)}
                    disabled={offset + 50 >= activity.total || loading}
                  >
                    Next
                  </button>
                </div>
              </div>
              <p className={styles.small}>
                CSV exports include up to 5,000 matching records. Narrow the
                date range for larger datasets.
              </p>
            </section>
          )}
          {tab === "google" && <GoogleAnalyticsPanel from={from} to={to} />}
          {tab === "settings" && (
            <>
              <AlertSettings />
              <section className={styles.panel}>
                <div className={styles.panelHeader}>
                  <div>
                    <h2>Traffic quality</h2>
                    <p>
                      Filters apply to every report, activity list, and export.
                    </p>
                  </div>
                  <Settings size={19} />
                </div>
                <label
                  className={styles.setting}
                  aria-label="Include detected bots"
                >
                  <span>
                    <strong>Include detected bots</strong>
                    <small>
                      Classification uses the browser user agent and may not
                      detect every bot.
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={bots}
                    onChange={(e) => {
                      setBots(e.target.checked);
                      setOffset(0);
                    }}
                  />
                </label>
                <label
                  className={styles.setting}
                  aria-label="Include internal visits"
                >
                  <span>
                    <strong>Include internal visits</strong>
                    <small>
                      Visits marked internal are excluded by default.
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={internal}
                    onChange={(e) => {
                      setInternal(e.target.checked);
                      setOffset(0);
                    }}
                  />
                </label>
                <label
                  className={styles.setting}
                  aria-label="Exclude this browser"
                >
                  <span>
                    <strong>Exclude this browser</strong>
                    <small>
                      Stops future collection from this browser, including when
                      browsing the public site.
                    </small>
                  </span>
                  <input
                    type="checkbox"
                    checked={excluded}
                    onChange={(e) => excludeBrowser(e.target.checked)}
                  />
                </label>
              </section>
              <section className={styles.panel}>
                <h2>What the numbers mean</h2>
                <ul className={styles.explanations}>
                  <li>
                    Tracking starts after a visitor accepts analytics. Declined
                    or blocked visits are not represented.
                  </li>
                  <li>
                    Anonymous browser identifiers cannot identify a
                    person&apos;s name, employer, or cross-device activity.
                  </li>
                  <li>
                    Visible time measures a foreground tab. It does not prove
                    attention.
                  </li>
                  <li>
                    Résumé downloads and contact actions measure clicks, not
                    completed saves or sent messages.
                  </li>
                  <li>
                    Raw events and visits are retained for 400 days when the
                    daily cleanup is configured.
                  </li>
                  <li>
                    Email threshold delivery requires Resend. Google
                    Analytics reports use a separate read-only connection;
                    chatbot transcripts are not connected.
                  </li>
                </ul>
              </section>
            </>
          )}
        </div>
      </main>
      <dialog
        ref={dialog}
        className={styles.dialog}
        onCancel={closeJourney}
        onClose={() => {
          if (selected) closeJourney();
        }}
        aria-labelledby="journey-title"
      >
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.muted}>Anonymous visit</p>
            <h2 id="journey-title">Visitor journey</h2>
            <code>{selected}</code>
          </div>
          <button
            onClick={closeJourney}
            aria-label="Close visitor journey"
            className={styles.iconButton}
          >
            <X size={20} />
          </button>
        </div>
        <p className={styles.small}>
          Events within the selected dates. Times use your local timezone.
        </p>
        {journeyError && (
          <p role="alert" className={styles.error}>
            {journeyError}
          </p>
        )}
        {!journey && !journeyError && <p role="status">Loading journey…</p>}
        {journey && (
          <>
            <ol className={styles.timeline}>
              {journey.rows.map((row) => (
                <li key={row.id}>
                  <time>{fmt(row.occurred_at)}</time>
                  <strong>{row.name?.replaceAll("_", " ")}</strong>
                  <span>{row.path}</span>
                  {Boolean(row.params?.section_label) && (
                    <span>{String(row.params?.section_label)}</span>
                  )}
                  {Boolean(row.params?.duration_sec) && (
                    <span>
                      {String(row.params?.duration_sec)} visible seconds
                    </span>
                  )}
                </li>
              ))}
            </ol>
            {!journey.rows.length && (
              <p className={styles.empty}>
                No events for this visit in the selected range.
              </p>
            )}
            <div className={styles.pagination}>
              <span>{journey.total} events</span>
              <div>
                <button
                  disabled={!journeyOffset}
                  onClick={() => setJourneyOffset((n) => Math.max(0, n - 100))}
                >
                  Previous
                </button>
                <button
                  disabled={journeyOffset + 100 >= journey.total}
                  onClick={() => setJourneyOffset((n) => n + 100)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        <button className={styles.secondary} onClick={markInternal}>
          Mark visit as internal
        </button>
      </dialog>
    </div>
  );
}
