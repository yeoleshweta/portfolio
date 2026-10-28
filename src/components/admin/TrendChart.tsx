import styles from "./admin.module.css";
/** Adapted from the reference AdminDashboard.TrendChart; show page views only. */
export default function TrendChart({
  points,
}: {
  points: { bucket: string; views: number; visits: number }[];
}) {
  const max = Math.max(1, ...points.map((point) => point.views));
  return (
    <>
      <div
        className={styles.chart}
        role="img"
        aria-label={`Page views over time. ${points.reduce((sum, p) => sum + p.views, 0)} views across ${points.length} active time buckets.`}
      >
        {points.map((point) => (
          <div
            key={point.bucket}
            className={styles.barSlot}
            title={`${new Date(point.bucket).toLocaleString()}: ${point.views} page views`}
          >
            <div
              className={styles.bar}
              style={{
                transform: `scaleY(${Math.max(point.views ? 0.02 : 0, point.views / max)})`,
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.chartLabels}>
        <span>
          {points[0]
            ? new Date(points[0].bucket).toLocaleDateString()
            : "No visits in this range"}
        </span>
        <span>
          {points.at(-1)
            ? new Date(points.at(-1)!.bucket).toLocaleDateString()
            : ""}
        </span>
      </div>
      <details className={styles.chartData}>
        <summary>View chart data</summary>
        <table>
          <caption>Page views and active visits by UTC bucket</caption>
          <thead>
            <tr>
              <th scope="col">UTC time</th>
              <th scope="col">Page views</th>
              <th scope="col">Visits with events</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.bucket}>
                <th scope="row">
                  {new Date(p.bucket)
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " ")}
                </th>
                <td>{p.views}</td>
                <td>{p.visits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </>
  );
}
