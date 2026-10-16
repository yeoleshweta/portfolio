import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories by Children",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
