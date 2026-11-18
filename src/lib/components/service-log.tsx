import type { CSSProperties } from "react";
import { Reveal } from "@/lib/components/reveal";
import type { Service } from "@/lib/site";

type ServiceLogProps = {
  services: Service[];
  /** Heading level for each session name */
  headingLevel?: "h2" | "h3";
};

type FieldKey = "format" | "duration" | "price";

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "format", label: "Format" },
  { key: "duration", label: "Length" },
  { key: "price", label: "Price" },
];

/*
 * Static class names, indexed by how many fields have a value in at least
 * one session, so Tailwind can see every one of them. Each field is 7rem
 * wide with 1.5rem gaps, so the detail column grows with the field count.
 */
const ROW_COLUMNS = [
  "md:grid-cols-[3rem_minmax(0,1fr)]",
  "md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,7rem)]",
  "md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,15.5rem)]",
  "md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,24rem)]",
];
const HEAD_COLUMNS = ["", "grid-cols-1", "grid-cols-2", "grid-cols-3"];
const DETAIL_COLUMNS = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"];
const COLUMN_START = ["sm:col-start-1", "sm:col-start-2", "sm:col-start-3"];

/**
 * Sessions written up like lines in a training log: number, session, then
 * format, length and price. Each row rules itself in as it scrolls into view.
 * Only fields that at least one session fills get a column, so the owner can
 * leave out prices (or any field) without an empty column appearing. A field
 * empty for one session leaves a blank cell on wide screens and disappears on
 * narrow ones. The caller renders the "being finalized" state when the list
 * is empty.
 */
export function ServiceLog({ services, headingLevel: Heading = "h3" }: ServiceLogProps) {
  if (services.length === 0) return null;

  const shown = FIELDS.filter((field) => services.some((service) => service[field.key]));
  const columns = ROW_COLUMNS[shown.length];

  return (
    <Reveal variant="gate">
      {/* Column heads for sighted readers on wide screens. Each row carries
          its own labels in a description list for everyone else. */}
      <div aria-hidden="true" className={`label hidden gap-6 pb-3 text-graphite md:grid ${columns}`}>
        <span>No.</span>
        <span>Session</span>
        {shown.length > 0 ? (
          <span className={`grid gap-6 ${HEAD_COLUMNS[shown.length]}`}>
            {shown.map((field) => (
              <span key={field.key}>{field.label}</span>
            ))}
          </span>
        ) : null}
      </div>

      <ol className="border-b border-iron">
        {services.map((service, index) => (
          <li key={service.name} className="log-row" style={{ "--row-delay": `${index * 90}ms` } as CSSProperties}>
            <div className={`log-entry grid gap-3 py-6 md:gap-6 md:py-7 ${columns}`}>
              <span className="label pt-1 text-plate-blue" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <Heading className="display text-display-sm">{service.name}</Heading>
                <p className="measure mt-2 text-graphite">{service.summary}</p>
              </div>
              {shown.some((field) => service[field.key]) ? (
                <dl className={`grid gap-x-6 gap-y-1 ${DETAIL_COLUMNS[shown.length]}`}>
                  {shown.map((field, column) => {
                    const value = service[field.key];
                    if (!value) return null;
                    return (
                      <div key={field.key} className={`flex gap-3 sm:row-start-1 sm:block ${COLUMN_START[column]}`}>
                        <dt className="label pt-1 text-graphite md:sr-only">{field.label}</dt>
                        <dd className="font-semibold">{value}</dd>
                      </div>
                    );
                  })}
                </dl>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
