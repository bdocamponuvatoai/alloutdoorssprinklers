import Link from "next/link";
import { SectionLead } from "@/components/sections/section-lead";
import { Icon } from "@/components/ui/icon";
import { ListNumber } from "@/components/ui/list-number";
import { services } from "@/content/services";

export function IntroStrip() {
  return (
    <div className="intro-strip section">
      <span>INSTALLATION & REPAIR</span>
      <span>SEASONAL SYSTEM CARE</span>
      <span>ONE DIRECT CONVERSATION</span>
    </div>
  );
}

export function ServicesOverview() {
  return (
    <section className="services-section section" id="services">
      <SectionLead
        eyebrow="EVERY LAWN HAS A DIFFERENT STARTING POINT."
        title={
          <>
            Good water.
            <br />
            Great outdoors.
          </>
        }
        text="Whether you’re fixing what’s there or planning what comes next, start with the right kind of help."
      />
      <div className="service-rows">
        {services.map((service, i) => (
          <Link href={`/services/${service.slug}`} className="service-row" key={service.slug}>
            <span className="row-number">
              <ListNumber n={i + 1} />
            </span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <span className="circle-link">
              <Icon name="arrow" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
