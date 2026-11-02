import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { PullQuote } from "@/components/ui/pull-quote";
import { ProjectCard } from "@/components/cards/project-card";
import { communities, getCommunity } from "@/mock/communities";
import { projects } from "@/mock/projects";
import { getProgramme } from "@/mock/programmes";
import { donateHref, pct } from "@/lib/utils";

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) return { title: "Community not found" };
  return { title: `${c.name}, ${c.state} State`, description: c.summary };
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCommunity(slug);
  if (!c) notFound();
  const related = projects.filter((p) => p.community === c.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Community profile · ${c.state} State`}
        crumbs={[{ label: "Communities", href: "/communities" }, { label: c.name }]}
        title={c.name}
        lede={c.summary}
        aside={
          <FactList
            items={[
              { label: "LGA", value: c.lga },
              { label: "Population", value: c.population.toLocaleString("en-NG") },
              { label: "Households", value: c.households.toLocaleString("en-NG") },
              { label: "Partner since", value: c.since },
              { label: "Programmes", value: c.programmes.map((p) => getProgramme(p)?.title.split(" ")[0]).join(", ") },
            ]}
          />
        }
      />
      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Figure photo={c.image} aspect="aspect-[16/10]" priority sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="lg:col-span-5">
            <p className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">01</span><span className="eyebrow">The need, at baseline</span></p>
            <dl className="space-y-6">
              {c.needs.map((n) => (
                <div key={n.label} className="border-b border-rule pb-5 flex flex-col-reverse">
                  <dt className="text-ink-soft mt-2">{n.label}</dt>
                  <dd className="num-xl text-5xl text-terracotta">{n.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeader number="02" eyebrow="Progress" title={<>Before, now, <em>and the target.</em></>} lede="Measured by household survey and facility or committee records, verified by our MEL team." />
        <ul className="space-y-10">
          {c.progress.map((pr) => {
            const isPct = pr.unit === "%";
            const scale = isPct ? 100 : pr.target;
            const fmt = (n: number) => (isPct ? `${n}%` : `${n.toLocaleString("en-NG")} ${pr.unit}`);
            return (
              <li key={pr.label} className="grid grid-cols-1 gap-4 md:grid-cols-12 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-serif text-xl">{pr.label}</h3>
                  <p className="text-sm text-muted">{pct(pr.now, pr.target)}% of target reached</p>
                </div>
                <div className="md:col-span-8">
                  <div className="relative h-8 bg-rule/50" role="img" aria-label={`${pr.label}: before ${fmt(pr.before)}, now ${fmt(pr.now)}, target ${fmt(pr.target)}`}>
                    <div className="absolute inset-y-0 left-0 bg-forest/25" style={{ width: `${(pr.before / scale) * 100}%` }} />
                    <div className="absolute inset-y-2 left-0 bg-forest" style={{ width: `${(pr.now / scale) * 100}%` }} />
                    <div className="absolute -inset-y-1 w-0.5 bg-terracotta" style={{ left: `${(pr.target / scale) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[0.78rem] mt-2 text-muted">
                    <span>Before: <b className="text-ink">{fmt(pr.before)}</b></span>
                    <span>Now: <b className="text-forest">{fmt(pr.now)}</b></span>
                    <span>Target: <b className="text-terracotta">{fmt(pr.target)}</b></span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="paper" pad="md">
        <PullQuote text={c.voice.quote} by={`${c.voice.name}, ${c.voice.role}`} large className="max-w-4xl" />
      </Section>

      <Section tone="deep">
        <SectionHeader number="03" eyebrow={`Projects in ${c.name}`} title={related.length ? <>Help finish the work <em>in {c.name}.</em></> : <>Support {c.name} <em>directly.</em></>} action={<Link href={donateHref({ programme: c.programmes[0] })} className="btn btn-primary">Give to this work</Link>} />
        {related.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        ) : (
          <p className="text-ink-soft max-w-2xl">There is no open project in {c.name} right now. Gifts to the {getProgramme(c.programmes[0])?.title.toLowerCase()} programme support ongoing work here, including maintenance and monitoring.</p>
        )}
      </Section>
    </>
  );
}
