import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fuel Design System",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
