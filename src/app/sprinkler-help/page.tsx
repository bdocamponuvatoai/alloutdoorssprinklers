import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { IssueFinder } from "@/components/sections/issue-finder";
import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/action-links";
import { Icon } from "@/components/ui/icon";
import { site, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Find your next step", path: "/sprinkler-help" });

export default function SprinklerHelpPage() {
  return (
    <>
      <PageIntro
        eyebrow="NO TECHNICAL TERMS NEEDED"
        title="What’s happening out there?"
        text="Choose the closest match. We’ll help you put the issue into words so you can start a useful conversation with John."
      />
      <section className="section help-page">
        <IssueFinder />
        <div className="call-note">
          <Icon name="droplet" />
          <div>
            <h3>Need to talk about an active issue?</h3>
            <p>Call John to discuss what’s happening and check availability.</p>
          </div>
          <TextLink href={telHref} label={<>{site.phone}</>} />
        </div>
      </section>
      <FaqSection
        eyebrow="BEFORE YOU GET IN TOUCH"
        title={
          <>
            A few helpful
            <br />
            answers.
          </>
        }
      />
      <ClosingCta />
    </>
  );
}
