import { CASE_STUDIES } from "@/lib/caseStudyMeta";
import { caseStudyOgImage, ogContentType, ogSize } from "@/lib/ogImage";

export const alt = `${CASE_STUDIES["stories-by-children"].title} — Shweta Sharma`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return caseStudyOgImage("stories-by-children");
}
