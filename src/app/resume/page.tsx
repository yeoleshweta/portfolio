import type { Metadata } from "next";
import ResumeViewer from "./ResumeViewer";
export const metadata: Metadata = { title: "Résumé" };
export default function ResumePage() {
  return <ResumeViewer />;
}
