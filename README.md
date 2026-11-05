# All Outdoors Lawn Sprinklers

Marketing website for All Outdoors Lawn Sprinklers (owner John C Virden, Little Rock, Arkansas):
sprinkler repair, new installations and seasonal care.

Built with Next.js (App Router) as a **fully static export**: `npm run build` writes plain
HTML/CSS/JS to `out/`, which any static host can serve. There is no server, database or
form backend. The enquiry form prepares an email draft (`mailto:`) and a text download in the
visitor's browser; nothing is sent automatically.

> **Status:** preview. Search engines are blocked (`noindex`, `robots.txt` disallow) until the
> owner approves launch. See [Before launch](#before-launch).

## Getting started

Requires Node.js 20.9 or newer (`.nvmrc` pins the current LTS, 26).

```bash
npm ci          # install the locked dependencies
npm run dev     # http://localhost:3000
```

## Scripts

| Script                 | What it does                                                             |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run dev`          | Development server with hot reload                                       |
| `npm run build`        | Static export to `out/`, then runs `postbuild`                           |
| `postbuild`            | `scripts/fix-export-segments.mjs` (Windows prefetch-file fix, see below) |
| `npm run preview`      | Serve `out/` locally (`npx serve@14 out`)                                |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)                      |
| `npm run typecheck`    | Generate route types (`next typegen`), then `tsc --noEmit`               |
| `npm run format`       | Format everything with Prettier                                          |
| `npm run format:check` | Check formatting without writing                                         |
| `npm run check`        | `typecheck` + `lint` + `format:check` (what CI runs)                     |

`scripts/fix-export-segments.mjs` works around a Next.js static-export bug on Windows, where
prefetch segment files are written to nested folders (`__next.about/__PAGE__.txt`) instead of
flat names (`__next.about.__PAGE__.txt`), which makes link prefetches 404. On Linux/macOS it
finds nothing to move.

## Project structure

```
src/
  app/                  Routes (one folder per page)
    layout.tsx          Root layout: fonts, metadata defaults, header/footer
    page.tsx            Home
    services/           /services and /services/[slug] (static params from content)
    sprinkler-help/  about/  contact/  privacy/
    not-found.tsx       Styled 404
    icon.svg            Favicon
    robots.ts           robots.txt (blocks all crawlers until indexing is enabled)
    sitemap.ts          sitemap.xml (built from content/services.ts)
  components/
    layout/             Site header (client: mobile menu) and footer
    sections/           Shared sections: page intro, FAQ, issue finder (client), CTA…
    home/  services/  contact/   Page-specific sections (contact form is client-side)
    ui/                 Icon, Brand, SmartLink, ButtonLink/TextLink, ListNumber
    seo/                LocalBusiness JSON-LD
  config/
    site.ts             Business details and navigation (safe for client code)
    deployment.ts       SITE_URL / SITE_INDEXABLE (server-only, read at build time)
  content/              Typed copy: services, FAQs, issue-finder options
  lib/                  Framework-free helpers: enquiry text/mailto builders, metadata
  styles/
    globals.css         Imports the partials below, in cascade order
    base/ components/ layout/ sections/ pages/
    fonts.ts            Self-hosted DM Sans + Manrope via next/font/local
  assets/               Images and fonts, imported statically
scripts/                fix-export-segments.mjs
docs/                   Verification results and content sources
```

## Conventions

- **Server Components by default.** Only three things run in the browser: the mobile menu
  (`site-header.tsx`), the issue finder and the two-step contact form.
- **Facts live in `src/config/site.ts` and `src/content/`.** Never add hours, prices, reviews,
  licences, service areas or years in business unless the owner supplies them.
  See `docs/content-sources.md`.
- **CSS partial order matters.** `styles/globals.css` imports partials in the order their rules
  appeared in the original stylesheet; each partial lists base rules first, then its media
  queries (1600px, 1100px, 800px, 520px, reduced motion). Moving an import can change the
  cascade. Fonts are referenced only through the `--font-body` / `--font-heading` tokens.
- **Text nodes are deliberate.** Some JSX keeps the original's split text nodes (e.g.
  `ListNumber` renders "0" and "1" separately; string link labels render as one node). Chrome
  positions glyphs slightly differently otherwise; the site was verified pixel-identical to the
  original (see `docs/verification.md`).
- **Images** use `next/image` with static imports; the hero image loads eagerly with
  `fetchPriority="high"`. All three photographs are AI-generated illustrations and are labelled
  as such on screen; replace them with real photos before removing the labels.
- **Links:** internal paths go through `next/link` (`SmartLink`); `tel:`, `mailto:` and hash
  links are plain anchors.

## Routes

| Path                                | Page                                                   |
| ----------------------------------- | ------------------------------------------------------ |
| `/`                                 | Home                                                   |
| `/services/`                        | Service directory                                      |
| `/services/sprinkler-repair/`       | Service detail                                         |
| `/services/sprinkler-installation/` | Service detail                                         |
| `/services/seasonal-care/`          | Service detail                                         |
| `/sprinkler-help/`                  | Issue finder and FAQs                                  |
| `/about/`                           | About John and the business                            |
| `/contact/`                         | Enquiry form (`?service=<slug>&issue=<id>` preselects) |
| `/privacy/`                         | Preview privacy notice                                 |
| anything else                       | 404 page (`404.html`)                                  |

## Configuration

Copy `.env.example` to `.env.local` for local overrides. Variables are read at build time.

| Variable         | Default                                                                | Purpose                                                                            |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Origin for canonical URLs, Open Graph, `robots.txt`, `sitemap.xml`                 |
| `SITE_INDEXABLE` | `false`                                                                | `true` allows indexing. The build fails if it is `true` while the URL is localhost |

## Before launch

- [ ] Owner confirms every business detail: name, phone, email, Little Rock base, services.
- [ ] Owner confirms the service area (the site only says "listed in Little Rock").
- [ ] Decide on the remaining preview wording: `/privacy` ("PRIVATE DESIGN PREVIEW"), the footer
      "Preview privacy" link, FAQ 5 ("This preview lets you…").
- [ ] Replace the AI-generated photos with real photos, or keep the "Illustrative…" labels.
- [ ] Owner supplies a real privacy notice if the preview one is retired.
- [ ] Connect the custom domain in Vercel; set `SITE_URL` to it for Production.
- [ ] Only after owner approval: set `SITE_INDEXABLE=true` for Production and redeploy.
- [ ] Check `robots.txt`, `sitemap.xml` and canonical URLs on the live domain; submit the
      sitemap in Google Search Console.
- [ ] Run Lighthouse (mobile) on the live home and contact pages.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci`, then
`npm run check`, then `npm run build`, and uploads `out/` as the `site-out` artifact.
Dependabot (`.github/dependabot.yml`) opens weekly npm updates (Next/React grouped) and monthly
GitHub Actions updates.

## Hosting

Any static host can serve `out/` (a `404.html` is included). The project is set up for Vercel:

1. Vercel → **Add New… → Project** → import this GitHub repository.
2. Framework preset: **Next.js** (detected). Leave build command (`npm run build`) and output
   settings at their defaults: Vercel detects the static export and serves `out/`.
3. Environment variables:
   - **Preview:** `SITE_INDEXABLE=false`.
   - **Production:** `SITE_INDEXABLE=false` until the owner approves; set `SITE_URL` to the custom
     domain once it is connected (until then the `*.vercel.app` production URL is used
     automatically).
4. Deploy. `vercel.json` adds security headers to every response: `X-Content-Type-Options`,
   `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera, microphone,
   geolocation off) and `Strict-Transport-Security` (`max-age=63072000`; add
   `includeSubDomains` only if every subdomain of the owner's domain serves HTTPS). There is no
   Content-Security-Policy yet: Next.js's static export relies on inline bootstrap scripts, so a
   CSP needs hashes or `'unsafe-inline'` and must be tested before it ships.

### Deployment

Preview URL: _not deployed yet. Add the Vercel URL here after the first deployment._
