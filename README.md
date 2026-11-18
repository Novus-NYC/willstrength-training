# Willstrength Training website

Marketing site for Willstrength Training, a business offering strength training sessions (Novus assignment 12). It has four pages: Home, About, Services and Contact, plus a custom 404.

**Status: scaffold.** The design and code are finished, but almost every business detail is still unknown. Those details are stored as `null` in `src/lib/site.ts`, and the UI hides them or shows a short "coming soon" line. Do not deploy publicly until the owner has sent at least an inquiry channel and their name. See `OWNER-CHECKLIST.md`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 3, with brand tokens in `tailwind.config.ts`
- Fonts self-hosted with Fontsource: Archivo (variable, width axis) and IBM Plex Mono
- ESLint 9 flat config (`eslint.config.mjs`) with `eslint-config-next`

## Scripts

```bash
npm install
npm run dev        # local dev server on http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
```

## Where things live

- `src/lib/site.ts` holds every business fact: owner, location, services, contact, hours, photos and the single `inquiry` config that drives the inquiry button. Fill a field there and the matching section appears. `OWNER-CHECKLIST.md` maps each owner detail to its field.
- `src/lib/metadata.ts` has `pageMetadata()`, which gives each route its own title, description, canonical URL and Open Graph tags.
- `src/lib/brand.ts` holds brand colours and the plate mark. Keep it in sync with `src/app/icon.svg`.
- `src/lib/components/` holds the header and mobile menu, footer, reveal observer, log sections, coming-soon state, inquiry button, barbell lockup, plate face and photo slots.
- `src/app/` holds the routes, `icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts` and `not-found.tsx`.
- `BUILD_NOTES.md` covers art direction, decisions, contrast checks and open items.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public origin, for example `https://www.example.com`, used for canonical URLs, Open Graph URLs and the sitemap. If it is unset, the site falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then to `http://localhost:3000`. |

`robots.txt` blocks all crawling while `site.inquiry` or `site.owner.name` is still null.

Build standard: `AGENTS.md` and `CLAUDE.md` (identical).
