import type { Metadata } from "next";

const title = "Team Contract — Making Program Metrics Defensible | Shweta Sharma";
const description =
  "Research-led redesign of John Deere's program metrics tool — making numbers defensible to leadership. UX research and product design in the Fuel design system.";
const heroImage = "/assets/team-contract/01-hero-team-contract-overview.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: [{ url: heroImage }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImage],
  },
};

export default function TeamContractLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
