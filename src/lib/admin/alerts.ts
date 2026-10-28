import nodemailer from "nodemailer";
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
    process.env.SMTP_ALERT_DELIVERY_ENABLED === "true" &&
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview"
  );
}
export function smtpConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}
export function smtpFailure(error: unknown) {
  const e = error as { command?: string; code?: string };
  const safe = /^(EHLO|HELO|AUTH|STARTTLS|MAIL FROM|RCPT TO)$/i.test(
    e.command ?? "",
  );
  return {
    status: safe ? "failed" : "uncertain",
    retry: safe,
    detail: safe
      ? "SMTP did not accept the message. Check the sending account; a safe retry is scheduled."
      : "SMTP delivery could not be confirmed. It may have succeeded; no automatic resend.",
  } as const;
}
type Transport = {
  sendMail: (
    message: Record<string, unknown>,
  ) => Promise<{ accepted?: unknown[] }>;
};
export async function deliverAlert(
  db: SupabaseClient,
  job: AlertJob,
  transport: Transport,
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
    detail =
      "Google SMTP accepted the message. Inbox delivery is not confirmed.";
  try {
    const label = job.kind === "visitors" ? "visitors" : "résumé views";
    const result = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: job.email,
      messageId: `<portfolio-${job.id}@${process.env.SMTP_USER?.split("@")[1] ?? "localhost"}>`,
      subject: `Portfolio alert: ${job.threshold} ${label} reached`,
      text: `Your portfolio reached ${job.observed_count} ${label} in this ${job.period} window.\nThreshold: ${job.threshold}\nWindow begins: ${new Date(job.window_start).toISOString()} (UTC)\n\nBots and internal visits are excluded. Counts represent consented activity.\nOpen your portfolio admin panel to explore the details.`,
    });
    if (
      !result.accepted?.some(
        (value) => String(value).toLowerCase() === job.email.toLowerCase(),
      )
    ) {
      status = "failed";
      detail = "SMTP did not accept the recipient. No automatic retry.";
    }
  } catch (error) {
    const failure = smtpFailure(error);
    status = failure.status;
    retry = failure.retry;
    detail = failure.detail;
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
/** Adapts reference analyticsAlerts preferences/logging/cooldown behavior for Google SMTP. */
export async function processAnalyticsAlerts() {
  if (!emailDeliveryEnabled()) return { state: "disabled", processed: 0 };
  if (!smtpConfigured()) return { state: "unconfigured", processed: 0 };
  const db = analyticsDatabase();
  if (!db) return { state: "unconfigured", processed: 0 };
  const { data, error } = await db.rpc("claim_analytics_alerts", {
    p_now: new Date().toISOString(),
  });
  if (error) return { state: "unavailable", processed: 0 };
  const jobs = (data ?? []) as AlertJob[];
  if (!jobs.length) return { state: "ready", processed: 0 };
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ""),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  let processed = 0;
  try {
    for (const job of jobs) {
      try {
        await deliverAlert(db, job, transport);
        processed++;
      } catch {
        /* Lease becomes uncertain if a recorded send cannot be finalized. */
      }
    }
  } finally {
    transport.close();
  }
  return { state: "ready", processed };
}
