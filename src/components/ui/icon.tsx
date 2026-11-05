type IconName = "arrow" | "droplet";

/** Decorative inline icons; sized and coloured by the surrounding CSS. */
export function Icon({ name }: { name: IconName }) {
  if (name === "arrow") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M8 15a4 4 0 0 0 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
