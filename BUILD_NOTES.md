# Willstrength Training: build notes

> **This site is a scaffold. Do not deploy it publicly until the owner's details are in.**
> The design, pages and code are finished, but the only verified facts are the business name and that it offers training sessions. Every other detail is `null` or empty in `src/lib/site.ts` and hidden in the UI. While there is no inquiry channel (`site.inquiry` or a contact detail) or `site.owner.name` is null, every page sends `noindex, nofollow` as a safety net. The full list of what the owner must send is in `OWNER-CHECKLIST.md` and repeated under "Open items" below.

## Art direction

**The first page of the training log.** A ruled notebook page meets a loaded barbell: the name is the load on the bar ("WILL" in outline above "STRENGTH" set between red and blue competition plates), a red margin line runs down every page, and content is written up like log entries with blue numbers and ruled lines. Type-led by decision, since no photography is verified.

- **Palette** (role tokens in `tailwind.config.ts`, CSS variables in `globals.css`)
  - Neutrals: chalk `#F4F2ED` (canvas), chalk-2 `#EAE7E0` (alternate surface), chalk-bright `#FBFAF7` (raised surface, scrolled header), chalk-line `#CDC8BE` (hairlines); iron `#15171A` (text, dark surfaces, control borders), graphite `#4E535A` (muted text on chalk), steel `#A7AEB6` (muted text on iron).
  - Primary: plate red `#B8261F` (the one action colour, margin line, labels). Deep `#971D17` for hover; bright `#F06A5F` for use on iron.
  - Supplemental: plate blue `#1E4FA3` (entry numbers, status, structure). Bright `#8FB0E8` on iron; rule `#C5D2E8` for ruled lines only (decorative, never text).
  - Red and blue are the two heaviest competition plates (25 kg and 20 kg) and also the red margin and blue rules of a notebook.
- **Fonts** (self-hosted with Fontsource, no Google Fonts calls)
  - Archivo Variable with the width axis: expanded black capitals (`font-stretch: 125%`) for display type, like plate lettering; normal width for body.
  - IBM Plex Mono 400/500: log labels, entry numbers, "TRAINING".
  - The Open Graph image uses static Archivo 900 (the image renderer cannot read variable fonts).
- **Motion**
  - Signature: on page load the bar is loaded, red plates first (heaviest innermost), then blue, then collars (CSS only, 520 ms each, staggered).
  - Log rows rule themselves in left to right as they scroll into view, then the entry fades up.
  - Plain lift and fade reveals elsewhere. All motion is opacity and transform, 450 to 650 ms, off under `prefers-reduced-motion` and in print, and nothing is hidden without JavaScript.
- **Pages**
  - Home: lockup hero, an iron "contents" board linking the three inner pages, a closing ask band.
  - About: the name cast round the rim of a red plate (the coach portrait takes its place once supplied).
  - Services: a blank numbered log page beside the title, then the session log.
  - Contact: a split page, the question on iron and the inquiry status on chalk.

## Verified facts used

| Fact | Source |
|---|---|
| Business name "Willstrength Training" | Novus assignment brief (assignment 12) |
| It offers training sessions people can ask about | Assignment wording: "explains its training services", "a clear way to ask about sessions" |
| No existing website | Assignment brief; domain checks in the fact sheet found none |

That is all. The only description on the site is "Strength training sessions", in general terms as the lead decisions allow.

## Decisions

- **Lead decisions (followed as written):**
  - Scaffold now, fill later.
  - Do not link or mention any candidate social account: @willstrength, the Linktree, the Facebook profile, the TikTok.
  - No images.
  - No owner name.
  - No claims about credentials, results, location, formats, prices, years or clients.
  - Content model as specified.
  - The inquiry button is driven by a single `inquiry` config. While it is null, Contact shows "Inquiries open soon" and the header CTA is hidden.
  - Routes `/`, `/about`, `/services`, `/contact`.
- **Inquiry button.** `site.inquiry` is a union: email, phone, Instagram or booking URL. Every part of the site reads one derived channel, `activeInquiry`: `site.inquiry` when it is set, otherwise the first contact detail filled in (booking link, then email, then phone, then Instagram). This keeps the single config the lead asked for, and it means filling only `site.contact` (as the checklist's contact items say) can never leave "Inquiries open soon" above a working phone or email. Setting a channel turns on:
  - the header CTA, from 1024 px, with a short label, and the button at the foot of the mobile menu below 768 px (768 to 1023 px has the desktop nav and no CTA, because the labels do not fit beside it);
  - the hero primary action;
  - the closing ask band on Home, About and Services;
  - the Contact page status and button (the details list below it skips the row that would repeat the channel);
  - the footer button.

  Until then the hero's primary action is an honest "How to ask about a session" link to Contact. It is never a dead button. Choosing the inquiry button in the mobile menu closes the menu and returns focus to the toggle, since it opens a mail or phone app or a new tab rather than a new page.
- **Empty states.** Sections with no data render nothing, except where a page would be empty:
  - About shows "Coach profile coming soon."
  - Services shows "Session options are being finalized."
  - Contact shows "Inquiries open soon."

  Copy never promises content that is not there. While `site.services` is empty, the Services intro and meta description are in the future tense, the Home contents note reads "Session options, once confirmed.", and the hero's "See session options" button and Contact's "See session options" link are not rendered. The 404 button says "Services". The ask band and footer say only that inquiries open soon.
- **Service log columns.** Format, Length and Price each get a column only when at least one session fills them, so leaving prices out never shows an empty Price column.
- **Owner label and description.** The coach section label comes from `site.owner.role` ("The trainer"), falling back to "The coach". The About introduction and every route's meta description use `category` (or its lowercase `categoryPhrase`), so correcting the category in `site.ts` updates them all.
- **Photo slots.** These render nothing while empty:
  - the coach portrait (About intro, Home coach preview);
  - the session photos (Home and Services).

  Both use `next/image` and are capped at the photo's natural width.
- **Search engines.** While `isScaffold` is true (no inquiry channel or no owner name), `pageMetadata()` adds `noindex, nofollow` to every route (the 404 already gets noindex from Next.js). `robots.txt` allows crawling in that state on purpose: a Disallow stops crawling but not indexing, and a crawler can only obey a noindex it is allowed to fetch. Once both facts are set the noindex goes away, and `robots.txt` also lists the sitemap whenever a public URL is configured.
- **Site URL.** The URL comes from `NEXT_PUBLIC_SITE_URL`, then `https://${VERCEL_PROJECT_PRODUCTION_URL}`, then `http://localhost:3000`.
- **Redirects.** None. No old site exists.
- **Tested with sample data.** The filled state was checked by temporarily putting obviously fake sample data in `site.ts`, at 1440, 1280, 1024, 768, 390 and 360 px. The sample data was never committed. Checked: owner, location, services, hours, phone, a long email, and email and Instagram inquiries. There was no overflow. A later review measured the header at 1024 px: every short CTA label fits beside the nav (the longest, "Message on Instagram", leaves 39 px), so the CTA now shows from 1024 px instead of 1280 px.
- **Intro layouts between 768 and 1279 px.** The Home value line and actions stay stacked below 1280 px, so "Strength training sessions." stays on one line. The Services and About intros are top-aligned below 1024 px, where the page label sits above the title, so there is no gap between label and title.
- **Fresh review.** A fresh review agent checked the site against AGENTS.md. It found six real defects, and all six are fixed:
  - the Open Graph bar struck through the name;
  - the header CTA wrapped;
  - the About heading hyphenated the brand name;
  - the copy promised prices;
  - the footer link target was too small;
  - the notes were missing.

  Polish items were also fixed: the duplicate 404 robots tag, the menu toggle without JavaScript, focus after choosing the current page in the menu, and an empty element inside a `dl`.

## Contrast (WCAG AA)

| Pair | Ratio |
|---|---|
| iron on chalk / chalk-2 / chalk-bright | 16.05 / 14.54 / 17.21 |
| graphite on chalk / chalk-2 / chalk-bright | 6.93 / 6.28 / 7.43 |
| plate red on chalk / chalk-2 (labels, link underline) | 5.63 / 5.10 |
| chalk-bright on plate red (primary button) | 6.03 |
| chalk-bright on red-deep (primary hover) | 8.03 |
| plate blue on chalk / chalk-bright | 6.95 / 7.44 |
| chalk on iron | 16.05 |
| steel on iron | 8.02 |
| red-bright on iron | 5.93 |
| blue-bright on iron | 8.16 |
| iron on red-bright (contents arrow hover) | 5.93 |
| Control borders: iron on chalk, chalk on iron | 16.05 |

Focus: 3 px iron outline on chalk, chalk outline on iron. Every tap target is at least 44 px.

## Images

None. No image could be confirmed as this business, and the lead decisions exclude all of them. The only graphics are drawn in code:
- the plate mark (`src/app/icon.svg`, `apple-icon.tsx`);
- the barbell lockup;
- the plate face;
- the Open Graph image.

## Checks run

- `npm run build`, `npm run lint` and `npm run typecheck` all pass with no errors and no warnings.
- Production server on port 3021. Every route, including the 404, was captured at 1440, 1024, 768, 390 and 360 px (screenshots in the session scratchpad). There is no horizontal overflow at any width.
- At 390 x 844 the name, "Strength training sessions." and the primary action are visible without scrolling. The hero is about 480 px tall.
- Mobile menu, tested with the keyboard at 390 px:
  - focus moves to Close when it opens;
  - Tab cycles inside the panel;
  - Escape closes it and returns focus to the toggle;
  - the skip link, header, main and footer are inert while it is open;
  - it closes at the desktop breakpoint.
- The fresh review ran axe on all five routes and found 0 violations.
- A copy grep found no em or en dashes and no leading zeroes in `src` or the checklist.

## Open items for the client

Everything below is unknown. Each item names the field in `src/lib/site.ts`; the same list, with more detail, is in `OWNER-CHECKLIST.md`.

**Blocking launch**
1. How people should ask about sessions: email, phone, Instagram or a booking link. Field: `site.inquiry` (if it stays empty, the first contact detail filled in is used).
2. The owner's name and role (coach, trainer, founder). Field: `site.owner.name`, `site.owner.role` (the role also sets the section label).

**Contact**

3. Phone number. Field: `site.contact.phone`.
4. Email address. Field: `site.contact.email`.
5. Instagram account, if any. Several "willstrength" accounts exist, but none is confirmed as this business. Field: `site.contact.instagram`.
6. Booking link, if any. Field: `site.contact.bookingUrl`.
7. Any other real social accounts. These need a new field.

**About**

8. Bio. Field: `site.owner.bio`.
9. Certifications, written exactly as on the certificate. Field: `site.owner.credentials`.
10. Location (venue, address, map link) or the service area. Field: `site.location`, `site.serviceArea`.
11. Hours or availability. Field: `site.hours`.
12. Legal business name, if different. Field: `site.legalName`.

**Sessions**

13. Session options: name, summary, format, length and price. Field: `site.services`.

**Photos and brand**

14. A coach portrait, original file. Field: `site.owner.photo`.
15. Up to three session photos, with permission from anyone shown. Field: `site.sessionPhotos`.
16. An existing logo, colours or fonts, if any. The current mark and palette were designed for this site.

**Launch**

17. The domain. Set it as `NEXT_PUBLIC_SITE_URL`.
18. Confirm that "Strength training sessions" describes the business. Field: `category`.
