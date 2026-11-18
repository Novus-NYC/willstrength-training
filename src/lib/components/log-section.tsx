import type { ReactNode } from "react";

type LogSectionProps = {
  /** The margin note: a short mono label left of the red line */
  label: string;
  /** Background: the plain page, or the darker chalk */
  tone?: "chalk" | "chalk-2";
  /** Hash target id. Applied to the section, which is never translated. */
  id?: string;
  /** Id of the heading inside, for aria-labelledby */
  labelledBy?: string;
  /** Extra classes for the content column */
  contentClassName?: string;
  children: ReactNode;
};

/**
 * A page of the log: the margin note sits left of the red margin line on
 * large screens, and above the content behind a short red tick on small ones.
 * Padding lives inside the columns so the red line runs unbroken from one
 * section to the next.
 */
export function LogSection({ label, tone = "chalk", id, labelledBy, contentClassName = "", children }: LogSectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={tone === "chalk-2" ? "bg-chalk-2" : undefined}>
      <div className="container-site log-grid">
        <div className="pt-14 md:pt-20 lg:pr-6 lg:pt-[5.75rem]">
          <p className="label flex items-center gap-3 text-plate-red lg:block">
            <span className="margin-tick lg:hidden" aria-hidden="true" />
            {label}
          </p>
        </div>
        <div className={`log-content pb-16 pt-5 md:pb-24 lg:pt-20 ${contentClassName}`}>{children}</div>
      </div>
    </section>
  );
}
