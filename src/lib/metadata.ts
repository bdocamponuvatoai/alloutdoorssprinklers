import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import morningLawn from "@/assets/images/morning-lawn.webp";
import { site } from "@/config/site";

type PageMetadataInput = {
  /** Page title shown before the brand. Omit for the home page. */
  title?: string;
  /** Route path, e.g. `/services/seasonal-care`. */
  path: string;
  description?: string;
  /** Social share image; defaults to the home hero. */
  image?: StaticImageData;
};

/** Paths always end in `/` because the export uses `trailingSlash: true`. */
function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Title, description, canonical URL and social tags for one page.
 * Relative URLs resolve against `metadataBase`, set in the root layout.
 */
export function pageMetadata({
  title,
  path,
  description = site.pageDescription,
  image = morningLawn,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.homeTitle;
  const url = withTrailingSlash(path);
  const ogImage = { url: image.src, width: image.width, height: image.height };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
