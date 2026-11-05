import type { ReactNode } from "react";

type SectionLeadProps = { eyebrow: string; title: ReactNode; text: string };

/** Eyebrow + heading on the left, short supporting copy on the right. */
export function SectionLead({ eyebrow, title, text }: SectionLeadProps) {
  return (
    <div className="section-lead">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
    </div>
  );
}
