import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shwetasharma.tech"),
  title: {
    default: "Shweta Sharma — UX Researcher",
    template: "%s · Shweta Sharma",
  },
  description:
    "Shweta Sharma — UX Researcher and AI/ML Grad Student at Drexel. 6+ years across UX, behavioral analytics, and data science. Building things that respond to how people actually behave.",
};

const caveat = Caveat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={caveat.variable}
      style={{ scrollBehavior: "auto" }}
    >
      <body>
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
        <ChatHeadingFix />
        <Script
          src="https://unpkg.com/@klyro/widget/dist/widget.js"
          data-widget-key="1kr1f9xRlnhy"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
