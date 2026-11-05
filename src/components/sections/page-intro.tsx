type PageIntroProps = { eyebrow: string; title: string; text: string };

/** Heading block at the top of the inner pages. */
export function PageIntro({ eyebrow, title, text }: PageIntroProps) {
  return (
    <section className="page-intro section">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
