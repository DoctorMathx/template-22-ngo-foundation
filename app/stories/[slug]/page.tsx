import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { PullQuote } from "@/components/ui/pull-quote";
import { StoryCard } from "@/components/cards/story-card";
import { getStory, stories } from "@/mock/stories";
import { getProgramme } from "@/mock/programmes";
import { donateHref, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.dek, openGraph: { type: "article", images: [{ url: s.image.src }] } };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const programme = s.programme ? getProgramme(s.programme) : undefined;
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);
  const splitAt = Math.min(3, s.body.length);

  return (
    <article>
      <header className="bg-paper border-b border-rule">
        <div className="container-narrow pt-10 pb-12 md:pt-14">
          <nav aria-label="Breadcrumb" className="mb-10 text-[0.78rem] text-muted"><Link href="/" className="hover:underline underline-offset-4">Home</Link> / <Link href="/stories" className="hover:underline underline-offset-4">Stories</Link></nav>
          <p className="eyebrow mb-5">{s.category}{programme ? ` · ${programme.title}` : ""}</p>
          <h1 className="[overflow-wrap:break-word] font-serif font-light text-[2.4rem] sm:text-[2.6rem] md:text-[3.8rem] leading-[1.04]">{s.title}</h1>
          <p className="font-serif italic text-xl md:text-2xl text-ink-soft mt-6 leading-snug">{s.dek}</p>
          <p className="mt-8 pt-5 border-t border-ink flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span>By <b>{s.author}</b>, {s.authorRole}</span>
            <time dateTime={s.date} className="text-muted">{formatDate(s.date)}</time>
            <span className="text-muted">{s.readTime}</span>
          </p>
        </div>
      </header>
      <div className="container-x pt-12"><Figure photo={s.image} aspect="aspect-[21/9]" priority sizes="100vw" /></div>
      <Section tone="paper" pad="md" narrow>
        <div className="article dropcap">
          {s.body.slice(0, splitAt).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        {s.pullQuote && <PullQuote text={s.pullQuote.text} by={s.pullQuote.by} large className="my-12 lg:-mx-16" />}
        <div className="article">
          {s.body.slice(splitAt).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <aside className="mt-14 bg-card border border-ink p-7 grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="eyebrow mb-2">Support this work</p>
            <p className="font-serif text-2xl leading-snug">{programme ? programme.impactLine : "Every gift is receipted, restricted if you choose, and reported on."}</p>
          </div>
          <Link href={donateHref({ programme: s.programme })} className="btn btn-accent">Donate</Link>
        </aside>
      </Section>
      <Section tone="deep" pad="md">
        <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-4 mb-10"><h2 className="font-serif text-3xl">More stories</h2><Link href="/stories" className="link-arrow">All stories</Link></div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">{more.map((x) => <StoryCard key={x.slug} story={x} />)}</div>
      </Section>
    </article>
  );
}
