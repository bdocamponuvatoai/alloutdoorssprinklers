// Builds the enquiry text, email draft link and form presets.
// Pure functions: no React, no browser APIs.

export type EnquiryValues = {
  service: string;
  city: string;
  details: string;
  name: string;
  email: string;
  phone: string;
};

export type EnquiryPreset = Pick<EnquiryValues, "service" | "details">;

const DEFAULT_SERVICE = "sprinkler-repair";
export const DEFAULT_DETAILS = "Please contact me to discuss.";
export const ENQUIRY_FILENAME = "all-outdoors-service-enquiry.txt";
export const EMPTY_PRESET: EnquiryPreset = { service: DEFAULT_SERVICE, details: "" };

type Named = { name: string };

/** Reads `?service=<slug>&issue=<id>` (as linked from the issue guide). Unknown values are ignored. */
export function presetFromParams(
  params: Pick<URLSearchParams, "get">,
  services: readonly (Named & { slug: string })[],
  issues: readonly (Named & { id: string })[],
): EnquiryPreset {
  const requested = params.get("service");
  const issue = issues.find((i) => i.id === params.get("issue"));
  return {
    service: services.some((s) => s.slug === requested) ? requested! : DEFAULT_SERVICE,
    details: issue ? `I’m noticing: ${issue.name}. ` : "",
  };
}

export function enquiryBody(values: EnquiryValues, serviceLabel: string): string {
  return `Hi John,\n\nI’d like to discuss ${serviceLabel.toLowerCase()}.\n\nLocation: ${values.city}\nDetails: ${values.details || DEFAULT_DETAILS}\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || "Not provided"}\n\nPlease let me know the next steps and availability.\nThank you.`;
}

export function enquiryMailto(to: string, serviceLabel: string, body: string): string {
  const subject = encodeURIComponent(`All Outdoors enquiry — ${serviceLabel}`);
  return `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
}
