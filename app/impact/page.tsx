import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { PullQuote } from "@/components/ui/pull-quote";
import { StoryCard } from "@/components/cards/story-card";
import { headlineStats, milestones, outcomes } from "@/mock/impact";
import { stories } from "@/mock/stories";
import { communities } from "@/mock/communities";

export const metadata: Metadata = {
  title: "Impact",
  description: "What has changed in the communities Ìrètí Foundation serves since 2014 — headline results, outcomes and stories.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact"
        crumbs={[{ label: "Impact" }]}
        title={<>Twelve years. <em className="text-forest">Counted carefully.</em></>}
        lede="We count outcomes — people with water that still flows, births with a skilled attendant, loans repaid — not activities. Every number here traces back to an indicator in our results framework."
      />
      <Section tone="paper" pad="md">
        <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-ink">
          {headlineStats.map((s, i) => (
            <div key={s.label} className={`py-10 border-b border-rule ${i % 2 ? "sm:pl-10 sm:border-l" : "sm:pr-10"}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="num-xl block text-[4.5rem] md:text-[6rem] text-forest">{s.value}</span>
                <span className="block mt-4 text-lg text-ink-soft max-w-sm">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="card">
        <SectionHeader number="01" eyebrow="Outcomes" title={<>What changed <em>in people’s lives.</em></>} lede="Measured through panel surveys and facility data in served communities, compared against baseline." action={<Link href="/results" className="link-arrow">Methodology &amp; indicators</Link>} />
        <div className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <div key={o.title} className="bg-card p-7">
              <p className="num-xl text-5xl text-terracotta">{o.value}</p>
              <h3 className="font-serif text-xl mt-4 mb-2">{o.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <PullQuote text={communities[0].voice.quote} by={`${communities[0].voice.name}, ${communities[0].voice.role}`} large className="max-w-4xl" />
      </Section>

      <Section tone="deep">
        <SectionHeader number="02" eyebrow="Since 2014" title={<>A short <em>history.</em></>} action={<Link href="/about" className="link-arrow">About us</Link>} />
        <ol className="border-t border-ink">
          {milestones.map((m) => (
            <li key={m.year} className="grid grid-cols-[90px_minmax(0,1fr)] md:grid-cols-[160px_minmax(0,1fr)] gap-4 py-5 border-b border-rule items-baseline">
              <span className="font-serif text-3xl text-forest">{m.year}</span>
              <span className="text-ink-soft md:text-lg">{m.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <SectionHeader number="03" eyebrow="Stories" title={<>The people <em>behind the numbers.</em></>} action={<Link href="/stories" className="link-arrow">All stories</Link>} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">{stories.slice(0, 3).map((s) => <StoryCard key={s.slug} story={s} />)}</div>
      </Section>
    </>
  );
}
