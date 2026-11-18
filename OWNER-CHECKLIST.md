# Willstrength Training: what the owner needs to send

The site is built and styled, but almost every business detail is still empty. Nothing below could be confirmed online, so none of it is on the site yet. Each item names the field in `src/lib/site.ts` where it goes. Once a field is filled in, the matching part of the site appears on its own.

**The site should not go live until at least items 1 and 2 are filled in.** Until then every page tells search engines not to list it.

## Must have before launch

1. **How people should ask about sessions** (the inquiry button). Pick one: an email address, a phone number, an Instagram account, or a booking link (Calendly, Acuity and so on).
   Goes in: `site.inquiry`, for example `{ method: "email", address: "..." }`. This one edit turns on the inquiry button everywhere it appears: in the header on screens 1024 px and wider, in the menu on phone-sized screens, in the home page's opening section, in the closing section of Home, About and Services, on the Contact page and in the footer.
   If `site.inquiry` is left empty, the first contact detail filled in below takes its place (booking link, then email, then phone, then Instagram), so the site never says "inquiries open soon" next to a working phone number or email.
2. **Who runs the sessions**: full name as it should appear, and the word they use for themselves (coach, trainer, founder).
   Goes in: `site.owner.name`, `site.owner.role`. The role also becomes the section label ("The trainer"); until it is set, the label reads "The coach".

## Contact details

Each detail below is listed on the Contact page and in the footer. The one used as the inquiry button (item 1) is not repeated in the Contact page's list.

3. Phone number (as it should be shown, plus the international form for tap-to-call). Goes in: `site.contact.phone`.
4. Email address. Goes in: `site.contact.email`.
5. Instagram handle and link, if the business has one. (Several "willstrength" accounts exist online; none could be confirmed as this business, so none are linked.) Goes in: `site.contact.instagram`.
6. Booking or scheduling link, if any. Goes in: `site.contact.bookingUrl`.
7. Any other social accounts that really belong to the business (Facebook, TikTok, YouTube). These need a new field; ask the developer.

## About the business

8. A short bio, one or more paragraphs, in the owner's own words. Goes in: `site.owner.bio`.
9. Certifications or qualifications, written exactly as on the certificate. Goes in: `site.owner.credentials`.
10. Where sessions happen: gym or studio name, street address, town, state, ZIP, and a Google Maps link. Or, for mobile or online training, the area served. Goes in: `site.location` or `site.serviceArea`.
11. Hours or availability, if they should be shown (for example "Monday to Friday", "6:00 AM to 8:00 PM"). Goes in: `site.hours`.
12. Legal business name, if different from "Willstrength Training". Goes in: `site.legalName` (shown in the footer copyright line).

## Sessions

13. The list of session options. For each: name, a one or two sentence description, format (in person, online, small group), length, and price as it should be shown (or leave price out). A field left out of every session gets no column. Goes in: `site.services`.

## Photos and brand

14. A portrait of the coach (original file, highest resolution available). Goes in: `public/images/` and `site.owner.photo`, with a written description for the alt text.
15. Up to three photos from sessions, with permission from anyone recognisable in them. Goes in: `public/images/` and `site.sessionPhotos`.
16. A logo, brand colours or fonts, if the business already has them. The current mark (a red plate with a W) and colours were designed for this site and can be swapped.

## Launch details

17. The domain name for the site. Set it as `NEXT_PUBLIC_SITE_URL` on the host.
18. Confirm the general line "Strength training sessions" describes the business correctly. It is the only description used on the site, including the About introduction and every page's search and share description. Goes in: `category` in `src/lib/site.ts`.
