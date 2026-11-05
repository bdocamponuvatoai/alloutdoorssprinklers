import type { StaticImageData } from "next/image";
import gardenLiving from "@/assets/images/garden-living.webp";
import morningLawn from "@/assets/images/morning-lawn.webp";
import sprinklerRepair from "@/assets/images/sprinkler-repair.webp";

export type Service = {
  slug: string;
  name: string;
  /** Eyebrow shown above the service name. */
  tag: string;
  image: StaticImageData;
  intro: string;
  description: string;
  items: readonly string[];
  steps: readonly string[];
};

export const services = [
  {
    slug: "sprinkler-repair",
    name: "Sprinkler repair",
    tag: "FOR THE SYSTEM YOU HAVE",
    image: sprinklerRepair,
    intro:
      "A dry patch. A broken head. A zone that won’t turn on. Start with what you’re seeing, and let’s work toward a practical repair.",
    description:
      "Troubleshooting and repairs for a lawn sprinkler system that isn’t working as it should.",
    items: [
      "Broken or misdirected sprinkler heads",
      "Uneven coverage and persistent dry spots",
      "Visible leaks and pooling water",
      "Zones or controls that aren’t responding",
    ],
    steps: [
      "Describe the problem and where it appears.",
      "Review the system and discuss the recommended work.",
      "Confirm the repair scope and arrange the next step.",
    ],
  },
  {
    slug: "sprinkler-installation",
    name: "New installations",
    tag: "FOR YOUR NEXT OUTDOOR PROJECT",
    image: morningLawn,
    intro:
      "Good irrigation starts with understanding your space. Talk through a new sprinkler system with the layout of your lawn and the way you use it in mind.",
    description: "A conversation about a new lawn sprinkler system, planned around your property.",
    items: [
      "New lawn sprinkler system planning",
      "Lawn layout and coverage needs",
      "Water source and controller considerations",
      "Installation scope and project timing",
    ],
    steps: [
      "Share your location, lawn layout, and goals.",
      "Discuss site conditions and the proposed system.",
      "Review the scope and timing before work begins.",
    ],
  },
  {
    slug: "seasonal-care",
    name: "Seasonal care",
    tag: "FOR THE MONTHS AHEAD",
    image: gardenLiving,
    intro:
      "As the seasons change, your sprinkler system deserves a closer look. Discuss a system check, adjustments, or preparation for colder weather.",
    description: "System check-ups and seasonal service to help keep your irrigation on track.",
    items: [
      "Seasonal system checks",
      "Spray direction and coverage review",
      "Controller schedule questions",
      "Cold-weather preparation and winterization enquiries",
    ],
    steps: [
      "Tell us about your system and seasonal concerns.",
      "Discuss the checks or preparation your property needs.",
      "Arrange service and review any follow-up recommendations.",
    ],
  },
] as const satisfies readonly Service[];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** The minimal shape client components need (keeps long copy out of client JS). */
export type ServiceOption = { slug: string; name: string };

export const serviceOptions: readonly ServiceOption[] = services.map(({ slug, name }) => ({
  slug,
  name,
}));
