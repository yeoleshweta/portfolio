import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CASE_STUDIES } from "@/lib/caseStudyMeta";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BG = "#f2f2f2";
const INK = "#0f0f0f";
const LILAC = "#7a5fd4";
const ACCENT = "#5b3fd4";

async function loadFonts() {
  const [inter, plex] = await Promise.all([
    readFile(join(process.cwd(), "src/lib/fonts/Inter-Bold.ttf")),
    readFile(join(process.cwd(), "src/lib/fonts/IBMPlexSerif-Italic.ttf")),
  ]);
  return [
    { name: "Inter", data: inter, weight: 700 as const, style: "normal" as const },
    { name: "Plex", data: plex, weight: 400 as const, style: "italic" as const },
  ];
}

async function imageSrc(publicPath: string) {
  const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const data = await readFile(file);
  const ext = publicPath.split(".").pop()?.toLowerCase();
  const mime = ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${data.toString("base64")}`;
}

function NameLockup({ size = 36 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline" }}>
      <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: size, color: INK }}>Shweta </span>
      <span
        style={{
          fontFamily: "Plex",
          fontStyle: "italic",
          fontSize: size + 6,
          color: LILAC,
          marginLeft: 14,
        }}
      >
        Sharma
      </span>
    </div>
  );
}

export async function homeOgImage() {
  const portrait = await imageSrc("/assets/IMG_1191.jpg");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: BG,
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 420,
            height: 420,
            borderRadius: 36,
            border: `4px solid ${LILAC}`,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} width={420} height={420} alt="" style={{ objectFit: "cover" }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Plex",
              fontStyle: "italic",
              fontSize: 32,
              color: LILAC,
            }}
          >
            UX Researcher
          </div>
          <div style={{ display: "flex", marginTop: 12 }}>
            <NameLockup size={84} />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 26,
              color: "#3a3a3a",
            }}
          >
            AI and ML · Healthcare · Enterprise tools
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}

export async function caseStudyOgImage(slug: string) {
  const study = CASE_STUDIES[slug];
  if (!study) throw new Error(`Unknown case study slug: ${slug}`);
  const cover = study.cover ? await imageSrc(study.cover) : null;
  const titleSize = study.title.length > 36 ? 48 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: cover ? 680 : 1200,
            padding: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 22,
              color: ACCENT,
              letterSpacing: 1,
            }}
          >
            {study.category}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.05,
              color: INK,
              letterSpacing: -1,
            }}
          >
            {study.title}
          </div>
          <NameLockup />
        </div>
        {cover ? (
          <div style={{ display: "flex", width: 520, height: "100%", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} width={520} height={630} alt="" style={{ objectFit: "cover" }} />
          </div>
        ) : null}
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
