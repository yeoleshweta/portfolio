"use client";

import { usePathname } from "next/navigation";
import PrivacyControl from "@/components/analytics/PrivacyControl";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import MotionControl from "@/components/MotionControl";
import HashScroll from "@/components/HashScroll";
import BackgroundScene from "@/components/BackgroundScene";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import ChatHeadingFix from "@/components/ChatHeadingFix";

export default function PublicShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      {/* GA4 + Consent Mode v2. Must be first so consent defaults are set
            before any measurement hit leaves the browser. */}
      <GoogleAnalytics />
      <AnalyticsProvider />

      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>

      <MotionControl>
        <CustomCursor />
        <HashScroll />
        <SmoothScroll>
          <Navbar />
          <BackgroundScene />
          <main id="main-content" className="main-content" tabIndex={-1}>
            {children}
          </main>
        </SmoothScroll>
      </MotionControl>
      <ConsentBanner />
      <PrivacyControl />
      <ChatHeadingFix />
      <Script
        src="https://unpkg.com/@klyro/widget/dist/widget.js"
        data-widget-key="1kr1f9xRlnhy"
        strategy="afterInteractive"
      />
    </>
  );
}
