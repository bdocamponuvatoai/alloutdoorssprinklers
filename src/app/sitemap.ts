import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { services } from "@/content/services";

export const dynamic = "force-static";

const STATIC_PATHS = ["/", "/services/", "/sprinkler-help/", "/about/", "/contact/", "/privacy/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = services.map(({ slug }) => `/services/${slug}/`);
  return [...STATIC_PATHS, ...servicePaths].map((path) => ({ url: `${siteUrl}${path}` }));
}
