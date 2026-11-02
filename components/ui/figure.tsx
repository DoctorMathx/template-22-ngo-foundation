import Image from "next/image";
import type { Photo } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Photo with an aspect-ratio box (no layout shift), caption and credit. */
export function Figure({
  photo,
  aspect = "aspect-[4/3]",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  showCaption = true,
}: {
  photo: Photo;
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
}) {
  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden bg-paper-deep", aspect)}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {showCaption && (photo.caption || photo.credit) && (
        <figcaption className="caption mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-rule pt-2">
          {photo.caption && <span>{photo.caption}</span>}
          {photo.credit && <span className="italic">Photo: {photo.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
