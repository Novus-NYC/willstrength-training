import type { CSSProperties } from "react";
import { AskBand } from "@/lib/components/ask-band";
import { ComingSoon } from "@/lib/components/coming-soon";
import { LogSection } from "@/lib/components/log-section";
import { SessionPhotos } from "@/lib/components/photos";
import { Reveal } from "@/lib/components/reveal";
import { ServiceLog } from "@/lib/components/service-log";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Services",
  description: `Strength training sessions with ${site.name}: each session option with its format, length and price.`,
  path: "/services",
});

/** The log's column heads, printed across the top of the page */
const HEADS = ["Session", "Format", "Length", "Price"];

export default function ServicesPage() {
  const { services, hours } = site;

  return (
    <>
      {/* Intro: the title, then the log's column heads printed across the page */}
      <section aria-labelledby="services-heading" className="border-b-2 border-iron">
        <div className="container-site log-grid">
          <div className="pt-12 md:pt-16 lg:pr-6 lg:pt-[4.75rem]">
            <p className="label flex items-center gap-3 text-plate-red lg:block">
              <span className="margin-tick lg:hidden" aria-hidden="true" />
              Services
            </p>
          </div>
          <div className="log-content pb-14 pt-5 md:pb-20 lg:pt-16">
            <h1 id="services-heading" className="rise display text-display-xl">
              Training sessions
            </h1>
            <p className="rise measure-narrow mt-6 text-lead" style={{ "--rise-delay": "120ms" } as CSSProperties}>
              Every session option at {site.name}, one per line: what it is, how it runs, how long it takes and what it
              costs.
            </p>
            {/* The printed header line of a log page. Decorative: the real
                labels sit with each entry below. */}
            <div
              aria-hidden="true"
              className="label mt-10 grid grid-cols-2 gap-px border-y-2 border-iron bg-plate-rule sm:grid-cols-4"
            >
              {HEADS.map((head, index) => (
                <span key={head} className="flex items-center gap-3 bg-chalk-bright px-4 py-3">
                  <span className="text-plate-blue">{index + 1}</span>
                  {head}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LogSection label="The options" labelledBy="options-heading">
        <h2 id="options-heading" className="sr-only">
          Session options
        </h2>
        {services.length > 0 ? (
          <ServiceLog services={services} />
        ) : (
          <Reveal>
            <ComingSoon title="Session options are being finalized." as="h3">
              <p>Each option will be listed here with its format, length and price as soon as it is confirmed.</p>
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
