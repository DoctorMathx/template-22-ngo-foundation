import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { PullQuote } from "@/components/ui/pull-quote";
import { board, team } from "@/mock/people";
import { milestones } from "@/mock/impact";
import { photos } from "@/mock/photos";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About us",
  description: "Ìrètí Foundation’s mission, vision, values, history, leadership team and Board of Trustees.",
};

const values = [
  { title: "Evidence over anecdote", text: "We count what lasts, publish what we find, and change course when the data tells us to." },
  { title: "Communities own the work", text: "Committees, cooperatives and State partners own what we build. We’re guests who stay for five years." },
  { title: "Women at the centre", text: "At least half of every committee. Women’s time, health and income are how we judge success." },
  { title: "Every naira, accounted for", text: "Ring-fenced funds, published accounts, independent audit — without exception." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Ìrètí"
        crumbs={[{ label: "About" }]}
        title={<>A foundation built on <em className="text-forest">hope — and evidence.</em></>}
        lede={`${siteConfig.brand.meaning} We were founded in Ibadan in ${siteConfig.brand.founded} by a public-health doctor and four community health workers who were tired of seeing boreholes and clinics built, photographed and abandoned.`}
      />
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Figure photo={{ src: photos.meeting, alt: "Hands around a meeting table with papers", caption: "A water committee’s quarterly accounts review.", credit: "Ìrètí Foundation" }} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-12">
            <div>
              <p className="flex items-baseline gap-3 border-t border-ink pt-4 mb-4"><span className="section-num">01</span><span className="eyebrow">Mission</span></p>
              <p className="font-serif text-3xl md:text-[2.4rem] leading-tight font-light">To bring clean water, safe childbirth and fair livelihoods to rural Nigerian communities — <em>and to make them last.</em></p>
            </div>
            <div>
              <p className="flex items-baseline gap-3 border-t border-ink pt-4 mb-4"><span className="section-num">02</span><span className="eyebrow">Vision</span></p>
              <p className="font-serif text-2xl leading-snug">A Nigeria where no woman walks for water, no mother gives birth in the dark, and every working woman can borrow to grow.</p>
            </div>
            <div className="article dropcap">
              <p>Ìrètí began with a single borehole in Igbo-Ora and a promise to the community that we would come back every quarter to check it still worked. Twelve years later, we keep that promise at 64 water points, 11 primary health centres and 186 women’s cooperatives across four states.</p>
              <p>We remain deliberately small in geography and deliberately long in commitment. We say no to work we cannot monitor, and we publish the indicators we are behind on alongside the ones we have achieved.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeader number="03" eyebrow="Values" title={<>What we <em>hold to.</em></>} />
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title} className="bg-card p-7">
              <p className="font-serif italic text-terracotta text-2xl mb-3">{["i", "ii", "iii", "iv"][i]}.</p>
              <h3 className="font-serif text-xl mb-2">{v.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{v.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" id="history">
        <SectionHeader number="04" eyebrow="History" title={<>Since <em>2014.</em></>} />
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border-y border-rule sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <li key={m.year} className="bg-paper p-6">
              <p className="font-serif text-4xl text-forest">{m.year}</p>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="card" id="team">
        <SectionHeader number="05" eyebrow="Leadership team" title={<>The people <em>accountable to you.</em></>} lede="42 staff, 81% based in our field offices in Bida, Ilorin and Jos." />
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t) => (
            <li key={t.name}>
              <div className="relative aspect-[4/5] bg-paper-deep overflow-hidden grayscale-[25%]">
                {t.photo && <Image src={t.photo} alt={`Portrait of ${t.name}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
              </div>
              <div className="border-t border-ink mt-4 pt-4">
                <h3 className="font-serif text-2xl">{t.name}</h3>
                <p className="text-sm text-terracotta font-semibold mt-1">{t.role}</p>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">{t.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" id="board">
        <SectionHeader number="06" eyebrow="Board of trustees" title={<>Independent <em>oversight.</em></>} action={<Link href="/transparency#board" className="link-arrow">Governance &amp; committees</Link>} />
        <ul className="border-t border-ink">
          {board.map((b) => (
            <li key={b.name} className="grid grid-cols-1 gap-2 md:grid-cols-12 py-5 border-b border-rule items-baseline">
              <span className="md:col-span-4 font-serif text-xl">{b.name}</span>
              <span className="md:col-span-3 text-sm text-terracotta font-semibold">{b.role}</span>
              <span className="md:col-span-5 text-sm text-ink-soft">{b.bio}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="deep" pad="md">
        <PullQuote large text="We would rather build thirty boreholes that work for twenty years than a hundred that work for two." by={`${team[0].name}, ${team[0].role}`} className="max-w-4xl" />
      </Section>
    </>
  );
}
