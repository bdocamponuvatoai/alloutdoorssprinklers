import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/action-links";
import { Icon } from "@/components/ui/icon";
import { ListNumber } from "@/components/ui/list-number";
import type { Service } from "@/content/services";

export function ServiceIntro({ service }: { service: Service }) {
  return (
    <section className="service-intro section">
      <div>
        <Link className="back-link" href="/services">
          ← All services
        </Link>
        <p className="eyebrow">{service.tag}</p>
        <h1>{service.name}.</h1>
        <p>{service.intro}</p>
        <ButtonLink href={`/contact?service=${service.slug}`} label="Let’s talk about it" />
      </div>
      <figure>
        <Image
          src={service.image}
          alt={`Illustrative ${service.name.toLowerCase()} concept`}
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>Illustrative service concept</figcaption>
      </figure>
    </section>
  );
}

export function ServiceDetails({ service }: { service: Service }) {
  return (
    <section className="service-details section">
      <div>
        <p className="eyebrow">A GOOD PLACE TO START</p>
        <h2>
          What would you
          <br />
          like help with?
        </h2>
        <p>
          Tell us about your property and system. The exact work, pricing, and timing are discussed
          directly with John.
        </p>
      </div>
      <ul>
        {service.items.map((item, i) => (
          <li key={item}>
            <span>
              <ListNumber n={i + 1} />
            </span>
            {item}
            <Icon name="droplet" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServiceProcess({ service }: { service: Service }) {
  return (
    <section className="service-process section">
      <p className="eyebrow">YOUR NEXT STEPS</p>
      <h2>A simple way forward.</h2>
      <ol>
        {service.steps.map((step, i) => (
          <li key={step}>
            <span>
              <ListNumber n={i + 1} />
            </span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
