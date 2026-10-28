import { beforeAll, afterAll, expect, test } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
import { parseBatch } from '../../src/lib/analytics/contract';

const browser = '11111111-1111-4111-8111-111111111111';
const visit = '22222222-2222-4222-8222-222222222222';
const event = '33333333-3333-4333-8333-333333333333';
const batch = () => ({ browserId: browser, visitId: visit, path: '/work/abim', events: [{ id: event, name: 'case_study_view', path: '/work/abim', params: { project_slug: 'abim' } }] });
let db: PGlite;
beforeAll(async () => {
  db = new PGlite();
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;');
  await db.exec(readFileSync('supabase/migrations/202610270001_analytics.sql', 'utf8'));
}, 30000);
afterAll(async () => { await db?.close(); });

test('validates IDs, event allowlists and size; strips unknown metadata and URL queries', () => {
  expect(parseBatch(batch()).events[0].name).toBe('case_study_view');
  expect(() => parseBatch({ ...batch(), visitId: 'bad' })).toThrow();
  expect(() => parseBatch({ ...batch(), events: [{ ...batch().events[0], name: 'arbitrary' }] })).toThrow();
  expect(() => parseBatch({ ...batch(), events: Array(26).fill(batch().events[0]) })).toThrow();
  const clean = parseBatch({ ...batch(), path: '/?email=private', events: [{ ...batch().events[0], params: { project_slug: 'abim', password: 'never', email: 'private' } }] });
  expect(clean.path).toBe('/');
  expect(clean.events[0].params).toEqual({ project_slug: 'abim' });
  expect(() => parseBatch({ ...batch(), path: '/admin' })).toThrow();
});

async function ingest(data = batch(), key = 'test-source') {
  const clean = parseBatch(data);
  return db.query('SELECT public.ingest_analytics($1::jsonb, $2, $3::jsonb) AS result', [JSON.stringify(clean), key, JSON.stringify({device:'Desktop',browser:'Chrome',os:'macOS',isBot:false})]);
}

test('transactional retries deduplicate events and preserve visit first landing', async () => {
  await ingest(); await ingest();
  const rows = await db.query<{ count: number }>('SELECT count(*)::int AS count FROM public.analytics_events');
  expect(rows.rows[0].count).toBe(1);
  await ingest({ ...batch(), path: '/resume', events: [] });
  const visits = await db.query<{ landing_path: string; current_path: string }>('SELECT * FROM public.analytics_visits');
  expect(visits.rows[0].landing_path).toBe('/work/abim');
  expect(visits.rows[0].current_path).toBe('/resume');
});

test('reports count unique browser IDs independently of visits and filter bots consistently', async () => {
  const second = { ...batch(), visitId:'44444444-4444-4444-8444-444444444444', events:[{...batch().events[0], id:'55555555-5555-4555-8555-555555555555'}] };
  await ingest(second);
  await db.exec("UPDATE public.analytics_visits SET is_bot = true WHERE id = '44444444-4444-4444-8444-444444444444'");
  const query = async (bots: boolean) => (await db.query<{report: {totals:{visitors:number;visits:number;caseViews:number}} }>("SELECT public.analytics_report(now() - interval '1 day', now() + interval '1 minute', $1, false) AS report", [bots])).rows[0].report;
  expect((await query(false)).totals).toMatchObject({visitors:1,visits:1,caseViews:1});
  expect((await query(true)).totals).toMatchObject({visitors:1,visits:2,caseViews:2});
  const activity = await db.query<{result:{rows:unknown[];total:number}}>("SELECT public.analytics_activity(now() - interval '1 day', now() + interval '1 minute', false, false, 'events', 0, 50, '', null) AS result");
  expect(activity.rows[0].result.total).toBe(1);
});

test('anonymous and ordinary authenticated roles cannot read or ingest analytics', async () => {
  for (const role of ['anon','authenticated']) {
    await db.exec(`SET ROLE ${role}`);
    try {
      await expect(db.query('SELECT * FROM public.analytics_events')).rejects.toThrow(/permission denied/);
      await expect(db.query("SELECT public.ingest_analytics('{}', 'key', '{}')")).rejects.toThrow(/permission denied/);
      await expect(db.query("SELECT public.analytics_report(now(), now(), false, false)")).rejects.toThrow(/permission denied/);
    } finally { await db.exec('RESET ROLE'); }
  }
});

test('persistent source rate limits cannot be bypassed by new visit IDs', async () => {
  await db.query("INSERT INTO public.analytics_rate_limits(key, bucket, requests) VALUES ('limited', date_trunc('minute', now()), 120)");
  await expect(ingest(batch(), 'limited')).rejects.toThrow(/rate limit/);
});

test('retention removes old event and visit data, not just operational buckets', async () => {
  await db.exec("UPDATE public.analytics_events SET occurred_at = now() - interval '401 days'; UPDATE public.analytics_visits SET last_seen_at = now() - interval '401 days'");
  await db.query('SELECT public.prune_analytics()');
  const result = await db.query<{n:number}>('SELECT count(*)::int AS n FROM public.analytics_visits');
  expect(result.rows[0].n).toBe(0);
});
