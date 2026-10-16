import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABIM Communication Assessment",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
