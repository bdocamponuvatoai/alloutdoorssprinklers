// "What are you noticing?" guide used on the home and sprinkler-help pages.
// Each issue links to the enquiry form with its service and issue preselected.

type Issue = {
  id: string;
  name: string;
  title: string;
  text: string;
  service: string;
};

export const issues = [
  {
    id: "dry-spots",
    name: "Dry spots",
    title: "Let’s look at the coverage.",
    text: "Tell John which parts of the lawn stay dry, whether nearby heads are spraying, and when you first noticed the change.",
    service: "sprinkler-repair",
  },
  {
    id: "broken-head",
    name: "Broken sprinkler",
    title: "A small part can make a big difference.",
    text: "Note where the damaged sprinkler is and what happens when that zone runs. A photo can be useful when you contact John.",
    service: "sprinkler-repair",
  },
  {
    id: "leak",
    name: "Pooling water",
    title: "Show us where water is collecting.",
    text: "Share the location, whether water appears while the system is off, and how long you’ve noticed it. Call John to discuss an active leak.",
    service: "sprinkler-repair",
  },
  {
    id: "controls",
    name: "System won’t start",
    title: "Start with what the system is doing.",
    text: "Tell us whether the whole system or just one zone is affected, and whether the controller shows a message. Include its brand or model if you know it.",
    service: "sprinkler-repair",
  },
  {
    id: "new-system",
    name: "Planning a system",
    title: "Let’s make a plan for your lawn.",
    text: "Share your property location, the areas you want watered, and your preferred timing. A rough lawn layout is a helpful starting point.",
    service: "sprinkler-installation",
  },
] as const satisfies readonly Issue[];
