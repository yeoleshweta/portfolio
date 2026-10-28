"use client";
import { useEffect, useState } from "react";
import type { GAResult, GARow } from "@/lib/admin/google-analytics";
import styles from "./admin.module.css";
function ReportTable({
  title,
  rows,
  dimensions,
  metrics,
}: {
  title: string;
  rows: GARow[];
  dimensions: string[];
  metrics: { key: string; label: string; percent?: boolean }[];
}) {
  return (
    <section className={styles.panel}>
      <h2>{title}</h2>
      {rows.length ? (
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th scope="col">
                  {dimensions
                    .map(
                      (d) =>
                        ({
                          date: "Date",
                          country: "Country",
                          sessionSourceMedium: "Source / medium",
                          deviceCategory: "Device",
                          browser: "Browser",
                          eventName: "Event",
                        })[d] ?? d,
                    )
                    .join(" / ")}
                </th>
                {metrics.map((m) => (
                  <th key={m.key} scope="col">
                    {m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <th scope="row">
                    {dimensions
                      .map((d) => row.dimensions[d] ?? "Unknown")
                      .join(" / ")}
                  </th>
                  {metrics.map((m) => (
                    <td key={m.key}>
                      {m.percent
                        ? `${((row.metrics[m.key] ?? 0) * 100).toFixed(1)}%`
                        : (row.metrics[m.key] ?? 0).toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.empty}>No data returned for these dates.</p>
      )}
    </section>
  );
}
export default function GoogleAnalyticsPanel({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  const [data, setData] = useState<GAResult | null>(null);
  const [setup, setSetup] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError("");
      setData(null);
      setSetup("");
      try {
        const response = await fetch(
          `/api/admin/google-analytics?${new URLSearchParams({ from, to })}`,
          { signal: controller.signal, cache: "no-store" },
        );
        const result = await response.json();
        if (!response.ok)
          throw Error(result.error ?? "Unable to load Google Analytics.");
        if (!controller.signal.aborted) {
          if (result.configured) setData(result);
          else setSetup(result.message);
        }
      } catch (e) {
        if (!controller.signal.aborted) setError((e as Error).message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void load();
    return () => controller.abort();
  }, [from, to, refresh]);
  return (
    <div aria-busy={loading}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Google Analytics 4</h2>
            <p>
              Google reports stay separate from first-party visitor journeys.
            </p>
          </div>
          <button
            className={styles.secondary}
            onClick={() => setRefresh((n) => n + 1)}
            disabled={loading}
          >
            Refresh GA reports
          </button>
        </div>
        <p className={styles.small}>
          Uses your selected calendar dates in the GA property timezone. GA
          identity, processing delays, consent modeling and filters can produce
          different counts. First-party bot/internal switches do not change
          these reports.
        </p>
        {loading && (
          <p role="status" className={styles.empty}>
            Loading Google Analytics…
          </p>
        )}
        {setup && (
          <p role="status" className={styles.notice}>
            {setup}
          </p>
        )}
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
        {data && (
          <>
            <p className={styles.small}>
              Property timezone: {data.timezone}. Fetched{" "}
              {new Date(data.fetchedAt).toLocaleString()}. Cached for up to five
              minutes.
            </p>
            {(data.thresholded || data.sampled || data.otherRowLoss) && (
              <p className={styles.notice}>
                Google reports {data.thresholded ? "privacy thresholds " : ""}
                {data.sampled ? "sampling " : ""}
                {data.otherRowLoss ? "and grouped “other” data loss" : ""}for
                this request. Treat breakdowns as limited.
              </p>
            )}
            {data.warnings.map((w) => (
              <p key={w} className={styles.notice}>
                {w}
              </p>
            ))}
            <div className={styles.gaMetrics}>
              {[
                { key: "totalUsers", label: "Total users" },
                { key: "activeUsers", label: "Active users" },
                { key: "sessions", label: "Sessions" },
                { key: "screenPageViews", label: "Page views" },
                { key: "engagedSessions", label: "Engaged sessions" },
                { key: "engagementRate", label: "Engagement rate" },
              ].map((m) => (
                <article key={m.key}>
                  <strong>
                    {m.key === "engagementRate"
                      ? `${((data.totals[m.key] ?? 0) * 100).toFixed(1)}%`
                      : (data.totals[m.key] ?? 0).toLocaleString()}
                  </strong>
                  <span>{m.label}</span>
                </article>
              ))}
              <article>
                <strong>{data.activeUsers30m ?? "Unavailable"}</strong>
                <span>Active users in the last 30 minutes</span>
              </article>
            </div>
          </>
        )}
      </section>
      {data && (
        <>
          <ReportTable
            title="Daily traffic"
            rows={data.daily}
            dimensions={["date"]}
            metrics={[
              { key: "activeUsers", label: "Active users" },
              { key: "screenPageViews", label: "Page views" },
            ]}
          />
          <div className={styles.breakdownGrid}>
            <ReportTable
              title="Top countries"
              rows={data.countries}
              dimensions={["country"]}
              metrics={[{ key: "activeUsers", label: "Active users" }]}
            />
            <ReportTable
              title="Top sources"
              rows={data.sources}
              dimensions={["sessionSourceMedium"]}
              metrics={[
                { key: "sessions", label: "Sessions" },
                { key: "engagementRate", label: "Engagement", percent: true },
              ]}
            />
            <ReportTable
              title="Devices and browsers"
              rows={data.devices}
              dimensions={["deviceCategory", "browser"]}
              metrics={[{ key: "activeUsers", label: "Active users" }]}
            />
          </div>
          <ReportTable
            title="Top events"
            rows={data.events}
            dimensions={["eventName"]}
            metrics={[{ key: "eventCount", label: "Event count" }]}
          />
          <p className={styles.small}>
            Country, source and device breakdowns show up to 10 rows; events
            show up to 20. Automatic file_download events and custom résumé
            events are separate measurements and should not be added together.
          </p>
        </>
      )}
    </div>
  );
}
