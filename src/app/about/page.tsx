import type { CSSProperties } from "react";
import { AskBand } from "@/lib/components/ask-band";
import { ComingSoon } from "@/lib/components/coming-soon";
import { LogSection } from "@/lib/components/log-section";
import { CoachPortrait } from "@/lib/components/photos";
import { PlateFace } from "@/lib/components/plate-face";
import { Reveal } from "@/lib/components/reveal";
import { pageMetadata } from "@/lib/metadata";
import { categoryPhrase, ownerLabel, site, whereLine, wherePhrase } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}, a business offering ${categoryPhrase}.`,
  path: "/about",
});

export default function AboutPage() {
  const { owner, location } = site;
  const where = whereLine();
  const wherePhraseText = wherePhrase();
  const hasProfile = Boolean(owner.name || owner.bio?.length);

  return (
    <>
      {/* Intro: type on the left, the plate (or, once supplied, the coach's
          portrait) on the right, running off the edge of the page. */}
      <section aria-labelledby="about-heading" className="relative overflow-x-clip border-b-2 border-iron">
        <div className="container-site log-grid">
          <div className="pt-12 md:pt-16 lg:pr-6 lg:pt-[4.75rem]">
            <p className="label flex items-center gap-3 text-plate-red lg:block">
              <span className="margin-tick lg:hidden" aria-hidden="true" />
              About
            </p>
          </div>
          {/* Top-aligned below lg, where the label sits in its own row above
              the title; centered on the plate once it moves into the margin. */}
          <div className="log-content grid gap-10 pb-14 pt-5 md:grid-cols-12 md:items-start md:pb-20 lg:items-center lg:pt-16">
            <div className="fit-box rise md:col-span-7">
              {/* The name never breaks: it is sized to its column instead */}
              <h1 id="about-heading" className="display fit-name">
                <span className="block">About</span>{" "}
                <span className="block whitespace-nowrap">Willstrength</span>
              </h1>
              <p className="measure-narrow mt-6 text-lead">
                {site.name} offers {categoryPhrase}
                {owner.name ? <>, run by {owner.name}</> : null}
                {wherePhraseText ? <> {wherePhraseText}</> : null}.
              </p>
            </div>
            <div className="md:col-span-5">
              {owner.photo ? (
                <CoachPortrait photo={owner.photo} priority />
              ) : (
                <div
                  className="rise mx-auto w-[72%] max-w-[22rem] md:-mr-[22%] md:w-[118%] md:max-w-none"
                  style={{ "--rise-delay": "140ms" } as CSSProperties}
                >
                  <PlateFace className="block h-auto w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The coach (labelled with the owner's own role word once it is set) */}
      <LogSection label={ownerLabel} labelledBy="coach-heading">
        {hasProfile ? (
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-8">
              <h2 id="coach-heading" className="display text-display-lg">
                {owner.name ?? ownerLabel}
              </h2>
              {owner.role ? <p className="label mt-3 text-plate-blue">{owner.role}</p> : null}
              {owner.bio?.map((paragraph) => (
                <p key={paragraph} className="measure mt-5 text-lead first-of-type:mt-6">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        ) : (
          <Reveal>
            <h2 id="coach-heading" className="sr-only">
              {ownerLabel}
            </h2>
            <ComingSoon title="Coach profile coming soon." as="h3">
              <p>A full introduction is on its way: who runs the sessions, their background and how they coach.</p>
            </ComingSoon>
          </Reveal>
        )}

        {/* Credentials, written as log lines. Hidden until there are some. */}
        {owner.credentials && owner.credentials.length > 0 ? (
          <div className="mt-14">
            <h3 className="label text-graphite">Credentials</h3>
            <Reveal variant="gate" className="mt-4">
              <ol className="border-b border-iron">
                {owner.credentials.map((credential, index) => (
                  <li key={credential} className="log-row" style={{ "--row-delay": `${index * 90}ms` } as CSSProperties}>
                    <p className="log-entry flex items-baseline gap-5 py-4">
                      <span className="label w-6 text-plate-blue" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="font-semibold">{credential}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        ) : null}
      </LogSection>

      {/* Where sessions happen. Hidden until a location or service area is set. */}
      {where ? (
        <LogSection label="Where" labelledBy="where-heading" tone="chalk-2">
          <Reveal>
            <h2 id="where-heading" className="display text-display-lg">
              Where sessions happen
            </h2>
            <address className="mt-6 text-lead not-italic">
              {location?.venue ? <span className="block font-semibold">{location.venue}</span> : null}
              {location?.street ? <span className="block">{location.street}</span> : null}
              {location ? (
                <span className="block">
                  {location.locality}, {location.region}
                  {location.postalCode ? ` ${location.postalCode}` : null}
                </span>
              ) : null}
              {!location && site.serviceArea ? <span className="block">{site.serviceArea}</span> : null}
            </address>
            {location?.mapUrl ? (
              <a href={location.mapUrl} target="_blank" rel="noreferrer" className="text-link mt-3">
                Open in Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </Reveal>
        </LogSection>
      ) : null}

      <AskBand />
    </>
  );
}
