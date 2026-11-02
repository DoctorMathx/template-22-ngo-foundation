import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { PullQuote } from "@/components/ui/pull-quote";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";
import { getStory, stories } from "@/mock/stories";

export function StoryModule() {
  const story = getStory(siteConfig.home.featuredStory) ?? stories[0];
  return (
    <Section tone="card">
      <div className="flex items-baseline gap-3 border-t border-rule pt-4 mb-12">
        <span className="section-num">06</span><span aria-hidden className="text-muted">—</span><span className="eyebrow">From the field</span>
      </div>
      <article className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Figure photo={story.image} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-4">{story.category} · {formatDate(story.date)}</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] font-light">
            <Link href={`/stories/${story.slug}`} className="hover:text-forest">{story.title}</Link>
          </h2>
          <p className="lede mt-6">{story.dek}</p>
          <div className="dropcap article mt-8">
            <p>{story.body[0]}</p>
          </div>
          {story.pullQuote && <PullQuote text={story.pullQuote.text} by={story.pullQuote.by} className="my-10" />}
          <Link href={`/stories/${story.slug}`} className="link-arrow">Continue reading · {story.readTime}</Link>
        </div>
      </article>
    </Section>
  );
}
