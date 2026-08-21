# Analytics — implementation reference

GA4 via `gtag.js`, wired by hand with `next/script`. No extra npm dependency,
no Tag Manager, no vendor SDK.

## Files

| File | Role |
| --- | --- |
| `src/lib/analytics.ts` | Event-name registry, `track()`, consent helpers. The only file you edit to add an event. |
| `src/components/analytics/GoogleAnalytics.tsx` | Loads gtag.js and sets Consent Mode v2 defaults. Server component. |
| `src/components/analytics/AnalyticsProvider.tsx` | SPA page views, delegated clicks, scroll depth, engaged time, case-study views. Client component, mounted once. |
| `src/components/analytics/ConsentBanner.tsx` | One-time cookie notice. |
| `.env.local.example` | Template for `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GA_DEBUG`. |
| `.env.local` | Local secrets — nothing ships without `NEXT_PUBLIC_GA_ID`. |

## GA4 Admin checklist (do this once)

You need a Measurement ID before anything leaves the browser. Complete these
steps in [Google Analytics](https://analytics.google.com/):

### 1. Property + data stream

1. Admin → Create property (or reuse an existing one for the portfolio).
2. Add a **Web** data stream for your live domain (e.g. `shweta.tech`).
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
4. Data stream → **Enhanced measurement**: leave defaults on. Confirm
   **Page changes based on browser history events** is enabled (backup for
   SPA navigations; the app also sends explicit `page_view` on client routes).

### 2. Custom definitions (event-scoped)

Admin → **Custom definitions** → Create custom dimensions. Use these
exact parameter names so they match what `track()` sends:

| Dimension name | Event parameter | Scope |
| --- | --- | --- |
| Page type | `page_type` | Event |
| Project slug | `project_slug` | Event |
| Location | `location` | Event |
| Card group | `card_group` | Event |
| Network | `network` | Event |
| Section ID | `section_id` | Event |
| Percent scrolled | `percent_scrolled` | Event |
| Consent state | `consent_state` | Event |

Params that are not registered still fire; they just won't appear as
breakdowns in standard reports.

### 3. Key events (conversions)

Admin → **Events** (or **Key events**) → mark these as Key events:

| Event | Why |
| --- | --- |
| `cv_download` | Primary conversion — resume interest |
| `contact_click` | Strongest intent — mailto / tel |
| `case_study_complete` | Secondary — deep case-study engagement |

### 4. DebugView

While testing with `NEXT_PUBLIC_GA_DEBUG=true` (or the [GA Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
extension), open Admin → **DebugView** to see hits within seconds.

## Turning it on

```bash
cp .env.local.example .env.local
# paste your G-XXXXXXXXXX into NEXT_PUBLIC_GA_ID
# optional: NEXT_PUBLIC_GA_DEBUG=true while verifying
npm run dev
```

With `NEXT_PUBLIC_GA_ID` empty, `GoogleAnalytics` renders `null` and every
`track()` call is a no-op (except debug console logs when
`NEXT_PUBLIC_GA_DEBUG=true`). Nothing breaks; nothing is sent to Google.

### Vercel (Production only)

1. Project → **Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`.
3. Scope: **Production only** (not Preview / Development), so preview
   deploys don't pollute the property.
4. Redeploy Production so the build picks up the new public env var.

CLI equivalent (from the repo, after `npx vercel link`):

```bash
printf '%s' 'G-XXXXXXXXXX' | npx vercel env add NEXT_PUBLIC_GA_ID production
npx vercel --prod
```

## Events

Automatic (GA4 Enhanced Measurement — no code):
`page_view` (first load), `session_start`, `first_visit`, `user_engagement`,
`scroll` (90%), `click` (outbound), `file_download`.

App Router soft navigations also send a custom `page_view` from
`AnalyticsProvider` (skips the first load to avoid double-counting).

Custom (this codebase):

| Event | Fires when | Key params |
| --- | --- | --- |
| `page_view` | Soft (client) navigations only; first load uses gtag config | `page_title` |
| `cv_download` | Any link to a resume PDF/zip is clicked | `location`, `file_name` |
| `contact_click` | `mailto:` / `tel:` click | `method`, `location` |
| `social_click` | LinkedIn / GitHub / X / Scholar click | `network`, `location` |
| `project_card_click` | Home-page card → case study | `project_slug`, `project_title`, `card_group`, `card_position` |
| `case_study_view` | A `/work/*` route opens | `project_slug` |
| `case_study_section_view` | Scroll-spy enters a new section | `section_id`, `section_index`, `section_count` |
| `case_study_complete` | 90% of a case study reached | `project_slug`, `time_on_page_sec` |
| `scroll_depth` | 25 / 50 / 75 / 90 % of any page | `percent_scrolled` |
| `nav_click` | Navbar, mobile menu, scroll-spy dot | `link_label`, `location` |
| `carousel_scroll` | "More work" arrows | `direction` |
| `engaged_time` | 30 / 60 / 180 s of *visible* time | `seconds` |
| `easter_egg_play` | Contact-panel tiles tossed | `feature` |
| `consent_update` | Banner answered | `consent_state` |

Every custom event also carries `page_path` and `page_type`
(`home` / `case_study` / `experience` / `other`), added automatically in `track()`.

Note: Enhanced Measurement's automatic `scroll` (90%) and our custom
`scroll_depth` (25/50/75/90) can both appear — use `scroll_depth` for
milestone funnels; treat automatic `scroll` as a coarse engagement signal.

## Adding a new event

1. Add the name to `EVENTS` in `src/lib/analytics.ts`.
2. Either call `track(EVENTS.YOUR_EVENT, { … })` directly, or — for anything
   click-driven — add attributes and let `AnalyticsProvider` do it:

```tsx
<button
  data-track="your_event"
  data-track-project-slug="abim"     // → param: project_slug
  data-track-location="hero"          // → param: location
>
```

`data-track-foo-bar` becomes the GA param `foo_bar`. No wiring needed.

3. Register any new param as a **custom dimension** in GA4
   (Admin → Custom definitions), or it won't appear in reports.

## Consent

Consent Mode v2 defaults to *denied* for everything, so pre-consent traffic is
sent as cookieless pings (Google models it into aggregate reports). Accepting
the banner calls `gtag('consent','update',{analytics_storage:'granted'})` and
stores the choice in `localStorage` under `sw_consent_v1`. Ad-related consent
signals stay denied permanently — this site runs no ads.

To reset your own choice while testing:
`localStorage.removeItem('sw_consent_v1')` then reload.

## Not sending anything?

- `NEXT_PUBLIC_GA_ID` missing or not prefixed `NEXT_PUBLIC_` → env var never
  reaches the browser.
- Ad blocker. Test in a clean profile; check the Network tab for
  `google-analytics.com/g/collect` returning 204.
- Set `NEXT_PUBLIC_GA_DEBUG=true`, reload, and watch the console for
  `[analytics]` lines — they log even when GA itself is blocked.
