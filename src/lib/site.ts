/**
 * Single source of truth for every business fact on the site.
 *
 * THIS SITE IS A SCAFFOLD. The only verified facts are the business name and
 * that it offers training sessions (both from the Novus assignment brief).
 * Everything else is `null` or an empty list, and the UI that would show it
 * renders nothing, or a calm "coming soon" line where a page would otherwise
 * be empty. Fill the fields below with details the owner sends and the
 * matching sections light up. OWNER-CHECKLIST.md lists every field.
 *
 * Do not deploy publicly until at least `inquiry` and `owner.name` are set.
 */

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */

export type SiteImage = {
  /** Path under /public, for example "/images/coach-portrait.jpg" */
  src: string;
  /** Natural width in pixels. Images are never drawn wider than this. */
  width: number;
  /** Natural height in pixels */
  height: number;
  /** What the photo shows, in a full sentence */
  alt: string;
};

export type Owner = {
  /** "Will Example" (do not assume the name from the brand) */
  name: string | null;
  /** Coach, trainer, founder: the owner's own word */
  role: string | null;
  /** Bio, one string per paragraph */
  bio: string[] | null;
  /** Certifications exactly as written on the certificate */
  credentials: string[] | null;
  /** A portrait the owner supplies, with permission */
  photo: SiteImage | null;
};

export type Location = {
  /** Gym or studio name, if sessions happen at one */
  venue: string | null;
  street: string | null;
  locality: string;
  region: string;
  postalCode: string | null;
  /** A Google Maps (or similar) link the owner confirms */
  mapUrl: string | null;
};

export type Service = {
  /** "1:1 strength session" */
  name: string;
  /** One or two sentences in the owner's words */
  summary: string;
  /** In person, online, small group, and so on */
  format: string | null;
  /** "60 minutes" */
  duration: string | null;
  /** As the owner wants it shown, for example "$80 per session" */
  price: string | null;
};

export type HoursRow = {
  /** "Monday to Friday" */
  days: string;
  /** "6:00 AM to 8:00 PM" (no leading zeroes) */
  times: string;
};

export type Phone = {
  /** As shown on the page: "(212) 555-0100" */
  display: string;
  /** E.164 form for tel: links: "+12125550100" */
  e164: string;
};

export type Instagram = {
  /** "@handle" */
  handle: string;
  url: string;
};

/**
 * The one way to ask about sessions: the site's inquiry button. Set exactly
 * one of these, and the header, hero, Contact page and closing call to action
 * all switch to it. Examples:
 *   { method: "email", address: "hello@example.com" }
 *   { method: "phone", phone: { display: "(212) 555-0100", e164: "+12125550100" } }
 *   { method: "instagram", instagram: { handle: "@example", url: "https://www.instagram.com/example/" } }
 *   { method: "booking", url: "https://example.com/book", provider: "Calendly" }
 */
export type Inquiry =
  | { method: "email"; address: string }
  | { method: "phone"; phone: Phone }
  | { method: "instagram"; instagram: Instagram }
  | { method: "booking"; url: string; provider: string | null };

export type SiteConfig = {
  name: string;
  /** Registered entity name, if different from the trading name */
  legalName: string | null;
  owner: Owner;
  /** Where sessions happen. Null until the owner confirms. */
  location: Location | null;
  /**
   * Area served, for mobile or online training. Write a place name that
   * reads after "in" ("{area} and {area}"). For online-only training,
   * leave it null and say so in the service summaries instead.
   */
  serviceArea: string | null;
  services: Service[];
  contact: {
    phone: Phone | null;
    email: string | null;
    instagram: Instagram | null;
    bookingUrl: string | null;
  };
  hours: HoursRow[] | null;
  inquiry: Inquiry | null;
  /** Session photos the owner supplies, with permission from anyone shown */
  sessionPhotos: SiteImage[];
};

/* ------------------------------------------------------------------
   The facts
   ------------------------------------------------------------------ */

export const site: SiteConfig = {
  name: "Willstrength Training",
  legalName: null,

  owner: {
    name: null,
    role: null,
    bio: null,
    credentials: null,
    photo: null,
  },

  location: null,
  serviceArea: null,

  /** Empty until the owner confirms the session options */
  services: [],

  contact: {
    phone: null,
    email: null,
    instagram: null,
    bookingUrl: null,
  },

  hours: null,

  /** Null: the Contact page shows "Inquiries open soon" and the header CTA hides */
  inquiry: null,

  sessionPhotos: [],
};

/* ------------------------------------------------------------------
   Derived values (pages read these, they do not retype facts)
   ------------------------------------------------------------------ */

/**
 * True until the two launch-blocking facts are in: a way to ask about
 * sessions and the owner's name. While true, robots.txt asks search engines
 * not to crawl the site, in case it is deployed early by mistake.
 */
export const isScaffold = site.inquiry === null || site.owner.name === null;

/** What the business does, in the only words the brief supports */
export const category = "Strength training sessions";

export type InquiryLink = {
  /** Button label, action-specific */
  label: string;
  /** Shorter label for the header, where space is tight */
  shortLabel: string;
  href: string;
  /** Opens in a new tab (Instagram, booking pages) */
  external: boolean;
  /** "Ask by email.": a short heading for the channel */
  heading: string;
  /** "hello@example.com": the address, number or handle, if there is one */
  detail: string | null;
};

/** Turns the inquiry config into a button. Null while no channel is set. */
export function inquiryLink(inquiry: Inquiry | null = site.inquiry): InquiryLink | null {
  if (!inquiry) return null;
  switch (inquiry.method) {
    case "email":
      return {
        label: "Email to ask about a session",
        shortLabel: "Email to ask",
        href: `mailto:${inquiry.address}?subject=${encodeURIComponent(`Session inquiry for ${site.name}`)}`,
        external: false,
        heading: "Ask by email.",
        detail: inquiry.address,
      };
    case "phone":
      return {
        label: "Call to ask about a session",
        shortLabel: "Call to ask",
        href: `tel:${inquiry.phone.e164}`,
        external: false,
        heading: "Ask by phone.",
        detail: inquiry.phone.display,
      };
    case "instagram":
      return {
        label: "Message on Instagram",
        shortLabel: "Message on Instagram",
        href: inquiry.instagram.url,
        external: true,
        heading: "Message on Instagram.",
        detail: inquiry.instagram.handle,
      };
    case "booking":
      return {
        label: "Book a session",
        shortLabel: "Book a session",
        href: inquiry.url,
        external: true,
        heading: "Book online.",
        detail: inquiry.provider ? `Through ${inquiry.provider}` : null,
      };
  }
}

/** "{venue}, {town}, {state}" from the location, or the service area, or null */
export function whereLine(): string | null {
  if (site.location) {
    const place = `${site.location.locality}, ${site.location.region}`;
    return site.location.venue ? `${site.location.venue}, ${place}` : place;
  }
  return site.serviceArea;
}

/** "at {venue}, {town}" or "in {town or service area}", or null */
export function wherePhrase(): string | null {
  const where = whereLine();
  if (!where) return null;
  return site.location?.venue ? `at ${where}` : `in ${where}`;
}

/**
 * Public origin of the site, without a trailing slash. The domain is not
 * known yet (open item), so it resolves in this order:
 *   1. NEXT_PUBLIC_SITE_URL, when it is set
 *   2. the production domain Vercel assigns to the project
 *   3. http://localhost:3000, for local runs only
 */
const LOCAL_ORIGIN = "http://localhost:3000";

function resolveSiteUrl(): { url: string; isPublic: boolean } {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return { url: configured.replace(/\/+$/, ""), isPublic: true };

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) return { url: `https://${vercelDomain.replace(/\/+$/, "")}`, isPublic: true };

  return { url: LOCAL_ORIGIN, isPublic: false };
}

const resolvedSiteUrl = resolveSiteUrl();

export const siteUrl = resolvedSiteUrl.url;

/** False on a local run. robots.txt then leaves out the sitemap line. */
export const hasPublicSiteUrl = resolvedSiteUrl.isPublic;

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
