import { expect, test } from "vitest";
import { fillSeries } from "../../src/lib/admin/chart";
import {
  parseAlertSettings,
  alertWindow,
} from "../../src/lib/admin/alerts-contract";
test("charts retain zero-traffic dates and resume shares without collapsing gaps", () => {
  const rows = fillSeries(
    [
      {
        bucket: "2026-10-02T00:00:00Z",
        views: 3,
        visits: 2,
        resumeViews: 1,
        resumeDownloads: 1,
        resumeShares: 1,
      },
    ],
    "2026-10-01T00:00:00Z",
    "2026-10-04T00:00:00Z",
  );
  expect(rows).toHaveLength(3);
  expect(rows[0].views).toBe(0);
  expect(rows[1].resumeShares).toBe(1);
  expect(rows[2].views).toBe(0);
});
test("alert windows and thresholds are explicit and bounded", () => {
  expect(
    alertWindow(new Date("2026-10-27T23:20:00Z"), "day").toISOString(),
  ).toBe("2026-10-27T00:00:00.000Z");
  expect(
    alertWindow(new Date("2026-10-27T23:20:00Z"), "week").toISOString(),
  ).toBe("2026-10-26T00:00:00.000Z");
  expect(
    parseAlertSettings({
      enabled: true,
      period: "day",
      visitors: 25,
      resumeViews: null,
    }),
  ).toEqual({ enabled: true, period: "day", visitors: 25, resumeViews: null });
  for (const value of [
    { enabled: true, period: "month", visitors: 2 },
    { enabled: true, period: "day", visitors: 0 },
    { enabled: true, period: "day", visitors: 1.5 },
    { enabled: true, period: "day", visitors: null, resumeViews: null },
  ])
    expect(() => parseAlertSettings(value)).toThrow();
});
