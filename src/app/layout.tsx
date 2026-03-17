import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundScene from "@/components/BackgroundScene";

export const metadata: Metadata = {
  title: "Shweta Sharma | UX Researcher · AI & ML",
  description:
    "Shweta Sharma — UX Researcher and AI/ML Grad Student at Drexel. 6+ years across UX, behavioral analytics, and data science. Building things that respond to how people actually behave.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "auto" }}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <BackgroundScene />
          <main className="main-content">{children}</main>
        </SmoothScroll>
        <Script
          src="https://unpkg.com/@klyro/widget/dist/widget.js"
          data-widget-key="1kr1f9xRlnhy"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
