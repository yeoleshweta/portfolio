import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shweta Sharma | UX Researcher · AI & ML",
  description:
    "Shweta Sharma — UX Researcher and AI/ML Grad Student at Drexel. 6+ years across UX, behavioral analytics, and data science. Building things that respond to how people actually behave.",
  keywords: [
    "Shweta Sharma",
    "UX Researcher",
    "AI",
    "Machine Learning",
    "Data Science",
    "Portfolio",
    "Drexel University",
  ],
  openGraph: {
    title: "Shweta Sharma | UX Researcher · AI & ML",
    description:
      "UX Researcher and AI/ML Grad Student. 6+ years building products people actually want to use.",
    type: "website",
    url: "https://shwetasharma.tech",
  },
};

import CustomCursor from "@/components/CustomCursor";
import BackgroundGrid from "@/components/BackgroundGrid";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <BackgroundGrid />
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
