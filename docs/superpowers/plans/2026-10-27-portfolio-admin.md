# Portfolio Admin Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. User authorized implementation in this session.

**Goal:** Add trustworthy consent-gated analytics and a private Supabase-backed admin panel.
**Architecture:** Existing track() fans out to GA4 and a same-origin collector. A server-only Supabase client calls restricted PostgreSQL RPCs. Supabase Auth verifies the administrator before reporting APIs return data.
**Tech Stack:** Next.js 16, React 19, TypeScript, CSS modules, Supabase, Vitest, PGlite and Playwright.
**Spec:** docs/superpowers/specs/2026-10-27-admin-design.md

## Global Constraints
- Preserve unrelated package-lock changes and public-site design.
- Reuse reference tracking classifiers, reporting concepts, filter/export and journey behavior; port Convex storage to PostgreSQL.
- No secrets in browser bundles, fixtures, commits, logs or chat.
- No collection before consent or from excluded/admin routes; API and DB deny anonymous reads.
- Browser identity, visit identity and event identity remain distinct.

## Review Focus
- Consent changes during queued requests; retries preserve IDs and stop on opt-out.
- Duplicate route tracking, protected gates, and tab navigation cannot inflate content views.
- Filter/date/export semantics match and query limits are visible.
- Anonymous/unauthorized admin requests never receive private data.
- Missing configuration and backend failure do not interrupt public browsing.

### Task 1: Backend foundation
**Files:** supabase/migrations/*, src/lib/analytics/{contract,helpers,server}.ts, src/app/api/analytics/route.ts, tests/analytics/backend.test.ts, environment template and setup docs.
**Interfaces:** parseBatch(input) returns bounded events and validated visit metadata; ingest_analytics RPC deduplicates event UUIDs and reports use analytics_report RPC. All RPCs are service-role-only.
- [x] Write and run failing tests for input validation, transactional deduplication, rate limits, read isolation and report filters.
- [x] Implement schema, ingestion endpoint and reporting SQL. Reuse reference user-agent classification.
- [x] Run npm run test:analytics and npx tsc --noEmit. Expected: pass.
- [x] Commit scoped phase 1 files.

### Task 2: Public tracking and resume
**Files:** src/lib/analytics.ts, src/lib/analytics/client.ts, src/components/analytics/*, src/components/PublicShell.tsx, src/app/layout.tsx, resume page/API and existing resume anchors/case-study gate.
**Interfaces:** track(name, params) remains compatible; first-party collector sends validated batches to /api/analytics only after consent; browser+visit IDs use separate storage keys. Analytics enabled independently from GA4.
- [x] Write and run failing tests for no consent, denied consent, session expiry, storage failure, retry deduplication and exclusions.
- [x] Implement collector and explicit route tracking; adapt reference 30-second visible heartbeat.
- [x] Add resume viewer and download intent, gate/content events and isolated public shell.
- [x] Run analytics suite and typecheck. Expected: pass. Commit phase 2.

### Task 3: Authentication and dashboard
**Files:** src/lib/supabase/*, src/lib/admin/*, src/app/admin/*, src/app/api/admin/*, src/components/admin/*, tests/analytics/admin.test.ts, tests/admin.spec.ts, ANALYTICS.md.
**Interfaces:** requireAdmin() validates Supabase user and ADMIN_EMAILS on every read; dashboard API returns filtered reports, paginated events/visits and visitor journeys. Exports use identical filters and safe CSV cells.
- [x] Write and run failing tests for unauthorized reads, date filters, export formula safety and pagination.
- [x] Implement sign-in/out with Supabase SSR cookies, private APIs and adapted admin interactions in CSS modules.
- [x] Verify desktop/mobile admin states, keyboard navigation, collection/resume journeys, SQL tests, lint and production build. Expected: scoped checks pass; record pre-existing failures separately.
- [x] Document live activation steps and remaining optional integrations; commit phase 3.

## Outcomes and rulings
- Phase 1: 96c665f. Six initial PostgreSQL tests and typecheck passed.
- Phase 2: 75d2577. Twelve tracking/database tests and scoped lint/typecheck passed.
- Phase 3: Dashboard/auth/reporting implemented, independently reviewed; final verification recorded in ANALYTICS.md and Git commit.
- Supabase replaces Convex and Clerk because the user provided a Supabase project. Reference behavior/code is adapted, not connected to the reference deployment.
- Existing schema was partially configured. Setup is now transactional and rerunnable; hosted RPC and anonymous-denial checks passed after user applied it.
- Review fixes: numeric metadata validation and guarded SQL; cross-tab GA consent and disable flag; delayed-event date parity; explicit protected-content timing. Each has a failing-then-passing regression test.
- Hosted ingestion smoke check persisted an event through the actual local API. Its visit was marked internal first. Real admin password sign-in remains a user verification step; no password was requested or stored by this implementation.
- Optional alerts, geography, Klyro transcripts and a separate new/returning-browser report remain follow-up work. No production deployment performed.
- Final verification: 22 unit/database tests and 4 browser integration tests passed; scoped ESLint, TypeScript and production build passed. Desktop/mobile and admin accessibility checks passed; client bundle scan found no service-role/cron secrets. Four independent-review findings and one subsequent cleared-consent regression were fixed. No deferred review findings.
- Live Supabase checks: all three report RPCs available; anonymous reads/report execution denied; one allowlisted, verified Auth account found; collector event persistence verified using an internal visit. Local collection enabled. Hosted password sign-in and production deployment remain unverified.
