import { ImageResponse } from "next/og";
import { brandColors, MARK_PLATE, MARK_RIM, MARK_VIEWBOX, MARK_W_PATH, MARK_W_STROKE } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the plate mark on an iron tile (iOS rounds the corners). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brandColors.iron,
        }}
      >
        <svg viewBox={MARK_VIEWBOX} width="168" height="168">
          <circle cx={MARK_PLATE.cx} cy={MARK_PLATE.cy} r={MARK_PLATE.r} fill={brandColors.red} />
          <circle
            cx={MARK_RIM.cx}
            cy={MARK_RIM.cy}
            r={MARK_RIM.r}
            fill="none"
            stroke={brandColors.chalk}
            strokeWidth={MARK_RIM.strokeWidth}
          />
          <path
            d={MARK_W_PATH}
            fill="none"
            stroke={brandColors.chalk}
            strokeWidth={MARK_W_STROKE}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </svg>
      </div>
    ),
    size,
  );
}
