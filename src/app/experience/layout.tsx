import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience",
  description:
    "Six years of UX research and design across Arcadia retail brands, John Deere, and healthcare AI at ABIM.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
