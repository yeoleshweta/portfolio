import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABTools Usability Study",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
