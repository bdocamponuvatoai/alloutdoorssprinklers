import type { ReactNode } from "react";
import { ListNumber } from "@/components/ui/list-number";
import { faqs } from "@/content/faqs";

type FaqSectionProps = {
  eyebrow: string;
  title: ReactNode;
  /** Optional link under the heading. */
  action?: ReactNode;
};

/** Frequently asked questions as native disclosure widgets. */
export function FaqSection({ eyebrow, title, action }: FaqSectionProps) {
  return (
    <section className="faq-section section">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {action}
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <details key={faq.question}>
            <summary>
              <span>
                <ListNumber n={i + 1} />
              </span>
              {faq.question}
              <b>+</b>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
