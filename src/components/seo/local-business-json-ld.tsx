import { siteUrl } from "@/config/deployment";
import { site } from "@/config/site";

/**
 * schema.org LocalBusiness data. Only facts already published on the site:
 * no street address, hours, prices, ratings or service area claims.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${siteUrl}/`,
    description: site.description,
    telephone: site.tel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "US",
    },
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script element early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
