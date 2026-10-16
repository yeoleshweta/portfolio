import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Miss Selfridge Incrementality",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
