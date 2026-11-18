import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/metadata";
import { category } from "@/lib/site";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = OG_IMAGE_ALT;

const RULE_GAP = 45;
const MARGIN_X = 132;

function Plate({ width, color }: { width: number; color: string }) {
  return <div style={{ display: "flex", width, height: 150, background: color, borderRadius: 4 }} />;
}

function Collar() {
  return <div style={{ display: "flex", width: 12, height: 44, background: brandColors.iron, borderRadius: 2 }} />;
}

/**
 * Shared Open Graph image: the hero lockup on a ruled log page. No photo,
 * because none has been supplied. The OG renderer cannot use the variable
 * font, so it uses the static Archivo Black weight (normal width).
 */
export default async function OpenGraphImage() {
  const fontDir = join(process.cwd(), "node_modules", "@fontsource");
  const [archivo, plexMono] = await Promise.all([
    readFile(join(fontDir, "archivo", "files", "archivo-latin-900-normal.woff")),
    readFile(join(fontDir, "ibm-plex-mono", "files", "ibm-plex-mono-latin-500-normal.woff")),
  ]);

  const rules = Array.from({ length: Math.floor(OG_IMAGE_SIZE.height / RULE_GAP) }, (_, index) => (index + 1) * RULE_GAP);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          background: brandColors.chalk,
          color: brandColors.iron,
          fontFamily: "Archivo",
        }}
      >
        {rules.map((top) => (
          <div key={top} style={{ position: "absolute", left: 0, right: 0, top, height: 2, background: "#C5D2E8" }} />
        ))}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: MARGIN_X, width: 4, background: brandColors.red }} />

        <div
          style={{
            position: "absolute",
            left: 28,
            top: 54,
            display: "flex",
            fontFamily: "Plex Mono",
            fontSize: 22,
            letterSpacing: 3,
            color: brandColors.red,
          }}
        >
          PAGE 1
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: MARGIN_X + 52,
            paddingRight: 64,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 150, lineHeight: 0.85, background: brandColors.chalk, alignSelf: "flex-start" }}>
            WILL
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "center", marginTop: 14 }}>
            <div
              style={{
                position: "absolute",
                left: -14,
                right: -40,
                top: 70,
                height: 10,
                background: brandColors.iron,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 10 }}>
              <Plate width={26} color={brandColors.blue} />
              <Plate width={34} color={brandColors.red} />
              <Collar />
            </div>
            {/* Chalk behind the word so the bar stops at its edges, as on the site */}
            <div style={{ display: "flex", fontSize: 120, lineHeight: 1, letterSpacing: -2, padding: "0 12px", background: brandColors.chalk }}>
              STRENGTH
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 10 }}>
              <Collar />
              <Plate width={34} color={brandColors.red} />
              <Plate width={26} color={brandColors.blue} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 26,
              fontFamily: "Plex Mono",
              fontSize: 34,
              letterSpacing: 14,
            }}
          >
            <div style={{ display: "flex", background: brandColors.chalk }}>TRAINING</div>
            <div style={{ display: "flex", flex: 1, height: 2, background: brandColors.iron }} />
          </div>

          <div style={{ display: "flex", marginTop: 40, fontSize: 40, background: brandColors.chalk, alignSelf: "flex-start" }}>
            {`${category}.`}
          </div>
        </div>

      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 900, style: "normal" },
        { name: "Plex Mono", data: plexMono, weight: 500, style: "normal" },
      ],
    },
  );
}
