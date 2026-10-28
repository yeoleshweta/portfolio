export type AlertPeriod = "hour" | "day" | "week";
export type AlertSettings = {
  enabled: boolean;
  period: AlertPeriod;
  visitors: number | null;
  resumeViews: number | null;
};
export function parseAlertSettings(input: unknown): AlertSettings {
  if (!input || typeof input !== "object")
    throw Error("Invalid alert settings");
  const d = input as Record<string, unknown>;
  if (
    typeof d.enabled !== "boolean" ||
    !["hour", "day", "week"].includes(String(d.period))
  )
    throw Error("Choose an hourly, daily or weekly window.");
  const threshold = (value: unknown) => {
    if (value === null || value === undefined || value === "") return null;
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 1000000
    )
      throw Error("Thresholds must be whole numbers from 1 to 1,000,000.");
    return value;
  };
  const visitors = threshold(d.visitors),
    resumeViews = threshold(d.resumeViews);
  if (d.enabled && visitors === null && resumeViews === null)
    throw Error("Set at least one threshold.");
  return {
    enabled: d.enabled,
    period: d.period as AlertPeriod,
    visitors,
    resumeViews,
  };
}
export function alertWindow(now: Date, period: AlertPeriod) {
  const d = new Date(now);
  d.setUTCMinutes(0, 0, 0);
  if (period !== "hour") d.setUTCHours(0);
  if (period === "week")
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d;
}
