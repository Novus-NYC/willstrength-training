import type { MetadataRoute } from "next";
import { navLinks, siteUrl } from "@/lib/site";

/** No lastModified: a build-time stamp would claim changes that did not happen. */
export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: link.href === "/" ? siteUrl : `${siteUrl}${link.href}`,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
