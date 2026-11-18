import type { MetadataRoute } from "next";
import { hasPublicSiteUrl, isScaffold, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Crawling is always allowed. While the site is a scaffold (no inquiry
  // channel or no owner name), every page sends a noindex meta tag instead
  // (see pageMetadata), and crawlers must be able to fetch a page to read it.
  // A Disallow here would stop crawling but not indexing.
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // The sitemap is only advertised once the site is ready to be indexed,
    // and only at an address that is really the site's.
    ...(!isScaffold && hasPublicSiteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
