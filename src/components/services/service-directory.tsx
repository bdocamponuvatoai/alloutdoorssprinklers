import Image from "next/image";
import Link from "next/link";
import { TextLink } from "@/components/ui/action-links";
import { ListNumber } from "@/components/ui/list-number";
import { services } from "@/content/services";

export function ServiceDirectory() {
  return (
    <section className="service-directory section">
      {services.map((service, i) => {
        const href = `/services/${service.slug}`;
        return (
          <article key={service.slug}>
            <Link className="directory-image" href={href}>
              <Image
                src={service.image}
                alt={`Illustrative ${service.name.toLowerCase()} concept`}
              />
              <small>Illustrative service concept</small>
            </Link>
            <div>
              <p className="eyebrow">
                <ListNumber n={i + 1} /> / {service.tag}
              </p>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <TextLink href={href} label="Explore this service" />
            </div>
          </article>
        );
      })}
    </section>
  );
}
