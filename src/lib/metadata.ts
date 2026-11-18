import type { Metadata } from "next";
import { categoryPhrase, isScaffold, site, siteUrl } from "@/lib/site";

export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT = `${site.name}: ${categoryPhrase}`;

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, for example "/services" */
  path: string;
  /** Override the shared Open Graph image (path under the site root) */
  image?: string;
  /** Use the title as given, without the site name suffix */
  absoluteTitle?: boolean;
};

/**
 * Per-route metadata: title, description, canonical URL, Open Graph and
 * Twitter cards. Every route calls this so none inherits og:url "/".
 *
 * While the site is a scaffold (no inquiry channel or no owner name), every
 * route also sends noindex, nofollow. robots.txt allows crawling in that
 * state on purpose, because a crawler can only obey a noindex it can read.
 * The 404 does not call this: Next.js already marks it noindex.
 */
export function pageMetadata({ title, description, path, image, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${image ?? OG_IMAGE_PATH}`;

  return {
    title: fullTitle,
    description,
    ...(isScaffold ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: canonical,
      title: fullTitle,
      description,
      images: [{ url: imageUrl, width: OG_IMAGE_SIZE.width, height: OG_IMAGE_SIZE.height, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
