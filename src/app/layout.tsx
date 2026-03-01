import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shweta Sharma | UX Researcher · AI & ML",
  description:
    "Shweta Sharma — UX Researcher and AI/ML Grad Student at Drexel. 6+ years across UX, behavioral analytics, and data science. Building things that respond to how people actually behave.",
};

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

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
          <main className="main-content">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
