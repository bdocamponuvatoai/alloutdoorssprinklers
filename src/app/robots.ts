import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/config/deployment";

export const dynamic = "force-static";

/** Blocks all crawlers until SITE_INDEXABLE=true (owner approval). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
