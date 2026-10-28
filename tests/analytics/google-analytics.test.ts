import { afterEach, expect, test, vi } from "vitest";
import {
  fetchGoogleAnalytics,
  gaConfigured,
} from "../../src/lib/admin/google-analytics";
afterEach(() => vi.unstubAllEnvs());
test("the public GA measurement tag alone does not authorize report access", () => {
  vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST");
  vi.stubEnv("GA_PROPERTY_ID", "");
  vi.stubEnv("GOOGLE_SERVICE_ACCOUNT_JSON", "");
  expect(gaConfigured()).toBe(false);
});
test("GA reports use read-only server access and preserve Google thresholds and timezone metadata", async () => {
  vi.stubEnv("GA_PROPERTY_ID", "123456789");
  vi.stubEnv(
    "GOOGLE_SERVICE_ACCOUNT_JSON",
    '{"client_email":"test@example.test","private_key":"test-key"}',
  );
  const report = {
    metricHeaders: [{ name: "totalUsers" }],
    rows: [{ metricValues: [{ value: "7" }] }],
    metadata: { timeZone: "America/New_York", subjectToThresholding: true },
  };
  const request = vi.fn(
    async (url: string | URL | Request, init?: RequestInit) => {
      if (String(url).endsWith("batchRunReports"))
        return Response.json({
          reports: [
            report,
            {
              ...report,
              dimensionHeaders: [{ name: "date" }],
              rows: [
                {
                  dimensionValues: [{ value: "20261027" }],
                  metricValues: [{ value: "7" }],
                },
              ],
            },
            report,
            report,
            report,
          ],
        });
      return Response.json({
        ...report,
        dimensionHeaders: [{ name: "deviceCategory" }],
        rows: [
          {
            dimensionValues: [{ value: "desktop" }],
            metricValues: [{ value: "7" }],
          },
        ],
      });
    },
  );
  const data = await fetchGoogleAnalytics("2026-10-01", "2026-10-27", {
    token: async () => "test-token",
    request: request as typeof fetch,
  });
  expect(data.totals.totalUsers).toBe(7);
  expect(data.timezone).toBe("America/New_York");
  expect(data.thresholded).toBe(true);
  for (const call of request.mock.calls) {
    expect(String(call[0])).toContain(
      "analyticsdata.googleapis.com/v1beta/properties/123456789:",
    );
    expect(call[1]?.headers).toMatchObject({
      Authorization: "Bearer test-token",
    });
  }
});
