import Link from "next/link";
import { Wordmark } from "@/lib/components/brand-mark";
import { InquiryButton } from "@/lib/components/inquiry";
import { category, navLinks, site, whereLine } from "@/lib/site";

const FOOTER_LINK =
  "inline-flex min-h-[44px] items-center gap-2 text-chalk underline-offset-4 hover:text-plate-red-bright hover:underline";

/**
 * Footer. Every contact line reads site.ts and renders nothing while its
 * value is null, so only verified details ever appear here.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, instagram, bookingUrl } = site.contact;
  const where = whereLine();
  const hasContact = Boolean(phone || email || instagram || bookingUrl || site.inquiry);

  return (
    <footer className="on-dark border-t border-iron-line bg-iron text-chalk">
      <div className="container-site grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="md:col-span-12 lg:col-span-5">
          <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label={`${site.name}, home`}>
            <Wordmark tone="dark" size="footer" />
          </Link>
          <p className="mt-5 text-lead">{category}</p>
          {where ? <p className="mt-1 text-steel">{where}</p> : null}
        </div>

        <nav aria-label="Footer" className="md:col-span-6 lg:col-span-3">
          <h2 className="label text-steel">Pages</h2>
          <ul className="mt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={FOOTER_LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-6 lg:col-span-4">
          <h2 className="label text-steel">Ask about a session</h2>
          {hasContact ? (
            <ul className="mt-3">
              {site.inquiry ? (
                <li className="mb-3">
                  <InquiryButton className="btn-primary btn-compact" />
                </li>
              ) : null}
              {phone ? (
                <li>
                  <a href={`tel:${phone.e164}`} className={`${FOOTER_LINK} whitespace-nowrap`}>
                    {phone.display}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className={`${FOOTER_LINK} break-all`}>
                    {email}
                  </a>
                </li>
              ) : null}
              {instagram ? (
                <li>
                  <a href={instagram.url} target="_blank" rel="noreferrer" className={FOOTER_LINK}>
                    Instagram {instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              {bookingUrl ? (
                <li>
                  <a href={bookingUrl} target="_blank" rel="noreferrer" className={FOOTER_LINK}>
                    Booking page
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-3 text-steel">
              Inquiries open soon.{" "}
              <Link href="/contact" className="text-chalk underline decoration-plate-red-bright decoration-2 underline-offset-4 hover:text-plate-red-bright">
                Contact page
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-iron-line">
        <div className="container-site flex flex-col gap-1 py-4 text-base sm:flex-row sm:items-center sm:justify-between">
          <p className="text-steel">
            © {year} {site.legalName ?? site.name}
          </p>
          {/* The link text must be exactly "Made by Novus", so the new-tab note
              is attached with aria-describedby instead of sitting inside it. */}
          <a
            href="https://novusnyc.org"
            target="_blank"
            rel="noreferrer"
            aria-describedby="novus-new-tab"
            className={FOOTER_LINK}
          >
            Made by Novus
          </a>
          <span id="novus-new-tab" className="sr-only">
            Opens in a new tab
          </span>
        </div>
      </div>
    </footer>
  );
}
