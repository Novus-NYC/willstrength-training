/**
 * Brand colours and the plate mark, shared by the header, footer, the apple
 * icon and the Open Graph image. src/app/icon.svg is a static copy of the
 * same drawing (keep them in sync). Values mirror tailwind.config.ts.
 *
 * The mark: a red competition plate seen face on, with a chalk rim line and
 * a W stamped in the middle. Drawn on a 64 x 64 grid.
 */
export const brandColors = {
  chalk: "#F4F2ED",
  chalkBright: "#FBFAF7",
  iron: "#15171A",
  steel: "#A7AEB6",
  red: "#B8261F",
  redBright: "#F06A5F",
  blue: "#1E4FA3",
  blueBright: "#8FB0E8",
} as const;

export const MARK_VIEWBOX = "0 0 64 64";
/** The plate */
export const MARK_PLATE = { cx: 32, cy: 32, r: 26 } as const;
/** The rim line, inset from the plate edge */
export const MARK_RIM = { cx: 32, cy: 32, r: 21.5, strokeWidth: 1.6 } as const;
/** The stamped W, drawn as a stroke */
export const MARK_W_PATH = "M18.5 24 25 40.5 32 27.5 39 40.5 45.5 24";
export const MARK_W_STROKE = 5;
