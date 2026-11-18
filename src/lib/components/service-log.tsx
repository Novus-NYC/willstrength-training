import type { CSSProperties } from "react";
import { Reveal } from "@/lib/components/reveal";
import type { Service } from "@/lib/site";

type ServiceLogProps = {
  services: Service[];
  /** Heading level for each session name */
  headingLevel?: "h2" | "h3";
};

const COLUMNS = "md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,24rem)]";

const FIELDS: { key: "format" | "duration" | "price"; label: string }[] = [
  { key: "format", label: "Format" },
  { key: "duration", label: "Length" },
  { key: "price", label: "Price" },
];

/**
 * Sessions written up like lines in a training log: number, session, then
 * format, length and price. Each row rules itself in as it scrolls into view.
 * Empty fields leave a blank cell on wide screens and disappear on narrow
 * ones. The caller renders the "being finalized" state when the list is empty.
 */
export function ServiceLog({ services, headingLevel: Heading = "h3" }: ServiceLogProps) {
  if (services.length === 0) return null;

  return (
    <Reveal variant="gate">
      {/* Column heads for sighted readers on wide screens. Each row carries
          its own labels in a description list for everyone else. */}
      <div aria-hidden="true" className={`label hidden gap-6 pb-3 text-graphite md:grid ${COLUMNS}`}>
        <span>No.</span>
        <span>Session</span>
        <span className="grid grid-cols-3 gap-6">
          {FIELDS.map((field) => (
            <span key={field.key}>{field.label}</span>
          ))}
        </span>
      </div>

      <ol className="border-b border-iron">
        {services.map((service, index) => (
          <li key={service.name} className="log-row" style={{ "--row-delay": `${index * 90}ms` } as CSSProperties}>
            <div className={`log-entry grid gap-3 py-6 md:gap-6 md:py-7 ${COLUMNS}`}>
              <span className="label pt-1 text-plate-blue" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <Heading className="display text-display-sm">{service.name}</Heading>
                <p className="measure mt-2 text-graphite">{service.summary}</p>
              </div>
              <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-3">
                {FIELDS.map((field) => {
                  const value = service[field.key];
                  if (!value) return <div key={field.key} className="hidden sm:block" aria-hidden="true" />;
                  return (
                    <div key={field.key} className="flex gap-3 sm:block">
                      <dt className="label pt-1 text-graphite md:sr-only">{field.label}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
