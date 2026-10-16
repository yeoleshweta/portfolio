import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No UX, No Problem? PM Research",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
