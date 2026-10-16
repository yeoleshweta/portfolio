import { homeOgImage, ogContentType, ogSize } from "@/lib/ogImage";

export const alt = "Shweta Sharma, UX Researcher";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return homeOgImage();
}
