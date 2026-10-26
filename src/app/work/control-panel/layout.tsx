import type { Metadata } from "next";
import { caseStudyMetadata } from "@/lib/caseStudyMeta";

export const metadata: Metadata = caseStudyMetadata("control-panel");

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
