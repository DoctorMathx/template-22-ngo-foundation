import Link from "next/link";
import Image from "next/image";
import type { Story } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function StoryCard({ story, large }: { story: Story; large?: boolean }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/stories/${story.slug}`} tabIndex={-1} aria-hidden className="block">
        <div className={cn("relative overflow-hidden bg-paper-deep", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
          <Image src={story.image.src} alt="" fill sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        </div>
      </Link>
      <div className="pt-5 border-t border-ink mt-4">
        <p className="eyebrow mb-3">{story.category} · <time dateTime={story.date}>{formatDate(story.date, { day: "numeric", month: "short", year: "numeric" })}</time></p>
        <h3 className={cn("font-serif leading-tight mb-3", large ? "text-3xl md:text-[2.2rem]" : "text-xl md:text-[1.4rem]")}>
          <Link href={`/stories/${story.slug}`} className="hover:text-forest">{story.title}</Link>
        </h3>
        <p className={cn("text-ink-soft leading-relaxed", large ? "text-base" : "text-sm line-clamp-3")}>{story.dek}</p>
        <p className="mt-4 text-[0.8rem] text-muted">By {story.author} · {story.readTime}</p>
      </div>
    </article>
  );
}
