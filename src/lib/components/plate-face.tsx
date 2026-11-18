import { site } from "@/lib/site";

/**
 * A red competition plate seen face on, with the business name cast round
 * the rim. Decorative line work for the About page while no coach portrait
 * exists (the portrait takes its place once site.owner.photo is set).
 */
export function PlateFace({ className = "" }: { className?: string }) {
  // Circumference of the text circle, so the name spaces evenly round it
  const textRadius = 163;
  const circumference = Math.round(2 * Math.PI * textRadius);
  const rimText = `${site.name} · ${site.name} · `.toUpperCase();

  return (
    <svg viewBox="0 0 400 400" className={`plate-face ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <path
          id="plate-rim-path"
          d={`M200 ${200 - textRadius} a${textRadius} ${textRadius} 0 1 1 -0.01 0`}
          fill="none"
        />
      </defs>
      <circle cx="200" cy="200" r="198" fill="var(--red)" />
      <circle cx="200" cy="200" r="188" fill="none" stroke="var(--chalk)" strokeWidth="1.5" opacity="0.7" />
      <text fill="var(--chalk)" fontSize="19">
        <textPath href="#plate-rim-path" textLength={circumference - 6} lengthAdjust="spacing">
          {rimText}
        </textPath>
      </text>
      <circle cx="200" cy="200" r="142" fill="none" stroke="var(--chalk)" strokeWidth="2.5" />
      <circle cx="200" cy="200" r="132" fill="none" stroke="var(--chalk)" strokeWidth="1" opacity="0.55" />
      {/* Hub and sleeve hole */}
      <circle cx="200" cy="200" r="58" fill="var(--iron)" />
      <circle cx="200" cy="200" r="47" fill="none" stroke="var(--chalk)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="200" cy="200" r="27" fill="var(--chalk)" />
    </svg>
  );
}
