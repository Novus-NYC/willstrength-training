import type { Config } from "tailwindcss";

// Brand tokens for Willstrength Training: "the first page of the training log".
// chalk = the log page and lifting chalk, iron = the bar and the pen,
// red and blue = the two heaviest competition plates (25 kg red, 20 kg blue),
// which double as the red margin line and blue ruled lines of a notebook.
// Red is the action colour. Blue is structure (numbers, rules, data). The
// "bright" variants are the same hues lifted for use on iron.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        chalk: {
          DEFAULT: "#F4F2ED",
          2: "#EAE7E0",
          bright: "#FBFAF7",
          line: "#CDC8BE",
        },
        iron: {
          DEFAULT: "#15171A",
          2: "#24282D",
          line: "#3A4047",
        },
        // Muted text on chalk
        graphite: "#4E535A",
        // Muted text on iron
        steel: "#A7AEB6",
        plate: {
          red: "#B8261F",
          "red-deep": "#971D17",
          "red-bright": "#F06A5F",
          blue: "#1E4FA3",
          "blue-bright": "#8FB0E8",
          // Ruled lines only (decorative, never text)
          rule: "#C5D2E8",
        },
      },
      fontFamily: {
        sans: ['"Archivo Variable"', "Archivo", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6.4vw, 5.75rem)", { lineHeight: "0.92" }],
        "display-lg": ["clamp(2.125rem, 4.6vw, 4rem)", { lineHeight: "0.95" }],
        "display-md": ["clamp(1.625rem, 2.8vw, 2.375rem)", { lineHeight: "1.02" }],
        "display-sm": ["1.375rem", { lineHeight: "1.12" }],
        lead: ["1.1875rem", { lineHeight: "1.55" }],
      },
      maxWidth: {
        site: "78rem",
      },
      letterSpacing: {
        label: "0.12em",
        button: "0.02em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
