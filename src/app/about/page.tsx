import Image from "next/image";
import gardenLiving from "@/assets/images/garden-living.webp";
import { ClosingCta } from "@/components/sections/closing-cta";
import { OwnerLine } from "@/components/sections/owner-line";
import { PageIntro } from "@/components/sections/page-intro";
import { ButtonLink, TextLink } from "@/components/ui/action-links";
import { site, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About All Outdoors",
  path: "/about",
  image: gardenLiving,
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ALL OUTDOORS LAWN SPRINKLERS"
        title="A small business. A direct conversation."
        text="Your outdoors deserves attention. All Outdoors Lawn Sprinklers connects you with owner John C Virden for sprinkler installation and repair."
      />
      <section className="about-story section">
        <div className="about-image">
          <Image
            src={gardenLiving}
            alt="Illustrative garden concept with lawn and a quiet seating area"
            loading="eager"
          />
          <small className="image-credit">Illustrative landscape concept</small>
        </div>
        <div>
          <p className="eyebrow">MEET YOUR POINT OF CONTACT</p>
          <h2>Start with John.</h2>
          <p>
            From the first description of a problem to a conversation about a new system, there’s a
            simple place to start. Tell John what you need, where your property is, and what you’d
            like to improve.
          </p>
          <OwnerLine role="Owner" />
          <TextLink href={telHref} label={<>Call {site.phone}</>} />
        </div>
      </section>
      <section className="local-section section">
        <div>
          <p className="eyebrow">ROOTED IN LITTLE ROCK</p>
          <h2>
            Let’s talk
            <br />
            about your place.
          </h2>
        </div>
        <div>
          <p>
            All Outdoors is listed in Little Rock, Arkansas. Share your city and ZIP code to confirm
            service at your location.
          </p>
          <ButtonLink variant="dark" href="/contact" label="Ask about your property" />
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
