import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";

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
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
