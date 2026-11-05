import "server-only";

// Build-time deployment settings. Server-only: read from the environment
// while `next build` prerenders the static export.

const LOCAL_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = explicit || (vercelProduction ? `https://${vercelProduction}` : LOCAL_URL);
  return url.replace(/\/+$/, "");
}

/** Absolute origin used for canonical URLs, Open Graph, robots.txt and the sitemap. */
export const siteUrl = resolveSiteUrl();

/** Search engines may index the site only when explicitly enabled. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && new URL(siteUrl).hostname === "localhost") {
  throw new Error(
    "SITE_INDEXABLE=true but the site URL is still localhost. Set SITE_URL to the public domain.",
  );
}
