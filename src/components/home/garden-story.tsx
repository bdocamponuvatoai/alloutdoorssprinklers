import Image from "next/image";
import gardenLiving from "@/assets/images/garden-living.webp";
import { ButtonLink } from "@/components/ui/action-links";

export function GardenStory() {
  return (
    <section className="garden-story">
      <Image
        src={gardenLiving}
        alt="Illustrative concept of a quiet backyard garden with a green lawn and a curved stone path"
      />
      <div>
        <p className="eyebrow">THE REASON BEHIND THE ROUTINE</p>
        <h2>
          More living.
          <br />
          Less lawn-worrying.
        </h2>
        <p>A better outdoor space begins with the everyday things working well.</p>
        <ButtonLink variant="light" href="/services/seasonal-care" label="Explore seasonal care" />
      </div>
      <small className="image-credit">Illustrative landscape concept</small>
    </section>
  );
}
