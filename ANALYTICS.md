# Portfolio analytics and admin

The portfolio uses a consent-gated first-party collector backed by Supabase PostgreSQL. GA4 remains an optional secondary destination. The private dashboard is at `/admin`; sign-in uses Supabase Auth and a verified-email allowlist.

## What is implemented

- Anonymous browser identifiers and separate visits, renewed after 30 minutes without activity.
- Page views, project-card clicks, protected-gate/content events, case-study section reach, scroll depth, visible-time slices and milestones.
- On-site résumé views and separate download clicks, with originating placement.
- Email/phone contact intent, known social links, other outbound domains, navigation and carousel events.
- Live activity (seen within two minutes), date comparisons, case-study reports, audience breakdowns, searchable/paginated events and visits, visit timelines and CSV exports.
- Bot/internal filters, browser exclusion and marking a visit internal.
- RLS-protected tables, service-only SQL functions, bounded/validated ingestion, retry deduplication, persistent rate limits and a scheduled retention endpoint.

Google SMTP threshold alerts, aggregate GA geography and new/returning-browser reporting are included in the admin expansion below. Klyro transcripts, historical GA4 import into first-party records and a content-management editor remain separate work.

## Setup and activation

See [the setup guide](docs/analytics-setup.md). `supabase/setup-analytics.sql` combines both migrations into one transactional, rerunnable SQL Editor script. It preserves existing analytics data. The source migrations also work through a normal Supabase CLI workflow.

Required environment variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ANALYTICS_ENABLED=true` | Enable first-party collection; independent of GA4 |
| `SUPABASE_URL` | Server database API URL; falls back to the public URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only secret; never expose in a public variable |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Auth URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable/anon key for Auth |
| `ADMIN_EMAILS` | Comma-separated verified admin emails |
| `SITE_URL` | Exact canonical origin for collector requests; defaults to request origin locally |
| `CRON_SECRET` | Server-only bearer secret for scheduled cleanup |
| `NEXT_PUBLIC_GA_ID` | Optional GA4 measurement ID |
| `NEXT_PUBLIC_GA_DEBUG=true` | Optional developer event logging |

Create the administrator in Supabase Authentication and disable public signups. Use the existing password with `/admin/login`. The site offers no registration UI. Every reporting API checks the authenticated user with Supabase, verifies the email is confirmed, and checks the server allowlist. An ordinary Supabase account cannot read reports.

Add the variables separately to production hosting and rebuild. Local `.env.local` is ignored by Git and does not configure hosted deployments. Keep analytics disabled in preview environments unless preview tracking is intentional.

## Tracking architecture

`src/lib/analytics.ts` keeps the existing `EVENTS` registry and `track(name, params)` interface. Existing `data-track-*` attributes continue to work through `AnalyticsProvider`.

`src/lib/analytics/client.ts` adapts the reference portfolio's visitor/heartbeat pattern. Collection starts only after consent, uses a bounded in-memory queue, preserves event UUIDs on retries, and clears pending data/identifiers on opt-out. Storage failures fall back to in-memory identification. Visible tabs send a heartbeat every 30 seconds; batches flush every five seconds. Up to four attempts are made; events expire after 30 minutes and are never persisted as a browser behavior log.

`POST /api/analytics` accepts same-origin JSON only, limits the body to 32 KiB and a batch to 25 events, validates UUIDs/event names, allowlists metadata, strips URL queries, derives device/browser/bot dimensions and calls a service-only SQL function. The SQL transaction deduplicates event UUIDs and serializes per-visit writes. It limits a source key to 120 requests/minute and a visit to 240 recent events/minute. Public telemetry is still untrusted behavioral evidence, not authenticated proof of a real person.

Only approved UTM fields are retained. Referrers are stored as hostnames. Raw IP addresses, email addresses, passwords, full search parameters and user-entered form text are not analytics fields. The collector uses a daily HMAC of the trusted proxy source address for short-lived rate-limit buckets. Configure reverse proxies to replace untrusted forwarded IP headers.

## Consent and GA4

- No first-party identity or event collection before consent.
- The GA network library is loaded only after consent. Custom events use the same consent gate.
- Denial clears first-party identifiers/queue and disables GA measurement. The preference itself remains stored.
- Consent changes synchronize across tabs. Privacy settings are available in the public footer.
- Opting out stops future collection; it does not delete historical server records or erase cookies previously set by third parties.
- The root analytics provider is the page-view authority, including initial loads. `gtag` uses `send_page_view:false`. When retaining GA4, disable automatic history-based page views in the GA4 stream to avoid duplicate reporting there.
- Public presentation and tracking are excluded from `/admin`. Klyro is a separate existing integration; this consent control does not manage that vendor's storage or expose its conversations.

## Event semantics

| Event | Meaning |
| --- | --- |
| `page_view` | Page opened or client navigation after consent |
| `project_card_click` | Click on an instrumented project card |
| `case_study_view` | Case-study content opened; protected gate alone is excluded |
| `case_study_gate_view` / `case_study_unlock` | Gate shown / successful local unlock, without entered passwords |
| `case_study_section_view` | Section became active in the scroll spy, once per page instance/consent period |
| `case_study_complete` | Scroll reached 90%, not proof of reading |
| `scroll_depth` | 25/50/75/90% milestone |
| `page_engagement` | Foreground-time slice, including final partial intervals of at least one second |
| `engaged_time` | 30/60/180 seconds of accumulated visible time |
| `resume_viewed` | On-site viewer opened, or direct résumé PDF link clicked; not proof of PDF rendering/reading |
| `resume_downloaded` | Download action clicked, not confirmation the file was saved |
| `contact_click` | Email/phone intent, not proof of a sent message |
| `social_click` / `outbound_click` | Known social profile / other outbound hostname clicked |
| `nav_click` / `carousel_scroll` / `easter_egg_play` | Existing public interaction events |
| `consent_update` | A grant/change recorded after opt-in |

The old `cv_download` name remains in the contract for compatibility but current resume links use the new view/download events. GA Enhanced Measurement events are not copied into the custom backend.

## Reporting limits and retention

Dashboard date inputs represent inclusive UTC days. Event timestamps and receipt timestamps are separate; delayed retries remain attributable to their original date. Anonymous browser counts, visit counts, page views and intent counts are distinct. A browser is not a verified person; different devices cannot be joined.

Bot/internal filters apply to reports, lists, timelines and exports. The live panel is independent of the selected historical date range. Activity is paginated; CSV export is capped at 5,000 matching rows, announces truncation, and protects against spreadsheet formula injection. Reports use database aggregates rather than summing a capped sample of event rows.

`GET /api/cron/analytics` requires `Authorization: Bearer <CRON_SECRET>`. The Vercel schedule runs daily at 06:00 UTC after deployment. Other hosts need an equivalent scheduler. Pruning removes events and visits older than 400 days and rate-limit buckets older than one hour. Actual scheduled execution is a separate production verification step.

## Verification

```bash
npm run test:analytics
npx playwright test --config playwright.admin.config.ts
npx tsc --noEmit
npm run build
```

Browser integration tests use an isolated local PostgreSQL engine and a synthetic Auth adapter. No test fixture data is written into the live Supabase project. They run on ports 3107/54329, use the installed Chrome browser, and use a separate Next build directory so the regular dev server can keep running. Desktop/mobile screenshots are in ignored `test-results/`.

A separate hosted smoke check used the real local collector API and Supabase deployment. Its single verification visit was marked internal before the event was submitted, so default reports exclude it. Hosted admin password sign-in and production deployment are not implied by passing local integration tests.

## Reference reuse

The reference is `/Users/areefsyed/Desktop/Code/portfolio`:

- `convex/analyticsHelpers.ts`: adapted user-agent classification.
- `lib/visitorAnalytics.tsx`: adapted identification, browser exclusion and visible heartbeat patterns, adding separate visit IDs and consent/retry handling.
- `components/admin/AdminDashboard.tsx`: reused/adapted date formatting, comparisons, bar-chart structure, CSV/export approach, filter behavior and journey interaction.
- `convex/adminAnalytics.ts`: ported reporting concepts to SQL aggregates and consistent server-side filters; Convex-specific queries/auth were replaced with Supabase.

The existing site's instrumentation and design tokens are retained instead of adding a second set of component-level trackers or copying the reference's Tailwind theme.

## Admin expansion: appearance, charts, sharing, SMTP and GA

The admin now supports persisted Light/Dark/System appearance. The time-series chart can switch between page views, visits with events, résumé views, download clicks and shares, with line/bar displays and an accessible data table. Missing UTC buckets are filled with zeroes. New/returning browser counts use retained history. The visit-to-action funnel counts distinct visits per action; stages are independent, so it is not presented as an ordered attribution model.

The public résumé viewer includes Share résumé. Native sharing records `resume_shared` only after successful completion; unsupported native sharing falls back to copying the résumé link and records `method=copy_link`. Cancelling native sharing records no share. Shared links use `from=share` to attribute subsequent viewer opens. View/download/share tracking uses the existing consent gate and the same GA event destination when enabled.

### Database upgrade

Existing installations should run `supabase/upgrade-admin-expansion.sql` in the Supabase SQL Editor. It applies migrations 003 and 004 transactionally without deleting visits/events. Fresh installations can run the full setup script. This adds enhanced reporting, private per-admin threshold settings, durable delivery claims and delivery history. Public/ordinary authenticated roles cannot read or execute these functions.

### Google SMTP alerts

Set server-only `SMTP_USER` and `SMTP_PASSWORD` (a Google app password). Sending uses `smtp.gmail.com:465` with TLS, bounded timeouts, and disabled file/URL attachment access. The sender is the configured Google account; recipients are restricted to the verified allowlisted admin account.

Enable live delivery explicitly with `SMTP_ALERT_DELIVERY_ENABLED=true` **in production**. Development, tests and Vercel previews do not claim or send live email. Settings show both credential presence and environment delivery status. A configured account alone does not enable delivery.

In Settings, choose a visitor threshold and/or résumé-view threshold, an hourly/daily/weekly UTC counting window, then enable threshold emails. Empty thresholds disable the metric. Weeks start Monday. Visitors mean distinct anonymous browsers; résumé views count viewer/direct-PDF-open events. Bots/internal visits are excluded. Enabling alerts can include activity already recorded in the current window. Preference edits invalidate unstarted claims, while sent/uncertain records remain durable so they cannot cause a duplicate email in that window.

Evaluation runs after successful first-party collection using Next.js `after()`, and from the existing daily retention cron. `/api/cron/alerts` is an additional bearer-protected endpoint for hosts that can run checks more frequently. Configure an external/hosting scheduler every 5–15 minutes if desired; the repository does not assume a paid Vercel cron tier. The setting is an application feature, not a Codex automation.

SMTP lacks a provider idempotency mechanism. Claims prevent concurrent sends; interrupted sending becomes `uncertain` and is not automatically resent. Definitive failures before submission can retry up to three claims, separated by five minutes. Generic socket/CONN timeouts are uncertain because the server may already have accepted the message. `sent` means SMTP accepted the recipient/message, not proof of inbox delivery. Delivery history remains visible in Settings.

Google account setup: [Google app passwords](https://support.google.com/accounts/answer/185833), [Nodemailer Gmail guidance](https://nodemailer.com/guides/using-gmail).

### Read-only GA4 reporting

The measurement tag is configured independently from report access. To read reports:

1. Set `GA_PROPERTY_ID` to the numeric property ID (not the `G-...` measurement ID).
2. Enable the Google Analytics Data API in the service account's Google Cloud project.
3. Grant the service-account email Viewer access to the intended GA4 property.
4. Set `GOOGLE_SERVICE_ACCOUNT_JSON` to the service-account JSON credential as a server-only environment variable. Never paste it into client code or commit it.

The Google Analytics tab fetches totals, daily active users/page views, top countries, session sources, device/browser breakdowns, top events, and active users over the last 30 minutes. Requests use Google's maintained auth library and only `analytics.readonly`. Results are cached server-side for up to five minutes. Auth is checked before every endpoint access, including cached results. Missing credentials, access denial, quota failures, incomplete reports and partial realtime/device availability have explicit UI states.

GA's property timezone, reporting identity, consent processing/modeling and delays differ from first-party records. The admin keeps these datasets separate. First-party bot/internal switches do not alter GA reports. Privacy thresholds, sampling and grouped-other data loss are surfaced when reported by Google. Breakdowns are top lists, not complete visitor records. Automatic `file_download` and custom `resume_downloaded` counts must not be added together.

Sources: [GA Data API quickstart](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart), [dimensions and metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema), [realtime reporting](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runRealtimeReport).

### Further improvements

Recommended follow-ups: source/campaign conversion comparisons, case-study section drop-off and return visits, weekly email digests, and broken-link/performance/error monitoring. Geography now has a GA country report; it is aggregate geography, not visitor identification. A content editor and Klyro transcript integration remain separate projects.
