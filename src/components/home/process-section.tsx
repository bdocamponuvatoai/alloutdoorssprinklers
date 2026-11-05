import { TextLink } from "@/components/ui/action-links";
import { telHref } from "@/config/site";

// Numbers are literal single text nodes here, as in the original markup.
const steps = [
  {
    number: "01",
    title: "Tell us about your outdoors.",
    text: "A repair, a new system, or a seasonal check. Share your location and what you have in mind.",
  },
  {
    number: "02",
    title: "Talk through what’s needed.",
    text: "Discuss the system, the property, and the work involved with John.",
  },
  {
    number: "03",
    title: "Make a plan together.",
    text: "Confirm the scope, availability, and next steps directly before any work is arranged.",
  },
];

export function ProcessSection() {
  return (
    <section className="process-section section">
      <div>
        <p className="eyebrow">KEEPING IT SIMPLE</p>
        <h2>
          From first call
          <br />
          to next step.
        </h2>
        <TextLink href={telHref} label="Start with a call" />
      </div>
      <ol>
        {steps.map((step) => (
          <li key={step.title}>
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
