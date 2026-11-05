import { ClosingCta } from "@/components/sections/closing-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { ServiceDirectory } from "@/components/services/service-directory";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Our services", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE CARE GOES A LONG WAY"
        title="Your lawn. The right kind of help."
        text="Repair what’s not working, plan a new system, or prepare for the next season. Explore your starting point."
      />
      <ServiceDirectory />
      <ClosingCta />
    </>
  );
}
