import { afterEach, expect, test, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  deliverAlert,
  type AlertJob,
} from "../../src/lib/admin/alerts";
afterEach(() => vi.unstubAllEnvs());
const job: AlertJob = {
  id: "33333333-3333-4333-8333-333333333333",
  claim_token: "44444444-4444-4444-8444-444444444444",
  email: "admin@example.test",
  kind: "resume_views",
  period: "day",
  window_start: "2026-10-27T00:00:00Z",
  observed_count: 10,
  threshold: 10,
};
test("a valid durable claim sends to the allowlisted admin and records Resend acceptance", async () => {
  vi.stubEnv("ADMIN_EMAILS", job.email);
  vi.stubEnv("RESEND_FROM_EMAIL", "sender@example.test");
  const rpc = vi.fn(async () => ({ data: true, error: null }));
  const request = vi.fn<typeof fetch>(async () => Response.json({ id: "email-id" }));
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, request);
  expect(request).toHaveBeenCalledTimes(1);
  expect(request.mock.calls[0][0]).toBe("https://api.resend.com/emails");
  const options = request.mock.calls[0][1]!;
  expect(options.headers).toMatchObject({ "Idempotency-Key": `portfolio-alert/${job.id}` });
  expect(JSON.parse(options.body as string)).toMatchObject({ to: [job.email], from: "sender@example.test" });
  expect(rpc).toHaveBeenLastCalledWith(
    "finish_analytics_alert",
    expect.objectContaining({ p_status: "sent", p_retry: false }),
  );
});
test("revoked admins and lost claims cannot send email", async () => {
  const rpc = vi.fn(async () => ({ data: false, error: null }));
  const request = vi.fn<typeof fetch>();
  vi.stubEnv("ADMIN_EMAILS", "other@example.test");
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, request);
  expect(request).not.toHaveBeenCalled();
  vi.stubEnv("ADMIN_EMAILS", job.email);
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, request);
  expect(request).not.toHaveBeenCalled();
});

test("development, tests and previews cannot claim or deliver live email", async () => {
  const { emailDeliveryEnabled, processAnalyticsAlerts } = await import(
    "../../src/lib/admin/alerts"
  );
  vi.stubEnv("RESEND_FROM_EMAIL", "sender@example.test");
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("ALERT_DELIVERY_ENABLED", "true");
  for (const environment of ["development", "test"]) {
    vi.stubEnv("NODE_ENV", environment);
    expect(emailDeliveryEnabled()).toBe(false);
    expect(await processAnalyticsAlerts()).toEqual({
      state: "disabled",
      processed: 0,
    });
  }
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL_ENV", "preview");
  expect(emailDeliveryEnabled()).toBe(false);
  vi.stubEnv("VERCEL_ENV", "production");
  expect(emailDeliveryEnabled()).toBe(true);
});

test.each([429, 401, 500])("Resend HTTP %i records a bounded safe outcome", async (status) => {
  vi.stubEnv("ADMIN_EMAILS", job.email);
  const rpc = vi.fn(async () => ({ data: true, error: null }));
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, async () => new Response(null, { status }));
  expect(rpc).toHaveBeenLastCalledWith("finish_analytics_alert", expect.objectContaining({
    p_status: status >= 500 ? "uncertain" : "failed", p_retry: status === 429,
  }));
});
test("ambiguous network failures do not automatically resend", async () => {
  vi.stubEnv("ADMIN_EMAILS", job.email);
  const rpc = vi.fn(async () => ({ data: true, error: null }));
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, async () => { throw Error("secret server response"); });
  expect(rpc).toHaveBeenLastCalledWith("finish_analytics_alert", expect.objectContaining({p_status: "uncertain", p_retry: false}));
  expect(JSON.stringify(rpc.mock.calls)).not.toContain("secret server response");
});
