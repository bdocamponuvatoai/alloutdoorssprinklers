import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/action-links";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="page-intro section not-found">
      <p className="eyebrow">404 · A LITTLE OFF THE PATH</p>
      <h1>
        Let’s get you
        <br />
        back outdoors.
      </h1>
      <p>That page isn’t here. Start at home or find the service you need.</p>
      <ButtonLink href="/" label="Back to home" />
    </section>
  );
}
