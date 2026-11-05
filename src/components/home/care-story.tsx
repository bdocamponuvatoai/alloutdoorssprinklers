import Image from "next/image";
import sprinklerRepair from "@/assets/images/sprinkler-repair.webp";
import { OwnerLine } from "@/components/sections/owner-line";
import { TextLink } from "@/components/ui/action-links";

export function CareStory() {
  return (
    <section className="care-story section">
      <div className="care-photo">
        <Image
          src={sprinklerRepair}
          alt="Illustrative irrigation service scene showing hands fitting a sprinkler head"
        />
        <small className="image-credit">Illustrative service concept</small>
      </div>
      <div className="care-copy">
        <p className="eyebrow">SMALL DETAILS. A BETTER FLOW.</p>
        <h2>
          A lawn you love
          <br />
          starts below
          <br />
          the surface.
        </h2>
        <p>
          Behind a well-watered lawn is a system that needs the right attention. From a damaged head
          to a new installation, All Outdoors gives you a clear place to start.
        </p>
        <TextLink href="/about" label="Get to know All Outdoors" />
        <OwnerLine role="Owner, All Outdoors Lawn Sprinklers" />
      </div>
    </section>
  );
}
