import Link from "next/link";
import { InquiryButton } from "@/lib/components/inquiry";
import { Reveal } from "@/lib/components/reveal";
import { inquiryLink } from "@/lib/site";

/**
 * The closing call to action on Home, About and Services. With an inquiry
 * channel set (site.inquiry or a contact detail) it shows the inquiry button.
 * Until then it says plainly that inquiries open soon and links to the
 * Contact page, never a dead button.
 */
export function AskBand() {
  const link = inquiryLink();

  return (
    <section aria-labelledby="ask-heading" className="border-t-2 border-iron bg-chalk-2">
      <div className="container-site grid gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-10">
        <Reveal className="lg:col-span-7">
          <p className="label text-plate-red">Last entry</p>
          <h2 id="ask-heading" className="display mt-4 text-display-lg">
            Ask about a session.
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={120}>
          {link ? (
            <>
              <p className="text-lead font-semibold">{link.heading}</p>
              {link.detail ? <p className="mt-1 [overflow-wrap:anywhere] text-graphite">{link.detail}</p> : null}
              <div className="mt-5">
                <InquiryButton />
              </div>
            </>
          ) : (
            <>
              <p className="text-lead font-semibold">Inquiries open soon.</p>
              <p className="measure-narrow mt-2 text-graphite">
                The way to ask about sessions is being set up.
              </p>
              <Link href="/contact" className="btn-secondary mt-5">
                Go to Contact
              </Link>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
