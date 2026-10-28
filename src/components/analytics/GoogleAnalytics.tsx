"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_STORAGE_KEY,
  GA_DEBUG,
  GA_ENABLED,
  GA_MEASUREMENT_ID,
  CONSENT_EVENT,
  readConsent,
} from "@/lib/analytics";

/** Configure GA's queue before tracking, but load the network library only after consent.
 * Page views are emitted exclusively by AnalyticsProvider. Disable automatic history
 * page views in the GA4 stream too when retaining GA4 as a secondary destination.
 */
export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const sync = () => {
      const granted = readConsent() === "granted";
      (window as unknown as Record<string, unknown>)[
        `ga-disable-${GA_MEASUREMENT_ID}`
      ] = !granted;
      setAllowed(granted);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);
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
  send_page_view: false,
  anonymize_ip: true${GA_DEBUG ? ",\n  debug_mode: true" : ""}
});
`.trim();

  return (
    <>
      <script
        id="ga-bootstrap"
        dangerouslySetInnerHTML={{ __html: bootstrap }}
      />
      {allowed && (
        <Script
          id="ga-lib"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
      )}
    </>
  );
}
