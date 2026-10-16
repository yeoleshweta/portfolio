import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Bias NLP",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
