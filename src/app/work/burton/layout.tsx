import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Burton Weather Personalization",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
