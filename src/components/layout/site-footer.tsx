import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { footerNav, mailtoHref, site, telHref } from "@/config/site";

export function SiteFooter() {
  // Rendered at build time; the static export picks up the year it was built.
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" aria-label={`${site.name} home`}>
            <Brand light />
          </Link>
          <p>
            A little care for the lawn.
            <br />A little more life outdoors.
          </p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="footer-contact">
          <h3>Talk with John</h3>
          <a href={telHref}>{site.phone}</a>
          <a href={mailtoHref}>{site.email}</a>
          <p>
            {`${site.locality}, ${site.regionName}`}
            <br />
            <span>Call to confirm your service location.</span>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} All Outdoors Lawn Sprinklers</span>
        <Link href="/privacy">Preview privacy</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
