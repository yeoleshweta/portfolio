# Analytics activation

The application implements a separate Supabase analytics store; it does not connect to the reference portfolio's Convex deployment or import historical GA4 records.

1. Add the variables in `.env.local.example` to `.env.local` locally. Never send or commit service-role keys. Supabase's newer publishable key can be used as `NEXT_PUBLIC_SUPABASE_ANON_KEY`; a secret key can be used as `SUPABASE_SERVICE_ROLE_KEY`.
2. Run the complete `supabase/setup-analytics.sql` script (or apply all numbered files in `supabase/migrations/` in order) to the intended Supabase project using its SQL editor or the Supabase CLI migration workflow. It creates only analytics-prefixed tables/functions. RLS denies browser access; RPCs are restricted to service_role.
3. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` and restart/rebuild the application. Keep it disabled in previews unless collecting preview analytics is intentional.
4. Set `SITE_URL` to the deployed canonical origin. The collector accepts only same-origin JSON batches. With a reverse proxy, ensure it replaces untrusted forwarded IP headers. Raw IP addresses are not persisted; a daily HMAC rate-limit key is stored for at most an hour once pruning runs.
5. Add an administrator to Supabase Authentication, set a password, and put that verified email in `ADMIN_EMAILS`. Disable public signups in the Supabase dashboard. No registration UI is provided.
6. Set a random `CRON_SECRET` in the hosting environment. `vercel.json` schedules daily pruning at 06:00 UTC. On other hosts, call GET `/api/cron/analytics` daily with `Authorization: Bearer <CRON_SECRET>`. This deletes events and visits older than 400 days and old rate-limit buckets.
7. Verify on the live deployment: no collection before consent; accept and navigate through a case study; open the resume viewer; click download; inspect the resulting visit in `/admin`. Decline must stop future collection and clear local identifiers/queue. Historical records are not deleted by opting out.

Local SQL tests use PGlite, an actual PostgreSQL engine, not a mock Supabase response. They verify migrations, deduplication, filters, grants, rate limits and retention. Hosted Supabase Auth, network access, scheduled execution and production collection require separate live verification.

Reference reuse: `classifyUserAgent` is adapted from the reference's `convex/analyticsHelpers.ts`. Visitor heartbeats, admin date ranges/comparisons, journeys, bot/internal exclusions and exports follow the reference implementation. Convex-specific storage/auth cannot be copied into Supabase unchanged. Email thresholds and GA reports require the expansion setup and server credentials described in ANALYTICS.md. Klyro conversation ingestion is not connected.
