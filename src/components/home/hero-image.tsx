import Image from "next/image";
import Link from "next/link";
import morningLawn from "@/assets/images/morning-lawn.webp";
import { Icon } from "@/components/ui/icon";

export function HeroImage() {
  return (
    <section className="hero-image">
      <Image
        src={morningLawn}
        alt="Illustrative concept of a lawn sprinkler watering a green residential lawn in morning light"
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-image-shade" />
      <div className="hero-image-caption">
        <span>GOOD MORNINGS START OUT HERE.</span>
        <p>
          Made for a little
          <br />
          more outside.
        </p>
      </div>
      <div className="hero-service-note">
        <Icon name="droplet" />
        <span>
          New system or a familiar problem?
          <br />
          <Link href="/services">
            {"Find the right service "}
            <Icon name="arrow" />
          </Link>
        </span>
      </div>
      <small className="image-credit">Illustrative landscape concept</small>
    </section>
  );
}
