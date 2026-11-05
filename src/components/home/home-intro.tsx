import { ButtonLink } from "@/components/ui/action-links";
import { site, telHref } from "@/config/site";

export function HomeIntro() {
  return (
    <section className="home-intro section">
      <div className="intro-heading">
        <p className="eyebrow">
          <span className="status-dot" />
          {" LITTLE ROCK, AR · LAWN IRRIGATION"}
        </p>
        <h1>
          A greener lawn.
          <br />
          <span>A little less effort.</span>
        </h1>
      </div>
      <div className="intro-aside">
        <p>
          Sprinkler installation and repair,
          <br />
          {" with your outdoors in mind."}
        </p>
        <ButtonLink href="/contact" label="Let’s get it flowing" />
        <a className="intro-phone" href={telHref}>
          Talk with John · {site.phone}
        </a>
      </div>
    </section>
  );
}
