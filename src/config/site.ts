// Business details and navigation. Safe to import from client components:
// nothing here depends on the environment.

export const site = {
  name: "All Outdoors Lawn Sprinklers",
  owner: "John C Virden",
  phone: "(501) 772-5342",
  tel: "+15017725342",
  email: "johncvirden@gmail.com",
  locality: "Little Rock",
  region: "AR",
  regionName: "Arkansas",
  homeTitle: "All Outdoors Lawn Sprinklers | A greener lawn. A little less effort.",
  description:
    "Sprinkler installation, repair and seasonal care in Little Rock, Arkansas. Talk with John C Virden about your lawn sprinkler system.",
  pageDescription:
    "Lawn sprinkler installation, repair, and seasonal service. Talk with All Outdoors Lawn Sprinklers in Little Rock, Arkansas.",
  themeColor: "#fafbf7",
} as const;

export const telHref = `tel:${site.tel}`;
export const mailtoHref = `mailto:${site.email}`;

type NavLink = { href: string; label: string };

/** Header navigation; `/services` also marks its child service pages as current. */
export const mainNav = [
  { href: "/services", label: "Our services" },
  { href: "/sprinkler-help", label: "Sprinkler help" },
  { href: "/about", label: "About All Outdoors" },
] as const satisfies readonly NavLink[];

export const footerNav = [
  {
    title: "How we can help",
    links: [
      { href: "/services/sprinkler-repair", label: "Sprinkler repair" },
      { href: "/services/sprinkler-installation", label: "New installations" },
      { href: "/services/seasonal-care", label: "Seasonal care" },
    ],
  },
  {
    title: "Around here",
    links: [
      { href: "/about", label: "About All Outdoors" },
      { href: "/sprinkler-help", label: "Find your next step" },
      { href: "/contact", label: "Request service" },
    ],
  },
] as const satisfies readonly { title: string; links: readonly NavLink[] }[];
