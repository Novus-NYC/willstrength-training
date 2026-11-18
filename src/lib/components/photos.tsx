import Image from "next/image";
import { Reveal } from "@/lib/components/reveal";
import type { SiteImage } from "@/lib/site";

/**
 * The coach portrait, framed like a photo clipped into the log. Drawn at
 * no more than its natural width. Renders nothing without a photo.
 */
export function CoachPortrait({ photo, priority = false }: { photo: SiteImage | null; priority?: boolean }) {
  if (!photo) return null;
  return (
    <figure className="border-2 border-iron bg-chalk-bright p-2" style={{ maxWidth: photo.width + 20 }}>
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        priority={priority}
        // Five of twelve columns from md (frame and container padding taken
        // off), and the full content width below md. Recheck with the real
        // portrait once it arrives.
        sizes="(min-width: 1280px) 23rem, (min-width: 1024px) 26vw, (min-width: 768px) 33vw, calc(100vw - 3.75rem)"
        className="h-auto w-full"
      />
    </figure>
  );
}

/**
 * Session photos in a staggered row. Renders nothing while the owner has not
 * supplied any (site.sessionPhotos is empty).
 */
export function SessionPhotos({ photos }: { photos: SiteImage[] }) {
  if (photos.length === 0) return null;
  const shown = photos.slice(0, 3);
  return (
    <ul className="grid gap-5 sm:grid-cols-3 sm:items-start">
      {shown.map((photo, index) => (
        <Reveal as="li" key={photo.src} delay={index * 100} className={index === 1 ? "sm:mt-12" : undefined}>
          <figure className="border-2 border-iron bg-chalk-bright p-2" style={{ maxWidth: photo.width + 20 }}>
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              sizes="(min-width: 1248px) 24rem, (min-width: 640px) 31vw, 90vw"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
