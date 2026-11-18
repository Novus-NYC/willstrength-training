import type { CSSProperties } from "react";
import { AskBand } from "@/lib/components/ask-band";
import { ComingSoon } from "@/lib/components/coming-soon";
import { LogSection } from "@/lib/components/log-section";
import { SessionPhotos } from "@/lib/components/photos";
import { Reveal } from "@/lib/components/reveal";
import { ServiceLog } from "@/lib/components/service-log";
import { pageMetadata } from "@/lib/metadata";
import { category, site } from "@/lib/site";

/** The copy only promises a list once site.services has entries */
const hasServices = site.services.length > 0;

export const metadata = pageMetadata({
  title: "Services",
  description: hasServices
    ? `${category} with ${site.name}: the session options, written up one per line.`
    : `${category} with ${site.name}. The session options will be listed here once they are confirmed.`,
  path: "/services",
});

/** Entry numbers down the margin of the blank log page in the intro */
const BLANK_ROWS = [1, 2, 3, 4, 5];

export default function ServicesPage() {
  const { services, hours } = site;

  return (
    <>
      {/* Intro: the title beside a blank log page, numbered and ruled */}
      <section aria-labelledby="services-heading" className="border-b-2 border-iron">
        <div className="container-site log-grid">
          <div className="pt-12 md:pt-16 lg:pr-6 lg:pt-[4.75rem]">
            <p className="label flex items-center gap-3 text-plate-red lg:block">
              <span className="margin-tick lg:hidden" aria-hidden="true" />
              Services
            </p>
          </div>
          {/* Top-aligned below lg, where the label sits in its own row above
              the title; bottom-aligned once it moves into the margin. */}
          <div className="log-content grid gap-10 pb-14 pt-5 md:grid-cols-12 md:items-start md:pb-20 lg:items-end lg:pt-16">
            <div className="md:col-span-7">
              <h1 id="services-heading" className="rise display text-display-lg">
                Training sessions
              </h1>
              <p className="rise measure-narrow mt-6 text-lead" style={{ "--rise-delay": "120ms" } as CSSProperties}>
                {hasServices
                  ? `Every session option at ${site.name}, written up one per line.`
                  : "Session options will be written up here, one per line, once they are confirmed."}
              </p>
            </div>
            {/* Decorative: a blank log page with numbered, ruled lines and a
                red margin. It names no columns, so it promises nothing. */}
            <div
              aria-hidden="true"
              className="hidden border-2 border-iron bg-chalk-bright md:col-span-5 md:block"
            >
              <div className="h-4 border-b-2 border-iron bg-iron" />
              <ol className="label text-plate-blue">
                {BLANK_ROWS.map((row) => (
                  <li key={row} className="grid h-12 grid-cols-[3rem_minmax(0,1fr)] border-b border-plate-rule last:border-b-0">
                    <span className="flex items-center justify-center border-r-2 border-plate-red">{row}</span>
                    <span />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <LogSection label="The options" labelledBy="options-heading">
        <h2 id="options-heading" className="sr-only">
          Session options
        </h2>
        {hasServices ? (
          <ServiceLog services={services} />
        ) : (
          <Reveal>
            <ComingSoon title="Session options are being finalized." as="h3">
              <p>Each option will be listed here as soon as it is confirmed.</p>
            </ComingSoon>
          </Reveal>
        )}

        {hours && hours.length > 0 ? (
          <div className="mt-14">
            <h2 className="display text-display-md">Hours</h2>
            <dl className="mt-5 border-b border-iron">
              {hours.map((row) => (
                <div key={row.days} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-iron py-4">
                  <dt className="font-semibold">{row.days}</dt>
                  <dd className="text-graphite">{row.times}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </LogSection>

      {site.sessionPhotos.length > 0 ? (
        <LogSection label="In session" labelledBy="photos-heading" tone="chalk-2">
          <h2 id="photos-heading" className="sr-only">
            Photos from sessions
          </h2>
          <SessionPhotos photos={site.sessionPhotos} />
        </LogSection>
      ) : null}

      <AskBand />
    </>
  );
}
