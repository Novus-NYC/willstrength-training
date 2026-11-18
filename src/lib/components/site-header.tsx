"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/lib/components/brand-mark";
import { InquiryButton } from "@/lib/components/inquiry";
import { navLinks, site } from "@/lib/site";

/** The desktop nav takes over at Tailwind's `md` breakpoint */
const DESKTOP_QUERY = "(min-width: 768px)";
const PANEL_ID = "mobile-menu";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** Elements made inert while the menu is open (everything but the panel) */
  const inertedRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Give the page back: must run before focus returns to the toggle. */
  const releasePage = useCallback(() => {
    for (const element of inertedRef.current) element.inert = false;
    inertedRef.current = [];
    document.body.classList.remove("menu-open");
  }, []);

  const close = useCallback(
    (returnFocus = true) => {
      releasePage();
      setOpen(false);
      if (returnFocus) toggleRef.current?.focus();
    },
    [releasePage],
  );

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // While the dialog is open, everything outside it is inert: the skip
    // link, the header, main and the footer.
    const outside = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== panel && element.tagName !== "SCRIPT" && !element.inert,
    );
    for (const element of outside) element.inert = true;
    inertedRef.current = outside;
    document.body.classList.add("menu-open");
    // The panel's visibility flips on the next style pass (it is part of the
    // open/close transition), and a hidden element cannot take focus, so wait
    // two frames before moving focus to the close button.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => closeRef.current?.focus());
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const media = window.matchMedia(DESKTOP_QUERY);
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) close(false);
    };

    document.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
      releasePage();
    };
  }, [open, close, releasePage]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-iron focus:px-4 focus:py-3 focus:text-chalk"
      >
        Skip to content
      </a>

      <header className={`site-header sticky top-0 z-40 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container-site flex items-center justify-between gap-4" style={{ height: "var(--header-h)" }}>
          <Link href="/" className="flex min-h-[44px] items-center" aria-label={`${site.name}, home`}>
            <Wordmark />
          </Link>

          <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
            <nav aria-label="Main" className="hidden items-center gap-6 md:flex lg:gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link" aria-current={isCurrent(link.href) ? "page" : undefined}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Renders nothing until site.inquiry is set */}
            <InquiryButton short className="btn-primary btn-compact hidden whitespace-nowrap xl:inline-flex" />

            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle inline-flex h-11 w-11 items-center justify-center border-2 border-iron text-iron md:hidden"
              style={{ borderRadius: 2 }}
              aria-expanded={open}
              aria-controls={PANEL_ID}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu. A sibling of the header, never a child, so the sticky
          header cannot become its containing block. */}
      <div
        id={PANEL_ID}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-iron text-chalk transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-site flex shrink-0 items-center justify-between" style={{ height: "var(--header-h)" }}>
          <Wordmark tone="dark" />
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-chalk text-chalk"
            style={{ borderRadius: 2 }}
            aria-label="Close menu"
            onClick={() => close()}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
              <path d="M4 4l14 14M18 4 4 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
          </button>
        </div>

        {/* Centered on tall screens. On short viewports (landscape phones)
            the panel scrolls instead of clipping the last link. */}
        <nav
          aria-label="Pages"
          className="container-site flex flex-1 flex-col justify-center py-6 [@media(max-height:520px)]:justify-start"
        >
          <ol>
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  // Following a link moves focus to the new page. The current
                  // page does not navigate, so focus goes back to the toggle.
                  onClick={() => close(isCurrent(link.href))}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="group flex min-h-[68px] items-baseline gap-5 border-b border-iron-line py-3"
                >
                  <span className="label w-6 shrink-0 text-plate-blue-bright" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="display min-w-0 text-[2.25rem] leading-none transition-colors group-hover:text-plate-red-bright">
                    {link.label}
                  </span>
                  {isCurrent(link.href) ? <span className="label ml-auto shrink-0 self-center text-plate-red-bright" aria-hidden="true">Here</span> : null}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="container-site shrink-0 pb-8 empty:hidden">
          <InquiryButton className="btn-primary w-full" onClick={() => close(false)} />
        </div>
      </div>
    </>
  );
}
