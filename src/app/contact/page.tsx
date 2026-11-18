import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { InquiryButton } from "@/lib/components/inquiry";
import { LogSection } from "@/lib/components/log-section";
import { Reveal } from "@/lib/components/reveal";
import { pageMetadata } from "@/lib/metadata";
import { inquiryLink, site, whereLine } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `How to ask about a strength training session with ${site.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  const link = inquiryLink();
  const { phone, email, instagram, bookingUrl } = site.contact;
  const where = whereLine();
  const hasDetails = Boolean(phone || email || instagram || bookingUrl || where || site.hours?.length);

  return (
    <>
      {/* Split page: the question on iron, the answer on chalk */}
      <section aria-labelledby="contact-heading" className="grid grid-cols-[minmax(0,1fr)] border-b-2 border-iron md:grid-cols-2">
        <div className="on-dark bg-iron text-chalk">
          <div className="ml-auto flex h-full max-w-[39rem] flex-col justify-between gap-10 px-5 pb-12 pt-12 sm:px-8 md:pb-16 md:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
            <div className="rise">
              <p className="label flex items-center gap-3 text-plate-red-bright">
                <span className="margin-tick" style={{ background: "var(--red-bright)" }} aria-hidden="true" />
                Contact
              </p>
              <h1 id="contact-heading" className="display mt-6 text-display-lg">
                Ask about a session.
              </h1>
            </div>
            {/* A loaded bar seen from the front, plates at both ends */}
            <div aria-hidden="true" className="flex items-center">
              <span className="h-[3px] w-6 bg-chalk" />
              <span className="h-14 w-2 bg-plate-blue-bright" style={{ borderRadius: 2 }} />
              <span className="ml-1 h-14 w-[10px] bg-plate-red-bright" style={{ borderRadius: 2 }} />
              <span className="ml-1 h-5 w-1 bg-chalk" style={{ borderRadius: 1 }} />
              <span className="h-[3px] flex-1 bg-chalk" />
              <span className="mr-1 h-5 w-1 bg-chalk" style={{ borderRadius: 1 }} />
              <span className="mr-1 h-14 w-[10px] bg-plate-red-bright" style={{ borderRadius: 2 }} />
              <span className="h-14 w-2 bg-plate-blue-bright" style={{ borderRadius: 2 }} />
              <span className="h-[3px] w-6 bg-chalk" />
            </div>
          </div>
        </div>

        <div>
          <div className="mr-auto flex h-full max-w-[39rem] flex-col justify-center px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-20">
            {link ? (
              <div className="rise" style={{ "--rise-delay": "120ms" } as CSSProperties}>
                <div className="flex items-center justify-between gap-4 border-y-2 border-iron py-3">
                  <p className="label">Inquiry status</p>
                  <p className="label text-plate-blue">Open</p>
                </div>
                <h2 className="display mt-8 text-display-md">{link.heading}</h2>
                {link.detail ? <p className="mt-3 [overflow-wrap:anywhere] text-lead text-graphite">{link.detail}</p> : null}
                <div className="mt-8">
                  <InquiryButton className="btn-primary w-full sm:w-auto" />
                </div>
              </div>
            ) : (
              <div className="rise" style={{ "--rise-delay": "120ms" } as CSSProperties}>
                <div className="flex items-center justify-between gap-4 border-y-2 border-iron py-3">
                  <p className="label">Inquiry status</p>
                  <p className="label text-plate-blue">Opening soon</p>
                </div>
                <h2 className="display mt-8 text-display-md">Inquiries open soon.</h2>
                <p className="measure-narrow mt-4 text-lead text-graphite">
                  The way to ask about sessions is being set up. Check back here soon.
                </p>
                <p className="mt-8 font-semibold">In the meantime</p>
                <ul className="mt-1">
                  <li>
                    <Link href="/services" className="text-link">
                      See session options
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-link">
                      About {site.name}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Every verified way to reach the business. Hidden until there is one. */}
      {hasDetails ? (
        <LogSection label="Reach" labelledBy="details-heading">
          <Reveal>
            <h2 id="details-heading" className="display text-display-lg">
              Contact details
            </h2>
            <dl className="mt-8 border-b border-iron">
              {phone ? (
                <DetailRow term="Phone">
                  <a href={`tel:${phone.e164}`} className="text-link whitespace-nowrap">
                    {phone.display}
                  </a>
                </DetailRow>
              ) : null}
              {email ? (
                <DetailRow term="Email">
                  <a href={`mailto:${email}`} className="text-link break-all">
                    {email}
                  </a>
                </DetailRow>
              ) : null}
              {instagram ? (
                <DetailRow term="Instagram">
                  <a href={instagram.url} target="_blank" rel="noreferrer" className="text-link">
                    {instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </DetailRow>
              ) : null}
              {bookingUrl ? (
                <DetailRow term="Booking">
                  <a href={bookingUrl} target="_blank" rel="noreferrer" className="text-link">
                    Open the booking page
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </DetailRow>
              ) : null}
              {where ? <DetailRow term="Where">{where}</DetailRow> : null}
              {site.hours?.map((row) => (
                <DetailRow key={row.days} term={row.days}>
                  {row.times}
                </DetailRow>
              ))}
            </dl>
          </Reveal>
        </LogSection>
      ) : null}
    </>
  );
}

function DetailRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-iron py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center sm:gap-6">
      <dt className="label text-graphite">{term}</dt>
      <dd className="font-semibold">{children}</dd>
    </div>
  );
}
