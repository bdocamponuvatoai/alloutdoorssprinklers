import { Suspense } from "react";
import { issues } from "@/content/issues";
import { serviceOptions } from "@/content/services";
import { EMPTY_PRESET } from "@/lib/enquiry";
import { ContactForm } from "./contact-form";
import { PresetContactForm } from "./preset-contact-form";

const issueOptions = issues.map(({ id, name }) => ({ id, name }));

/**
 * The static HTML contains the form with default values (the Suspense
 * fallback); in the browser it is replaced by the version that reads presets.
 */
export function EnquiryForm() {
  return (
    <Suspense fallback={<ContactForm preset={EMPTY_PRESET} services={serviceOptions} />}>
      <PresetContactForm services={serviceOptions} issues={issueOptions} />
    </Suspense>
  );
}
