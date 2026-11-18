import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}`,
  description: `That page is not on the ${site.name} site. Head back to the home page, the session options or the Contact page.`,
  robots: { index: false, follow: false },
};

/**
 * 404. Rendered on the server inside the root layout, so it has the site
 * header and footer, a title, one h1 and a main, and works without
 * JavaScript.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="border-b-2 border-iron">
      <div className="container-site log-grid">
        <div className="pt-12 md:pt-16 lg:pr-6 lg:pt-[4.75rem]">
          <p className="label flex items-center gap-3 text-plate-red lg:block">
            <span className="margin-tick lg:hidden" aria-hidden="true" />
            Error 404
          </p>
        </div>
        <div className="log-content flex min-h-[55vh] flex-col justify-center pb-16 pt-5 md:pb-24 lg:pt-16">
          <h1 id="not-found-heading" className="display text-display-xl">
            No entry on this page.
          </h1>
          <p className="measure-narrow mt-6 text-lead">
            That page is not here. It may have moved, or the link may be mistyped.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/services" className="btn-secondary">
              Session options
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
