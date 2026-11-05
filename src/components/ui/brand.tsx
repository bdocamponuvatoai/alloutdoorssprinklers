/** Sprinkler-arc mark plus the "all outdoors." wordmark. */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={light ? "brand brand-light" : "brand"}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M6 27a18 18 0 0 1 36 0M13 27a11 11 0 0 1 22 0M20 27a4 4 0 0 1 8 0" />
        <path d="M24 29v12M7 36h10M31 36h10" />
        <circle cx="24" cy="5" r="2" />
      </svg>
      <span>
        <strong>
          all outdoors<span className="brand-period">.</span>
        </strong>
        <small>LAWN SPRINKLERS</small>
      </span>
    </span>
  );
}
