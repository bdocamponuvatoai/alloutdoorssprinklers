"use client";

import { useSearchParams } from "next/navigation";
import type { ServiceOption } from "@/content/services";
import { presetFromParams } from "@/lib/enquiry";
import { ContactForm } from "./contact-form";

type PresetContactFormProps = {
  services: readonly ServiceOption[];
  issues: readonly { id: string; name: string }[];
};

/**
 * Applies `?service=` / `?issue=` presets. Must render inside <Suspense>:
 * search params are only known in the browser for a static export.
 */
export function PresetContactForm({ services, issues }: PresetContactFormProps) {
  const preset = presetFromParams(useSearchParams(), services, issues);
  // A new preset (e.g. client-side navigation to another ?service=) starts a fresh form.
  return (
    <ContactForm key={`${preset.service}|${preset.details}`} preset={preset} services={services} />
  );
}
