import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/action-links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Preview privacy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="PRIVATE DESIGN PREVIEW"
        title="A little clarity about this preview."
        text="This is a proposed website for All Outdoors Lawn Sprinklers."
      />
      <section className="privacy-copy section">
        <h2>Your enquiry details</h2>
        <p>
          The service enquiry form keeps your entries in the current page’s memory. It does not
          submit them to a server or save them in browser storage. Reloading or leaving the form
          clears its entries.
        </p>
        <p>
          “Open my email app” prepares an email addressed to John using the details you entered.
          Nothing is sent until you send it in your email app. Downloads create a text copy on your
          device.
        </p>
        <h2>Imagery and branding</h2>
        <p>
          The branding is a proposed design. Generated photographs are illustrative concepts, not
          photographs of completed company projects, actual staff, or John.
        </p>
        <h2>Hosting and external services</h2>
        <p>
          The private hosting platform may process access and operational information under its own
          policies. Telephone and email links open the applications configured on your device.
        </p>
        <h2>Company details</h2>
        <p>
          Contact and owner information was supplied for this concept. Little Rock and seasonal care
          references were checked against public business listings. Confirm services, territory,
          scheduling, and terms directly with the business before arranging work.
        </p>
        <TextLink href="/contact" label="Contact John" />
      </section>
    </>
  );
}
