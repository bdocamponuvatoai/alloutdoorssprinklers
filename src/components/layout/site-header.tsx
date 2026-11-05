"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { mainNav, site } from "@/config/site";

/** Matches the CSS breakpoint where the menu becomes a dropdown (`max-width: 800px`). */
const DESKTOP_QUERY = "(min-width: 801px)";

function isCurrent(pathname: string, href: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return href === "/services" ? path.startsWith(href) : path === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open only on the page where it was opened, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOnPath(null);
    };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className="site-header">
      <Link className="brand-link" href="/" aria-label={`${site.name} home`}>
        <Brand />
      </Link>
      <nav
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
        id="main-nav"
      >
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-contact">
          {"Get in touch "}
          <Icon name="arrow" />
        </Link>
      </nav>
      <button
        ref={toggleRef}
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenOnPath(open ? null : pathname)}
      >
        {open ? "Close" : "Menu"}
        <span>{open ? "−" : "+"}</span>
      </button>
    </header>
  );
}
