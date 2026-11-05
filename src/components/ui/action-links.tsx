import type { ReactNode } from "react";
import { Icon } from "./icon";
import { SmartLink } from "./smart-link";

// Text-node structure matters for pixel parity with the original markup:
// a string label renders as ONE text node including the space before the icon,
// while a fragment label (e.g. <>Call {phone}</>) keeps its own text nodes and
// gets a separate " " node, exactly as the original JSX did.

type ButtonLinkProps = {
  href: string;
  label: string;
  /** Lime by default; `dark` and `light` match `.button-dark` / `.button-light`. */
  variant?: "dark" | "light";
};

export function ButtonLink({ href, label, variant }: ButtonLinkProps) {
  return (
    <SmartLink className={variant ? `button button-${variant}` : "button"} href={href}>
      {`${label} `}
      <Icon name="arrow" />
    </SmartLink>
  );
}

type TextLinkProps = {
  href: string;
  label: ReactNode;
  /** Underlined links carry a trailing arrow unless turned off. */
  arrow?: boolean;
};

export function TextLink({ href, label, arrow = true }: TextLinkProps) {
  if (!arrow) {
    return (
      <SmartLink className="text-link" href={href}>
        {label}
      </SmartLink>
    );
  }
  return (
    <SmartLink className="text-link" href={href}>
      {typeof label === "string" ? `${label} ` : <>{label} </>}
      <Icon name="arrow" />
    </SmartLink>
  );
}
