/**
 * List numbering ("01", "02"…). The leading zero and the digit are separate
 * text nodes, exactly as the original markup rendered them: merging them into
 * one string shifts the following glyphs by a sub-pixel in Chrome.
 */
export function ListNumber({ n }: { n: number }) {
  return <>0{n}</>;
}
