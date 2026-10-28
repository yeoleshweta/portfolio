export type SeriesPoint = {
  bucket: string;
  views: number;
  visits: number;
  resumeViews: number;
  resumeDownloads: number;
  resumeShares: number;
};
export function fillSeries(
  rows: Partial<SeriesPoint>[],
  from: string,
  to: string,
): SeriesPoint[] {
  const start = Date.parse(from),
    end = Date.parse(to);
  const step = end - start <= 2 * 86400000 ? 3600000 : 86400000;
  const byTime = new Map(
    rows.map((row) => [Math.floor(Date.parse(row.bucket!) / step) * step, row]),
  );
  const result: SeriesPoint[] = [];
  for (let t = Math.floor(start / step) * step; t < end; t += step) {
    const row = byTime.get(t);
    result.push({
      bucket: new Date(t).toISOString(),
      views: Number(row?.views ?? 0),
      visits: Number(row?.visits ?? 0),
      resumeViews: Number(row?.resumeViews ?? 0),
      resumeDownloads: Number(row?.resumeDownloads ?? 0),
      resumeShares: Number(row?.resumeShares ?? 0),
    });
  }
  return result;
}
