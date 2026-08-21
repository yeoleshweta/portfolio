import Script from "next/script";
import {
  CONSENT_STORAGE_KEY,
  GA_DEBUG,
  GA_ENABLED,
  GA_MEASUREMENT_ID,
} from "@/lib/analytics";

/**
 * Loads GA4 (gtag.js) with Google Consent Mode v2.
 *
 * Why a raw inline <script> and not <Script strategy="beforeInteractive">:
 * the consent defaults MUST execute before gtag.js runs its first config.
 * A plain inline script in the server-rendered HTML is parsed and executed
 * synchronously during document parse, which guarantees that ordering.
 * The external gtag.js file is then loaded lazily via next/script so it
 * never blocks first paint or hurts Core Web Vitals.
 *
 * Consent defaults: everything denied. Google still sends cookieless
 * "consent mode" pings, so aggregate traffic is modelled even before the
 * visitor answers the banner. A returning visitor who already accepted has
 * their choice restored from localStorage before the first hit fires.
 */
export default function GoogleAnalytics() {
  if (!GA_ENABLED) return null;

  const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;

var stored = null;
try { stored = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}); } catch (e) {}

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: stored === 'granted' ? 'granted' : 'denied',
  wait_for_update: 500
});

gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, {
  send_page_view: true,
  anonymize_ip: true${GA_DEBUG ? ",\n  debug_mode: true" : ""}
});
`.trim();

  return (
    <>
      <script
        id="ga-bootstrap"
        dangerouslySetInnerHTML={{ __html: bootstrap }}
      />
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}
