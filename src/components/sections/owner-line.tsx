import { site } from "@/config/site";

/** Typographic monogram (not a photo) with the owner's name and role. */
export function OwnerLine({ role }: { role: string }) {
  return (
    <div className="owner-line">
      <span className="owner-monogram">JV</span>
      <span>
        <strong>{site.owner}</strong>
        <small>{role}</small>
      </span>
    </div>
  );
}
