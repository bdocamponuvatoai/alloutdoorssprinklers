import Image from "next/image";
import morningLawn from "@/assets/images/morning-lawn.webp";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { mailtoHref, site, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Talk with John", path: "/contact" });

export default function ContactPage() {
  return (
    <section className="contact-layout section">
      <aside>
        <p className="eyebrow">A BETTER FLOW STARTS HERE</p>
        <h1>
          Tell us about
          <br />
          your outdoors.
        </h1>
        <p>A repair, a new installation, or just a question. Let’s find your next step.</p>
        <div className="contact-links">
          <span>CALL JOHN</span>
          <a href={telHref}>{site.phone}</a>
          <span>PREFER EMAIL?</span>
          <a className="email-link" href={mailtoHref}>
            {site.email}
          </a>
          <span>BASED IN LITTLE ROCK, AR</span>
          <p>Include your city and ZIP code so John can confirm service availability.</p>
        </div>
        <div className="contact-image">
          <Image
            src={morningLawn}
            alt="Illustrative lawn sprinkler in morning light"
            loading="eager"
          />
          <small>Illustrative landscape concept</small>
        </div>
      </aside>
      <EnquiryForm />
    </section>
  );
}
