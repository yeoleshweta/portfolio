import { afterEach, expect, test, vi } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  deliverAlert,
  smtpFailure,
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
test("SMTP failures before message submission may retry; ambiguous DATA failures do not", () => {
  expect(smtpFailure({ command: "AUTH", code: "EAUTH" })).toMatchObject({
    status: "failed",
    retry: true,
  });
  expect(smtpFailure({ command: "CONN", code: "ETIMEDOUT" })).toMatchObject({
    status: "uncertain",
    retry: false,
  });
  expect(smtpFailure({ command: "DATA", code: "ETIMEDOUT" })).toMatchObject({
    status: "uncertain",
    retry: false,
  });
});
test("a valid durable claim sends to the allowlisted admin and records SMTP acceptance", async () => {
  vi.stubEnv("ADMIN_EMAILS", job.email);
  vi.stubEnv("SMTP_USER", "sender@example.test");
  const rpc = vi.fn(async () => ({ data: true, error: null }));
  const sendMail = vi.fn(async () => ({ accepted: [job.email] }));
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, { sendMail });
  expect(sendMail).toHaveBeenCalledTimes(1);
  expect(sendMail.mock.calls[0][0]).toMatchObject({
    to: job.email,
    from: "sender@example.test",
  });
  expect(rpc).toHaveBeenLastCalledWith(
    "finish_analytics_alert",
    expect.objectContaining({ p_status: "sent", p_retry: false }),
  );
});
test("revoked admins and lost claims cannot send email", async () => {
  const rpc = vi.fn(async () => ({ data: false, error: null }));
  const sendMail = vi.fn(async () => ({ accepted: [] }));
  vi.stubEnv("ADMIN_EMAILS", "other@example.test");
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, { sendMail });
  expect(sendMail).not.toHaveBeenCalled();
  vi.stubEnv("ADMIN_EMAILS", job.email);
  await deliverAlert({ rpc } as unknown as SupabaseClient, job, { sendMail });
  expect(sendMail).not.toHaveBeenCalled();
});

test("development, tests and previews cannot claim or deliver live email", async () => {
  const { emailDeliveryEnabled, processAnalyticsAlerts } = await import(
    "../../src/lib/admin/alerts"
  );
  vi.stubEnv("SMTP_USER", "sender@example.test");
  vi.stubEnv("SMTP_PASSWORD", "not-a-real-password");
  vi.stubEnv("SMTP_ALERT_DELIVERY_ENABLED", "true");
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
