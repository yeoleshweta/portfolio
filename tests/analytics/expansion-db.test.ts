import { beforeAll, afterAll, expect, test } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { readFileSync, readdirSync } from "node:fs";
let db: PGlite;
const owner = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
beforeAll(async () => {
  db = new PGlite();
  await db.exec(
    "CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role;",
  );
  for (const f of readdirSync("supabase/migrations").sort())
    await db.exec(readFileSync(`supabase/migrations/${f}`, "utf8"));
}, 30000);
afterAll(async () => {
  await db?.close();
});
async function record(
  name: string,
  bot = false,
  internal = false,
  browser = crypto.randomUUID(),
) {
  const visit = crypto.randomUUID();
  await db.query("SELECT public.ingest_analytics($1::jsonb,$2,$3::jsonb)", [
    JSON.stringify({
      browserId: browser,
      visitId: visit,
      path: "/resume",
      events: [
        {
          id: crypto.randomUUID(),
          name,
          path: "/resume",
          params: { location: "hero" },
        },
      ],
    }),
    "fixture",
    JSON.stringify({
      device: "Desktop",
      browser: "Chrome",
      os: "macOS",
      isBot: bot,
    }),
  ]);
  if (internal)
    await db.query(
      "UPDATE public.analytics_visits SET is_internal=true WHERE id=$1",
      [visit],
    );
  return visit;
}
test("enhanced reports include shares, resume series, funnel and returning browsers", async () => {
  const browser = crypto.randomUUID();
  const visit = await record("resume_shared", false, false, browser);
  await record("resume_viewed");
  await db.query(
    "UPDATE public.analytics_visits SET first_seen_at=now()-interval '2 days' WHERE id=$1",
    [visit],
  );
  const { rows } = await db.query<{
    report: {
      totals: {
        resumeShares: number;
        returningVisitors: number;
        newVisitors: number;
      };
      series: { resumeShares: number }[];
      funnel: { shares: number };
    };
  }>(
    "SELECT public.analytics_report(now()-interval '1 day',now()+interval '1 minute',false,false) AS report",
  );
  expect(rows[0].report.totals).toMatchObject({
    resumeShares: 1,
    newVisitors: 1,
    returningVisitors: 1,
  });
  expect(rows[0].report.series[0].resumeShares).toBe(1);
  expect(rows[0].report.funnel.shares).toBe(1);
});

test("visitor and resume thresholds claim once per UTC window, excluding internal and bot traffic", async () => {
  await db.exec("DELETE FROM public.analytics_visits");
  await db.query(
    "SELECT public.save_analytics_alert_settings($1,$2,true,$3,$4,$5)",
    [owner, "admin@example.test", "day", 2, 2],
  );
  await record("resume_viewed", true);
  await record("resume_viewed", false, true);
  let jobs = await db.query<{ jobs: unknown[] }>(
    "SELECT public.claim_analytics_alerts(now()) AS jobs",
  );
  expect(jobs.rows[0].jobs).toHaveLength(0);
  await record("resume_viewed");
  await record("resume_viewed");
  jobs = await db.query("SELECT public.claim_analytics_alerts(now()) AS jobs");
  expect(jobs.rows[0].jobs).toHaveLength(2);
  const again = await db.query<{ jobs: unknown[] }>(
    "SELECT public.claim_analytics_alerts(now()) AS jobs",
  );
  expect(again.rows[0].jobs).toHaveLength(0);
});
test("expired sending leases become uncertain instead of generating duplicate Resend sends", async () => {
  await db.exec(
    "UPDATE public.analytics_alert_deliveries SET status='sending',locked_until=now()-interval '1 minute'",
  );
  const claim = await db.query<{ jobs: unknown[] }>(
    "SELECT public.claim_analytics_alerts(now()) AS jobs",
  );
  expect(claim.rows[0].jobs).toHaveLength(0);
  const rows = await db.query<{ status: string }>(
    "SELECT status FROM public.analytics_alert_deliveries",
  );
  expect(rows.rows.every((r) => r.status === "uncertain")).toBe(true);
});
test("alert preferences and delivery functions are inaccessible to public roles", async () => {
  for (const role of ["anon", "authenticated"]) {
    await db.exec(`SET ROLE ${role}`);
    try {
      await expect(
        db.query("SELECT * FROM public.analytics_alert_settings"),
      ).rejects.toThrow(/permission denied/);
      await expect(
        db.query("SELECT public.claim_analytics_alerts(now())"),
      ).rejects.toThrow(/permission denied/);
    } finally {
      await db.exec("RESET ROLE");
    }
  }
});

test("preference edits invalidate old claims and allow a newly reached threshold in the same window", async () => {
  await db.exec(
    "DELETE FROM public.analytics_alert_deliveries;DELETE FROM public.analytics_visits",
  );
  await record("resume_viewed");
  await record("resume_viewed");
  await db.query(
    "SELECT public.save_analytics_alert_settings($1,$2,true,$3,$4,$5)",
    [owner, "admin@example.test", "day", 2, 100],
  );
  const first = (
    await db.query<{
      jobs: { id: string; claim_token: string; kind: string }[];
    }>("SELECT public.claim_analytics_alerts(now()) AS jobs")
  ).rows[0].jobs[0];
  expect(first.kind).toBe("visitors");
  await db.query(
    "SELECT public.save_analytics_alert_settings($1,$2,true,$3,$4,$5)",
    [owner, "admin@example.test", "day", null, 100],
  );
  expect(
    (
      await db.query<{ started: boolean }>(
        "SELECT public.start_analytics_alert($1,$2) AS started",
        [first.id, first.claim_token],
      )
    ).rows[0].started,
  ).toBe(false);
  expect(
    (
      await db.query<{ jobs: unknown[] }>(
        "SELECT public.claim_analytics_alerts(now()) AS jobs",
      )
    ).rows[0].jobs,
  ).toHaveLength(0);
  await db.query(
    "SELECT public.save_analytics_alert_settings($1,$2,true,$3,$4,$5)",
    [owner, "admin@example.test", "day", 3, 100],
  );
  expect(
    (
      await db.query<{ jobs: unknown[] }>(
        "SELECT public.claim_analytics_alerts(now()) AS jobs",
      )
    ).rows[0].jobs,
  ).toHaveLength(0);
  await record("resume_viewed");
  const replacement = (
    await db.query<{
      jobs: { id: string; claim_token: string; threshold: number }[];
    }>("SELECT public.claim_analytics_alerts(now()) AS jobs")
  ).rows[0].jobs[0];
  expect(replacement.threshold).toBe(3);
  expect(replacement.claim_token).not.toBe(first.claim_token);
});

test("resume views count repeated opens while visitor thresholds count distinct browsers", async () => {
  await db.exec("DELETE FROM public.analytics_alert_settings; DELETE FROM public.analytics_visits;");
  await db.query("SELECT public.save_analytics_alert_settings($1,$2,true,'hour',2,2)", [owner, "admin@example.test"]);
  const browser = crypto.randomUUID();
  const claim = async () => (await db.query<{jobs: {id: string; claim_token: string; kind: string; observed_count: number}[]}>("SELECT public.claim_analytics_alerts(now()) AS jobs")).rows[0].jobs;
  await record("resume_viewed", false, false, browser);
  expect(await claim()).toHaveLength(0);
  await record("resume_viewed", false, false, browser);
  const resume = await claim();
  expect(resume).toHaveLength(1);
  expect(resume[0]).toMatchObject({kind: "resume_views", observed_count: 2});
  await db.query("SELECT public.start_analytics_alert($1,$2)", [resume[0].id, resume[0].claim_token]);
  await db.query("SELECT public.finish_analytics_alert($1,$2,'sent','Synthetic acceptance',false)", [resume[0].id, resume[0].claim_token]);
  await record("resume_shared", false, false, browser);
  await record("resume_downloaded", false, false, browser);
  expect(await claim()).toHaveLength(0);
  await record("page_view");
  const visitor = await claim();
  expect(visitor).toHaveLength(1);
  expect(visitor[0]).toMatchObject({kind: "visitors", observed_count: 2});
  expect(await claim()).toHaveLength(0);
});
