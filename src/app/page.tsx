import { CareStory } from "@/components/home/care-story";
import { GardenStory } from "@/components/home/garden-story";
import { HeroImage } from "@/components/home/hero-image";
import { HomeIntro } from "@/components/home/home-intro";
import { ProcessSection } from "@/components/home/process-section";
import { IntroStrip, ServicesOverview } from "@/components/home/services-overview";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { IssueFinder } from "@/components/sections/issue-finder";
import { SectionLead } from "@/components/sections/section-lead";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";
import { TextLink } from "@/components/ui/action-links";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/", description: site.description });

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <HeroImage />
      <IntroStrip />
      <ServicesOverview />
      <CareStory />
      <section className="help-section section">
        <SectionLead
          eyebrow="SOMETHING NOT QUITE RIGHT?"
          title={
            <>
              Let’s find your
              <br />
              next step.
            </>
          }
          text="You don’t need to know the name of the part. Just tell us what you’re noticing."
        />
        <IssueFinder />
      </section>
      <GardenStory />
      <ProcessSection />
      <FaqSection
        eyebrow="A LITTLE CLARITY"
        title={
          <>
            Good questions.
            <br />
            Straight answers.
          </>
        }
        action={<TextLink href="/contact" label="Ask John" />}
      />
      <ClosingCta />
      <LocalBusinessJsonLd />
    </>
  );
}
