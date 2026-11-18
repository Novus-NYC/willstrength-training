import type { CSSProperties } from "react";
import Link from "next/link";
import { AskBand } from "@/lib/components/ask-band";
import { BarbellLockup } from "@/lib/components/barbell-lockup";
import { PrimaryAction } from "@/lib/components/inquiry";
import { LogSection } from "@/lib/components/log-section";
import { CoachPortrait, SessionPhotos } from "@/lib/components/photos";
import { Reveal } from "@/lib/components/reveal";
import { ServiceLog } from "@/lib/components/service-log";
import { pageMetadata } from "@/lib/metadata";
import { category, categoryPhrase, ownerLabel, site, whereLine } from "@/lib/site";

/** Session options are only promised once site.services has some */
const hasServices = site.services.length > 0;

export const metadata = pageMetadata({
  title: `${site.name} | ${category}`,
  description: hasServices
    ? `${site.name} offers ${categoryPhrase}. See the session options, read about the business and find out how to ask about a session.`
    : `${site.name} offers ${categoryPhrase}. Read about the business and find out how to ask about a session.`,
  path: "/",
  absoluteTitle: true,
});

/** The contents page of the log: where each part of the site lives */
const CONTENTS = [
  { href: "/about", page: "About", note: `The person behind ${site.name}.` },
  {
    href: "/services",
    page: "Services",
    note: hasServices ? "The session options, one per line." : "Session options, once confirmed.",
  },
  { href: "/contact", page: "Contact", note: "How to ask about a session." },
];

export default function HomePage() {
  const where = whereLine();
  const { owner } = site;
  const previewServices = site.services.slice(0, 3);

  return (
    <>
      {/* Hero: the first page of the log. The name is the load on the bar. */}
      <section aria-labelledby="hero-heading" className="overflow-x-clip">
        <div className="container-site log-grid">
          <div className="hidden lg:block lg:pr-6 lg:pt-16">
            <p className="label text-plate-red">Page 1</p>
          </div>
          <div className="log-content pb-12 pt-8 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14">
            <h1 id="hero-heading">
              <span className="sr-only">{site.name}</span>
              <BarbellLockup />
            </h1>

            {/* Value line and actions sit side by side only from xl. Below
                that the buttons' auto column squeezes the value line. */}
            <div className="rise mt-8 grid gap-6 md:mt-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end xl:gap-10" style={{ "--rise-delay": "200ms" } as CSSProperties}>
              <div>
                <p className="text-[1.375rem] font-semibold leading-snug md:text-[1.625rem]" style={{ fontStretch: "112%" }}>
                  {category}.
                </p>
                {where ? <p className="mt-1 text-lead text-graphite">{where}</p> : null}
              </div>
              <div className="grid gap-3 sm:flex sm:flex-wrap">
                <PrimaryAction />
                {hasServices ? (
                  <Link href="/services" className="btn-secondary">
                    See session options
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The contents page, chalk on iron like a gym board */}
      <section aria-labelledby="contents-heading" className="on-dark bg-iron text-chalk">
        <div className="container-site log-grid">
          <div className="pt-14 md:pt-20 lg:pr-6 lg:pt-[5.75rem]">
            <p className="label flex items-center gap-3 text-plate-red-bright lg:block">
              <span className="margin-tick lg:hidden" style={{ background: "var(--red-bright)" }} aria-hidden="true" />
              Contents
            </p>
          </div>
          <div className="pb-16 pt-5 md:pb-24 lg:border-l-2 lg:border-plate-red-bright lg:pl-12 lg:pt-20">
            <Reveal>
              <h2 id="contents-heading" className="display text-display-lg">
                What&rsquo;s in the log
              </h2>
            </Reveal>
            <Reveal variant="gate" className="mt-10">
              <ol className="border-b border-iron-line">
                {CONTENTS.map((entry, index) => (
                  <li
                    key={entry.href}
                    className="log-row"
                    style={{ "--row-delay": `${index * 110}ms` } as CSSProperties}
                  >
                    <Link
                      href={entry.href}
                      className="log-entry group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-6 sm:grid-cols-[3rem_minmax(0,16rem)_minmax(0,1fr)_auto] sm:gap-x-6 md:py-8"
                    >
                      <span className="label text-plate-blue-bright" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="display text-display-md transition-colors group-hover:text-plate-red-bright">{entry.page}</span>
                      <span className="col-start-2 text-steel sm:col-start-auto">{entry.note}</span>
                      <span
                        aria-hidden="true"
                        className="col-start-3 row-span-2 row-start-1 flex h-11 w-11 items-center justify-center border-2 border-chalk transition-colors group-hover:border-plate-red-bright group-hover:bg-plate-red-bright group-hover:text-iron sm:col-start-auto sm:row-span-1"
                        style={{ borderRadius: 2 }}
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" focusable="false">
                          <path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The coach, once named. Renders nothing until site.owner.name is set. */}
      {owner.name ? (
        <LogSection label={ownerLabel} labelledBy="coach-heading">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-7">
              <h2 id="coach-heading" className="display text-display-lg">
                {owner.name}
              </h2>
              {owner.role ? <p className="label mt-3 text-plate-blue">{owner.role}</p> : null}
              {owner.bio?.[0] ? <p className="measure mt-6 text-lead">{owner.bio[0]}</p> : null}
              <Link href="/about" className="text-link mt-4">
                More about {owner.name}
              </Link>
            </Reveal>
            {owner.photo ? (
              <Reveal className="md:col-span-5" delay={120}>
                <CoachPortrait photo={owner.photo} />
              </Reveal>
            ) : null}
          </div>
        </LogSection>
      ) : null}

      {/* Session options, once confirmed. Renders nothing while the list is empty. */}
      {previewServices.length > 0 ? (
        <LogSection label="Sessions" labelledBy="sessions-heading" tone="chalk-2">
          <Reveal>
            <h2 id="sessions-heading" className="display text-display-lg">
              Sessions
            </h2>
          </Reveal>
          <div className="mt-10">
            <ServiceLog services={previewServices} />
          </div>
          <Link href="/services" className="text-link mt-6">
            All session details
          </Link>
        </LogSection>
      ) : null}

      {/* Session photos, once supplied. Renders nothing while there are none. */}
      {site.sessionPhotos.length > 0 ? (
        <LogSection label="In session" labelledBy="photos-heading">
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
