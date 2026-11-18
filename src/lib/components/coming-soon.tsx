import type { ReactNode } from "react";

type ComingSoonProps = {
  /** Status line, for example "Session options are being finalized." */
  title: string;
  /** Heading level that fits the page outline */
  as?: "h2" | "h3";
  children?: ReactNode;
};

/**
 * The calm, honest state for a section whose facts are not in yet: a blank
 * log page with a status line. It never fakes content, and it disappears on
 * its own once site.ts has the data (the caller stops rendering it).
 */
export function ComingSoon({ title, as: Heading = "h2", children }: ComingSoonProps) {
  return (
    <div className="border-2 border-iron bg-chalk-bright">
      <div className="flex items-center justify-between gap-4 border-b-2 border-iron px-5 py-3 sm:px-6">
        <p className="label">Status</p>
        <p className="label text-plate-blue">Coming soon</p>
      </div>
      <div className="px-5 pb-2 pt-6 sm:px-6 sm:pt-7">
        <Heading className="display text-display-sm sm:text-[1.625rem]">{title}</Heading>
        {children ? <div className="measure mt-3 text-graphite">{children}</div> : null}
      </div>
      {/* Blank ruled lines: the entries still to be written */}
      <div className="ruled mx-5 mb-5 h-24 sm:mx-6" aria-hidden="true" />
    </div>
  );
}
