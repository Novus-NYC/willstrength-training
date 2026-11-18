import type { Metadata } from "next";
import { category, site, siteUrl } from "@/lib/site";

export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_ALT = `${site.name}: ${category.toLowerCase()}`;

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
 */
export function pageMetadata({ title, description, path, image, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${image ?? OG_IMAGE_PATH}`;

  return {
    title: fullTitle,
    description,
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
