# Admin expansion implementation plan

Authorized by the user: dark mode, analytics charts, frontend resume view/share/download tracking, configurable visitor/resume-view threshold emails, and investigation/integration of available GA data. Continue in phases on the current feature branch; preserve the pre-existing lockfile edit.

## Phase 1: Tracking, reports and presentation
- Add a resume share action with native-share/copy fallback; record only completed share/copy actions and expose source/method metadata without personal data.
- Extend SQL reports with resume shares, new/returning browser counts, resume time series and unique-visit conversion funnel. Fill missing UTC time buckets instead of collapsing gaps.
- Add persisted light/dark/system administration theme with matching dialogs/forms/charts and accessible chart metric controls/data table.
- Verify with unit/SQL and browser tests, then commit.

## Phase 2: Email thresholds
- Adapt reference portfolio alert preferences, thresholds, delivery-log and cooldown patterns, using Google SMTP as the user requested. Store private per-admin settings: enabled, visitor threshold, resume-view threshold, hour/day/week UTC window. A null threshold disables that metric.
- Send to the verified admin account only; no arbitrary recipient input. Once per metric/window, durable claims, retries, delivery status and SMTP delivery state prevents automatic resends after ambiguous acceptance; interrupted sends become uncertain for manual attention.
- Evaluate after successful collection using Next after(), plus a protected scheduled endpoint. Missing configuration is visible and never disrupts tracking. Preview and test environments must not send live email.
- Add service-only SQL/RLS and admin settings API/UI; test boundaries, disabled settings, internal/bot filtering, retry/claim deduplication and permission denial. Commit.

## Phase 3: GA reports and verification
- Server-only Google Analytics Data API adapter using service-account OAuth and the analytics.readonly scope. Require a numeric property ID and property Viewer access; the measurement tag alone is insufficient.
- Separate GA totals, acquisition, geography, device/browser and event reports from first-party visit timelines. Match date selections while clearly stating GA property timezone/processing differences and thresholded/truncated reporting.
- Add configured/unconfigured/error states; never merge incompatible counts or infer identity from GA data.
- Test with deterministic Google/SMTP responses and real local PostgreSQL. Run scoped lint, TypeScript, production build, browser desktop/mobile/theme/share/settings tests. Independent final code review and phase commit.

Useful further ideas to suggest: campaign/UTM comparisons, per-case-study drop-off, weekly summaries, performance/error monitoring, and opt-in contact attribution. Implement the closely related new/returning audience and conversion funnel now; leave other suggestions explicit.

## Outcomes
- Backend/tracking foundations committed as b8cf9fb; frontend integration committed as 20118dd. Shared interfaces were implemented together and committed backend-first so each public tracker retained its existing interface.
- Verification: 36 unit/database tests, six browser flows, scoped ESLint, TypeScript and production build passed. Browser tests cover dark desktop/mobile layouts, chart controls, consent, resume share/download, authenticated settings persistence and GA's unconfigured state. SMTP and GA protocol tests use deterministic responses; no live emails were sent.
- Independent review found three material issues: missing nonproduction send gate, Nodemailer CONN timeout ambiguity, and stale claims after preferences change. Each was reproduced in a failing regression and fixed; the final suite passed.
- SMTP requires explicit production-only SMTP_ALERT_DELIVERY_ENABLED. User choice changed the planned Resend provider to Google SMTP; duplicate-safety uses uncertain statuses instead of claiming provider idempotency.
- Database upgrade file was opened and requested. At the final read-only check, enhanced hosted reports were not installed, and SMTP_USER, SMTP_PASSWORD, GA_PROPERTY_ID and GOOGLE_SERVICE_ACCOUNT_JSON were absent. Implementation is verified locally; hosted activation remains pending those user-controlled prerequisites.
- Suggested follow-ups: campaign conversion comparisons, section drop-off, weekly summaries, broken-link/performance/error alerts. No unrelated features, production deployment or external messages were performed.

## Provider correction

The user subsequently confirmed Resend only and supplied local Resend credentials. Replace SMTP with the Resend HTTPS API, retain private thresholds and production-only delivery, remove Nodemailer, and document the local Google service-account JSON format. Existing SQL needs no provider-specific change. Earlier SMTP setup notes above describe the superseded provider decision.

Provider correction verified: 39 unit/database tests, six browser flows, scoped ESLint, TypeScript, production build and independent review passed. Read-only hosted checks confirmed enhanced analytics_report and analytics_alert_preferences are installed. Local Resend key/sender are present; GA_PROPERTY_ID and GOOGLE_SERVICE_ACCOUNT_JSON were absent from this checkout's .env.local at verification. No live emails sent; production alert delivery remains explicitly disabled until configured.
