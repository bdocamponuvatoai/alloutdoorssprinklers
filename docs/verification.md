# Verification

Migration of the original ChatGPT "Sites" build (Next-style App Router code run by
vinext 1.0.0-beta.5 on a Cloudflare Worker) to a standard Next.js 16.4.5 static export.
Measured on 6 November 2026, Windows 11, Google Chrome (system install) driven by
playwright-core 1.65.0.

## Method

- **Baseline:** the untouched original source, installed with its own lockfile (pnpm 11.25.0),
  built with `vinext build` and served by `wrangler dev --local`.
- **New site:** `npm run build` output (`out/`) served by a small static server that maps
  `/path/` to `path/index.html` and returns `404.html` with status 404.
- **Capture:** reduced motion, device scale factor 1, every `<img>` forced eager and
  `img.decode()` awaited, `document.fonts.ready` awaited, two animation frames, then full-page
  screenshots repeated until two consecutive captures are byte-identical. Software
  rasterisation (`--disable-gpu`) because GPU raster produced slightly different LCD
  anti-aliasing between captures of the same page.
- **Control:** baseline compared against itself: 66/66 identical, so the capture adds no noise.
- **Comparison:** pixelmatch (threshold 0.1). On a mismatch both sides are re-captured, up to
  three rounds; every round is logged.

## Results before content changes (Phase 4)

| Check                                                                                                  | Result                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`, `npm run check` (typecheck, lint, format)                                             | Pass                                                                                                                                                                        |
| Pixel diff: 11 routes (incl. `/contact?service=…&issue=…` and the 404) × 1600/1280/1024/768/390/320 px | **66/66 identical (0 px)**; final run needed no re-capture rounds                                                                                                           |
| CSS split: declarations                                                                                | 1288 before, 1288 after (+2 font tokens added on purpose)                                                                                                                   |
| CSS split: cascade order                                                                               | 4015 equal-specificity rule pairs changed order; none can match the same element on any page or state (checked in the browser, including the open menu and the review step) |
| Behaviour parity (same script on both sites)                                                           | 20 identical, 4 intended differences (below)                                                                                                                                |
| Open-state screenshots (menu, issue finder, review step)                                               | 0 px difference                                                                                                                                                             |
| Navigation (new site)                                                                                  | 21/21 checks pass                                                                                                                                                           |
| 4xx responses during navigation                                                                        | 0 of 103 requests (36 prefetch/RSC)                                                                                                                                         |
| Console errors / hydration warnings (new site)                                                         | 0                                                                                                                                                                           |

### Behaviour checks (identical on both sites)

Mobile menu open/close/Escape; issue finder by mouse, Enter and Space (pressed state, text,
link); FAQ disclosure by click and keyboard; empty-form validation; invalid email blocked;
review step content; exact `mailto:` href (multi-line details, curly quotes, `&`, en dash);
downloaded file name and content; "Edit details" keeps every value and focuses the heading;
optional fields omitted ("Not provided"); presets `?service=`, `?issue=` and unknown values.

### Intended behaviour differences

| Area                                                                | Original                                                                                                                                | New                                            |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Escape with focus inside the open menu                              | Menu closes, focus left on a now-hidden link                                                                                            | Menu closes, focus returns to the menu button  |
| Menu open, window resized to desktop and back                       | Menu still open                                                                                                                         | Menu closes on desktop width                   |
| Clicking internal links (menu, cards, footer, "Tell John about it") | No navigation in the locally built baseline; console `[vinext] RSC prefetch setup error: TypeError: ne is not a function` on every page | Client-side navigation works; 0 console errors |

The link failure was observed in the original toolchain built locally; it may not reproduce on
the original hosted preview.

### Pixel-parity notes

- Two fixes were needed to reach 0 px: (1) `.not-found` had moved after the `.page-intro`
  media queries in the split CSS (404 page 55–65 px taller on mobile); it now lives in the
  page-intro partial. (2) The original React markup split some text into several DOM text
  nodes (`"0"` + `"1"`, `"© "` + year + `" All Outdoors…"`, `"Talk with John · "` + phone).
  Chrome positions the following glyphs differently by a sub-pixel when they are merged, so
  the new JSX keeps the same splits (`ListNumber`, fragment labels).
- Fonts are now self-hosted copies of the exact Google Fonts files the original loaded
  (DM Sans v17 and Manrope v23, latin subset) with Google's `unicode-range` and weight range,
  and no adjusted fallback, so glyphs outside the subset (← ✳) still fall back to Arial.

## Head tags

Identical on every route: `<title>`, `meta description`, `robots` (`noindex, nofollow`),
`viewport`, `twitter:card`.

Changed:

- Open Graph and Twitter tags are per page (title, description, page image with dimensions).
  The original used one generic set on every page, with image URLs pointing to
  `http://localhost:3000/assets/...` (no `metadataBase`).
- Added: `link rel=canonical`, `og:url`, `og:site_name`, `og:locale`, `og:type`,
  `theme-color` (#fafbf7), LocalBusiness JSON-LD on the home page (name, URL, phone, email,
  Little Rock AR; no address, hours or ratings).
- Favicon: same SVG, now served by `app/icon.svg`.
- 404 title is "Page not found | All Outdoors Lawn Sprinklers" (the original showed the home
  title); Next.js also adds `noindex` to 404 responses.

## Results after cleanup (Phase 5)

Content changes approved by the requester:

1. Footer preview note removed ("Private design concept by Nuvato…"), with its CSS
   (`.preview-note`, base and 520px rules). Its only spacing was its own top margin; the
   footer's bottom padding (25px, 24px on mobile) belongs to `.site-footer` and stays.
2. Privacy page: the sentence "Fonts are requested from Google Fonts." was deleted because
   fonts are now self-hosted.

Re-verification against the build in this folder:

| Check                                                                                                | Result                                                                                                  |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm ci`, `npm run check`, `npm run build`                                                           | Pass                                                                                                    |
| Every page except `/privacy`, 6 widths (60 captures): pixels above the footer's bottom row           | **Identical (0 px)**                                                                                    |
| Same 60 captures: area below the footer's bottom row                                                 | Flat footer colour only (25px desktop, 24px mobile); pages 36–63px shorter                              |
| `/privacy`, 6 widths: pixels above the edited paragraph                                              | Identical (0 px)                                                                                        |
| `/privacy`: the 41 elements after the paragraph                                                      | Same size, x-position and text; shifted up by exactly the paragraph's height change (0, 23.8 or 25.5px) |
| Behaviour parity                                                                                     | Unchanged: 20 identical, 4 intended differences                                                         |
| Navigation                                                                                           | 21/21; 0 4xx (103 requests); 0 console errors                                                           |
| Unused CSS                                                                                           | 1 of 266 selectors matches nothing: `select` in the form-control reset (kept)                           |
| Leftover references (`openai`, `chatgpt`, `image_gen`, `vinext`, `wrangler`, `cloudflare`, `dist/`…) | None                                                                                                    |

## Dependency audit

- `npm audit --omit=dev`: **0 vulnerabilities**.
- `npm audit` (all): 8 moderate, all the same advisory (GHSA-g3hv-75wg-m249, `minimatch`
  ReDoS) via `@typescript-eslint/*` inside `eslint-config-next`. Lint-time only, never shipped;
  the offered fix (`npm audit fix --force`) installs breaking versions. Left for Dependabot.

## Not covered

- Real phones and Safari/Firefox: all checks above use Chrome (desktop widths and mobile-width
  emulation only).
- Lighthouse and live-URL checks (headers, prefetch on the host, robots/sitemap on the domain)
  are recorded in the README deployment section once the site is deployed.
