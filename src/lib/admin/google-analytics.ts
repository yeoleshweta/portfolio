import { GoogleAuth } from "google-auth-library";
import { createHash } from "node:crypto";
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
type RawReport = {
  dimensionHeaders?: { name: string }[];
  metricHeaders?: { name: string }[];
  rows?: {
    dimensionValues?: { value?: string }[];
    metricValues?: { value?: string }[];
  }[];
  rowCount?: number;
  metadata?: {
    timeZone?: string;
    subjectToThresholding?: boolean;
    dataLossFromOtherRow?: boolean;
    samplingMetadatas?: unknown[];
  };
};
export type GARow = {
  dimensions: Record<string, string>;
  metrics: Record<string, number>;
};
export type GAResult = {
  configured: true;
  fetchedAt: string;
  timezone: string;
  thresholded: boolean;
  sampled: boolean;
  otherRowLoss: boolean;
  totals: Record<string, number>;
  daily: GARow[];
  countries: GARow[];
  sources: GARow[];
  events: GARow[];
  devices: GARow[];
  activeUsers30m: number | null;
  warnings: string[];
};
export function gaConfigured() {
  return (
    /^\d{1,20}$/.test(process.env.GA_PROPERTY_ID ?? "") &&
    Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  );
}
function rows(report: RawReport | undefined): GARow[] {
  return (report?.rows ?? []).map((row) => ({
    dimensions: Object.fromEntries(
      (report?.dimensionHeaders ?? []).map((h, i) => [
        h.name,
        row.dimensionValues?.[i]?.value ?? "(not set)",
      ]),
    ),
    metrics: Object.fromEntries(
      (report?.metricHeaders ?? []).map((h, i) => [
        h.name,
        Number(row.metricValues?.[i]?.value ?? 0),
      ]),
    ),
  }));
}
let auth: { key: string; client: GoogleAuth } | undefined;
async function accessToken() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "";
  const key = createHash("sha256").update(raw).digest("hex");
  if (!auth || auth.key !== key) {
    let credentials;
    try {
      credentials = JSON.parse(raw);
      if (typeof credentials === "string")
        credentials = JSON.parse(credentials);
    } catch {
      throw Error("Google service-account JSON is invalid.");
    }
    if (
      typeof credentials.client_email !== "string" ||
      typeof credentials.private_key !== "string"
    )
      throw Error("Google service-account credentials are incomplete.");
    auth = {
      key,
      client: new GoogleAuth({
        credentials: {
          client_email: credentials.client_email,
          private_key: credentials.private_key,
        },
        scopes: [SCOPE],
      }),
    };
  }
  try {
    const token = await auth.client.getAccessToken();
    if (!token) throw Error();
    return token;
  } catch {
    throw Error(
      "Google authentication failed. Check the service-account credential.",
    );
  }
}
export async function fetchGoogleAnalytics(
  from: string,
  to: string,
  options: { request?: typeof fetch; token?: () => Promise<string> } = {},
): Promise<GAResult> {
  if (!gaConfigured())
    throw Error("Google Analytics report access is not configured.");
  const token = await (options.token ?? accessToken)();
  const request = options.request ?? fetch;
  const root = `https://analyticsdata.googleapis.com/v1beta/properties/${process.env.GA_PROPERTY_ID}`;
  const post = async (method: string, body: unknown) => {
    const response = await request(`${root}:${method}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
    if (!response.ok)
      throw Error(
        response.status === 403
          ? "Google denied report access. Enable the Analytics Data API and grant this service account Viewer access to the property."
          : response.status === 429
            ? "Google Analytics quota was reached. Try again later."
            : `Google Analytics request failed (${response.status}).`,
      );
    return response.json();
  };
  const spec = (dimensions: string[], metrics: string[], limit: number) => ({
    dateRanges: [{ startDate: from, endDate: to }],
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    limit,
    orderBys: [
      dimensions[0] === "date"
        ? { dimension: { dimensionName: "date" } }
        : { metric: { metricName: metrics[0] }, desc: true },
    ],
  });
  const results = await Promise.allSettled([
    post("batchRunReports", {
      requests: [
        spec(
          [],
          [
            "totalUsers",
            "activeUsers",
            "sessions",
            "screenPageViews",
            "engagedSessions",
            "engagementRate",
            "averageSessionDuration",
          ],
          1,
        ),
        spec(["date"], ["activeUsers", "screenPageViews"], 400),
        spec(["country"], ["activeUsers"], 10),
        spec(["sessionSourceMedium"], ["sessions", "engagementRate"], 10),
        spec(["eventName"], ["eventCount"], 20),
      ],
    }),
    post("runReport", spec(["deviceCategory", "browser"], ["activeUsers"], 10)),
    post("runRealtimeReport", {
      metrics: [{ name: "activeUsers" }],
      minuteRanges: [{ startMinutesAgo: 29, endMinutesAgo: 0 }],
    }),
  ]);
  const batch = results[0];
  if (batch.status === "rejected") throw batch.reason;
  const reports = (batch.value.reports ?? []) as RawReport[];
  if (reports.length !== 5)
    throw Error("Google returned an incomplete report.");
  const device =
    results[1].status === "fulfilled"
      ? (results[1].value as RawReport)
      : undefined;
  const realtime =
    results[2].status === "fulfilled"
      ? (results[2].value as RawReport)
      : undefined;
  const all = [...reports, device, realtime].filter(Boolean) as RawReport[];
  return {
    configured: true,
    fetchedAt: new Date().toISOString(),
    timezone: reports[0].metadata?.timeZone ?? "Property timezone",
    thresholded: all.some((r) => r.metadata?.subjectToThresholding),
    sampled: all.some((r) => r.metadata?.samplingMetadatas?.length),
    otherRowLoss: all.some((r) => r.metadata?.dataLossFromOtherRow),
    totals: rows(reports[0])[0]?.metrics ?? {},
    daily: rows(reports[1]),
    countries: rows(reports[2]),
    sources: rows(reports[3]),
    events: rows(reports[4]),
    devices: rows(device),
    activeUsers30m: realtime
      ? (rows(realtime)[0]?.metrics.activeUsers ?? 0)
      : null,
    warnings: [
      ...(device ? [] : ["Device report is temporarily unavailable."]),
      ...(realtime ? [] : ["Realtime report is temporarily unavailable."]),
    ],
  };
}
const cache = new Map<string, { expires: number; data: GAResult }>();
export async function cachedGoogleAnalytics(from: string, to: string) {
  const key = createHash("sha256")
    .update(
      `${process.env.GA_PROPERTY_ID}:${process.env.GOOGLE_SERVICE_ACCOUNT_JSON}:${from}:${to}`,
    )
    .digest("hex");
  const item = cache.get(key);
  if (item && item.expires > Date.now()) return item.data;
  const data = await fetchGoogleAnalytics(from, to);
  if (cache.size >= 20) cache.delete(cache.keys().next().value!);
  cache.set(key, { expires: Date.now() + 300000, data });
  return data;
}
