import type { MetadataRoute } from "next";
import { hasPublicSiteUrl, isScaffold, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A scaffold (owner details still missing) must not be indexed if it is
  // ever deployed early. Filling site.inquiry and site.owner.name lifts this.
  if (isScaffold) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // The sitemap is only advertised at an address that is really the site's
    ...(hasPublicSiteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
