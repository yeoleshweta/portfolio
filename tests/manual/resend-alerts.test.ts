import { test, expect } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { readFileSync, readdirSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { deliverAlert, type AlertJob } from "../../src/lib/admin/alerts";

// Explicit opt-in: sends TWO labelled test emails; never runs in normal test scripts.
test.skipIf(process.env.RUN_LIVE_ALERT_TEST !== "true")("real Resend accepts visitor and resume threshold alerts from isolated SQL", async () => {
  process.loadEnvFile(".env.local");
  const hosted = createClient(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim().toLowerCase());
  const { data, error } = await hosted.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw Error("Could not verify the configured admin recipient");
  const admin = data.users.find((u) => u.email && u.email_confirmed_at && allowed.includes(u.email.toLowerCase()));
  if (!admin?.email) throw Error("A verified allowlisted admin recipient is required");
  expect(Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)).toBe(true);
  const db = new PGlite();
  const receipts: string[] = [];
  const rpc = async (name: string, args: Record<string, unknown>) => {
    const calls: Record<string, { sql: string; values: unknown[] }> = {
      start_analytics_alert: { sql: "SELECT public.start_analytics_alert($1,$2) AS value", values: [args.p_id, args.p_token] },
      finish_analytics_alert: { sql: "SELECT public.finish_analytics_alert($1,$2,$3,$4,$5) AS value", values: [args.p_id, args.p_token, args.p_status, args.p_detail, args.p_retry] },
    };
    const call = calls[name];
    if (!call) throw Error("Unexpected test RPC");
    const result = await db.query<{value: unknown}>(call.sql, call.values);
    return { data: result.rows[0].value, error: null };
  };
  const request: typeof fetch = async (url, init) => {
    const body = JSON.parse(init!.body as string);
    body.subject = `[TEST] ${body.subject}`;
    body.text = `TEST ALERT — synthetic activity in an isolated database. Your live analytics and alert settings were not changed.\n\n${body.text}`;
    const response = await fetch(url, { ...init, body: JSON.stringify(body) });
    const receipt = await response.clone().json().catch(() => ({}));
    console.log(`Resend test request: HTTP ${response.status}${response.ok ? "" : ` (${receipt.name || "request rejected"}): ${receipt.message || "No provider detail"}`}`);
    if (response.ok && receipt.id) receipts.push(receipt.id);
    return response;
  };
  const claim = async () => (await db.query<{jobs: AlertJob[]}>("SELECT public.claim_analytics_alerts(now()) AS jobs")).rows[0].jobs;
  const record = async (name: string, bot = false, internal = false) => {
    const visit = crypto.randomUUID();
    await db.query("SELECT public.ingest_analytics($1::jsonb,$2,$3::jsonb)", [JSON.stringify({ browserId: crypto.randomUUID(), visitId: visit, path: "/resume", events: [{id: crypto.randomUUID(), name, path: "/resume", params: {location: "test"}}] }), "manual-isolated-fixture", JSON.stringify({ device: "Desktop", browser: "Chrome", os: "macOS", isBot: bot })]);
    if (internal) await db.query("UPDATE public.analytics_visits SET is_internal=true WHERE id=$1", [visit]);
  };
  try {
    await db.exec("CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;");
    for (const file of readdirSync("supabase/migrations").sort()) await db.exec(readFileSync(`supabase/migrations/${file}`, "utf8"));
    await db.query("SELECT public.save_analytics_alert_settings($1,$2,true,'day',2,2)", [admin.id, admin.email]);
    await record("resume_viewed", true);
    await record("resume_viewed", false, true);
    await record("page_view");
    expect(await claim()).toHaveLength(0);
    await record("page_view");
    const visitors = await claim();
    expect(visitors).toHaveLength(1);
    expect(visitors[0]).toMatchObject({ kind: "visitors", observed_count: 2, threshold: 2 });
    await deliverAlert({ rpc } as unknown as SupabaseClient, visitors[0], request);
    expect(await claim()).toHaveLength(0);
    await record("resume_viewed");
    expect(await claim()).toHaveLength(0);
    await record("resume_viewed");
    const resumes = await claim();
    expect(resumes).toHaveLength(1);
    expect(resumes[0]).toMatchObject({ kind: "resume_views", observed_count: 2, threshold: 2 });
    await new Promise((resolve) => setTimeout(resolve, 1100));
    await deliverAlert({ rpc } as unknown as SupabaseClient, resumes[0], request);
    expect(await claim()).toHaveLength(0);
    const statuses = await db.query<{kind: string; status: string}>("SELECT kind,status FROM public.analytics_alert_deliveries ORDER BY kind");
    expect(statuses.rows).toEqual([{kind: "resume_views", status: "sent"}, {kind: "visitors", status: "sent"}]);
    expect(receipts).toHaveLength(2);
    for (const id of receipts) {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      const response = await fetch(`https://api.resend.com/emails/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }, signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      console.log(`Resend delivery receipt: ${response.ok ? result.last_event || "accepted" : "read access unavailable; send acceptance verified"}`);
    }
    console.log("Verified: both thresholds, below-threshold suppression, bot/internal exclusions, send acceptance and duplicate suppression. Hosted data unchanged.");
  } finally { await db.close(); }
}, 60000);
