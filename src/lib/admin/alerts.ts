import type { SupabaseClient } from "@supabase/supabase-js";
import { analyticsDatabase } from "../analytics/server";
export type AlertJob = {
  id: string;
  claim_token: string;
  email: string;
  kind: "visitors" | "resume_views";
  period: string;
  window_start: string;
  observed_count: number;
  threshold: number;
};
export function emailDeliveryEnabled() {
  return (
    process.env.ALERT_DELIVERY_ENABLED === "true" &&
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview"
  );
}
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}
export async function deliverAlert(
  db: SupabaseClient,
  job: AlertJob,
  request: typeof fetch = fetch,
) {
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase());
  if (!allowed.includes(job.email.toLowerCase())) {
    await db.rpc("finish_analytics_alert", {
      p_id: job.id,
      p_token: job.claim_token,
      p_status: "failed",
      p_detail: "Recipient is no longer an approved administrator.",
      p_retry: false,
    });
    return;
  }
  const { data: started, error } = await db.rpc("start_analytics_alert", {
    p_id: job.id,
    p_token: job.claim_token,
  });
  if (error || !started) return;
  let status: "sent" | "failed" | "uncertain" = "sent",
    retry = false,
    detail = "Resend accepted the message. Inbox delivery is not confirmed.";
  try {
    const label = job.kind === "visitors" ? "visitors" : "résumé views";
    const result = await request("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-alert/${job.id}`,
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [job.email],
        subject: `Portfolio alert: ${job.threshold} ${label} reached`,
        text: `Your portfolio reached ${job.observed_count} ${label} in this ${job.period} window.\nThreshold: ${job.threshold}\nWindow begins: ${new Date(job.window_start).toISOString()} (UTC)\n\nBots and internal visits are excluded. Counts represent consented activity.\nOpen your portfolio admin panel to explore the details.`,
      }),
    });
    if (!result.ok) {
      status = result.status >= 500 ? "uncertain" : "failed";
      retry = result.status === 429;
      detail = retry
        ? "Resend rate limited the request; a safe retry is scheduled."
        : status === "uncertain"
          ? "Resend acceptance could not be confirmed; no automatic resend."
          : "Resend rejected the request. Check the API key and verified sender; no automatic retry.";
    } else {
      const receipt = await result.json();
      if (typeof receipt?.id !== "string" || !receipt.id)
        throw Error("Missing receipt");
    }
  } catch {
    status = "uncertain";
    retry = false;
    detail = "Resend acceptance could not be confirmed. It may have succeeded; no automatic resend.";
  }
  const { error: finishError } = await db.rpc("finish_analytics_alert", {
    p_id: job.id,
    p_token: job.claim_token,
    p_status: status,
    p_detail: detail,
    p_retry: retry,
  });
  if (finishError) throw Error("Unable to record delivery status");
}
/** Adapts reference analyticsAlerts preferences/logging/cooldown behavior for Resend. */
export async function processAnalyticsAlerts() {
  if (!emailDeliveryEnabled()) return { state: "disabled", processed: 0 };
  if (!emailConfigured()) return { state: "unconfigured", processed: 0 };
  const db = analyticsDatabase();
  if (!db) return { state: "unconfigured", processed: 0 };
  const { data, error } = await db.rpc("claim_analytics_alerts", {
    p_now: new Date().toISOString(),
  });
  if (error) return { state: "unavailable", processed: 0 };
  const jobs = (data ?? []) as AlertJob[];
  if (!jobs.length) return { state: "ready", processed: 0 };
  let processed = 0;
  for (const job of jobs) {
    try {
      await deliverAlert(db, job);
      processed++;
    } catch {
      /* Lease becomes uncertain if a recorded send cannot be finalized. */
    }
  }
  return { state: "ready", processed };
}
