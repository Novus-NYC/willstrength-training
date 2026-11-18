import Link from "next/link";
import { inquiryLink } from "@/lib/site";

type InquiryButtonProps = {
  className?: string;
  onClick?: () => void;
  /** Use the shorter header label */
  short?: boolean;
};

function NewTabArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M4 2h8v8M12 2 2 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

/**
 * The inquiry button, built from `activeInquiry` (site.inquiry, or the first
 * contact detail filled in). Renders nothing while no channel is set, so
 * there is never a dead button on the page.
 */
export function InquiryButton({ className = "btn-primary", onClick, short = false }: InquiryButtonProps) {
  const link = inquiryLink();
  if (!link) return null;
  const label = short ? link.shortLabel : link.label;

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {label}
        <span className="sr-only"> (opens in a new tab)</span>
        <NewTabArrow />
      </a>
    );
  }

  return (
    <a href={link.href} className={className} onClick={onClick}>
      {label}
    </a>
  );
}

/**
 * The hero's primary action: the inquiry button once a channel is set, and
 * until then an honest link to the Contact page, which explains the status.
 */
export function PrimaryAction({ className = "btn-primary" }: { className?: string }) {
  if (inquiryLink()) return <InquiryButton className={className} />;
  return (
    <Link href="/contact" className={className}>
      How to ask about a session
    </Link>
  );
}
