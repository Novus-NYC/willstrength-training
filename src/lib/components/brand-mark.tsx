import { brandColors, MARK_PLATE, MARK_RIM, MARK_VIEWBOX, MARK_W_PATH, MARK_W_STROKE } from "@/lib/brand";

type BrandMarkProps = {
  className?: string;
};

/** The plate mark. Decorative: the business name always sits beside it. */
export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
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
  );
}

type WordmarkProps = {
  /** "dark" for iron backgrounds */
  tone?: "light" | "dark";
  size?: "header" | "footer";
};

/** Mark plus the name, set as plate lettering over a mono "Training" */
export function Wordmark({ tone = "light", size = "header" }: WordmarkProps) {
  const big = size === "footer";
  return (
    <span className="flex items-center gap-3">
      <BrandMark className={big ? "h-14 w-14 shrink-0" : "h-10 w-10 shrink-0"} />
      <span className="flex flex-col">
        {/* The name never wraps, so it steps down a size below 360 px to fit
            320 px phones (WCAG reflow) beside the menu button. */}
        <span
          className={`display whitespace-nowrap leading-none ${
            big
              ? "text-[1.4375rem] max-[359px]:text-[1.1875rem] sm:text-[1.75rem]"
              : "text-[1.1875rem] max-[359px]:text-[1rem] sm:text-[1.3125rem]"
          }`}
        >
          Willstrength
        </span>
        <span
          className={`mt-1 font-mono font-medium uppercase leading-none tracking-[0.42em] ${big ? "text-sm" : "text-[0.6875rem]"} ${
            tone === "dark" ? "text-steel" : "text-graphite"
          }`}
        >
          Training
        </span>
      </span>
    </span>
  );
}
