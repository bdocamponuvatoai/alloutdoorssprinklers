import { ButtonLink, TextLink } from "@/components/ui/action-links";
import { site, telHref } from "@/config/site";

/** Closing call to action shown at the end of most pages. */
export function ClosingCta() {
  return (
    <section className="closing">
      <div className="closing-ring" aria-hidden="true" />
      <p className="eyebrow">MORE TIME ENJOYING. LESS TIME WORRYING.</p>
      <h2>
        Let’s take care
        <br />
        of your outdoors.
      </h2>
      <div className="closing-actions">
        <ButtonLink variant="dark" href="/contact" label="Start a conversation" />
        <TextLink href={telHref} label={<>Or call {site.phone}</>} arrow={false} />
      </div>
    </section>
  );
}
