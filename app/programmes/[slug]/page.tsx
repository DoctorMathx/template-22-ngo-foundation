import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { SdgBadge } from "@/components/ui/sdg-badge";
import { StatusLabel } from "@/components/ui/status-label";
import { ProjectCard } from "@/components/cards/project-card";
import { StoryCard } from "@/components/cards/story-card";
import { getProgramme, programmes } from "@/mock/programmes";
import { projects } from "@/mock/projects";
import { stories } from "@/mock/stories";
import { indicators } from "@/mock/results";
import { communities } from "@/mock/communities";
import { donateHref } from "@/lib/utils";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.title, description: p.summary };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const related = projects.filter((x) => x.programme === p.slug);
  const relatedStories = stories.filter((s) => s.programme === p.slug).slice(0, 2);
  const inds = indicators.filter((i) => i.programme === p.slug);
  const where = communities.filter((c) => c.programmes.includes(p.slug));

  return (
    <>
      <PageHeader
        eyebrow={`Programme ${p.number}`}
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: p.title }]}
        title={p.title}
        lede={p.summary}
        aside={<FactList items={[...p.stats.map((s) => ({ label: s.label, value: s.value })), { label: "Share of programme spend", value: `${p.budgetShare}%` }]} />}
      />
      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Figure photo={p.image} aspect="aspect-[16/10]" priority sizes="(min-width: 1024px) 58vw, 100vw" />
            <div className="article dropcap mt-12">{p.body.map((b) => <p key={b.slice(0, 20)}>{b}</p>)}</div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9 space-y-8">
            <div className="bg-card border border-ink p-6">
              <p className="eyebrow mb-3">What a gift does</p>
              <p className="font-serif text-2xl leading-snug">{p.impactLine}</p>
              <Link href={donateHref({ programme: p.slug })} className="btn btn-accent w-full mt-6">Give to this programme</Link>
              <Link href={donateHref({ programme: p.slug, frequency: "monthly" })} className="btn btn-outline w-full mt-2">Give monthly</Link>
            </div>
            <div>
              <p className="eyebrow mb-3">Where we deliver it</p>
              <ul className="border-t border-ink">
                {where.map((c) => (
                  <li key={c.slug} className="border-b border-rule"><Link href={`/communities/${c.slug}`} className="flex justify-between items-center min-h-[48px] hover:text-forest"><span className="font-serif text-lg">{c.name}</span><span className="text-sm text-muted">{c.state}</span></Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">SDG contribution</p>
              <div className="flex flex-col gap-2">{p.sdgs.map((g) => <SdgBadge key={g} goal={g} withTitle />)}</div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeader number="01" eyebrow="Our approach" title={<>Four steps, <em>always in this order.</em></>} />
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule md:grid-cols-2 lg:grid-cols-4">
          {p.approach.map((a, i) => (
            <li key={a.title} className="bg-card p-7">
              <p className="font-serif italic text-terracotta text-3xl mb-4">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-serif text-xl mb-2">{a.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{a.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <SectionHeader number="02" eyebrow="Indicators" title={<>How we measure <em>this programme.</em></>} action={<Link href="/results" className="link-arrow">Full results framework</Link>} />
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="table-ed min-w-[720px]">
            <caption className="sr-only">Indicators for {p.title}</caption>
            <thead><tr><th scope="col">Code</th><th scope="col">Indicator</th><th scope="col">Baseline</th><th scope="col">Target</th><th scope="col">Achieved</th><th scope="col">Status</th></tr></thead>
            <tbody>
              {inds.map((i) => (
                <tr key={i.code}>
                  <td className="font-serif italic text-terracotta">{i.code}</td>
                  <td className="pr-6">{i.indicator}</td>
                  <td className="text-muted">{i.baseline}</td>
                  <td>{i.target}</td>
                  <td className="font-semibold">{i.achieved}</td>
                  <td><StatusLabel status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="deep">
          <SectionHeader number="03" eyebrow="Projects to fund" title={<>Fund a {p.title.toLowerCase()} <em>project.</em></>} action={<Link href="/projects" className="link-arrow">All projects</Link>} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((x) => <ProjectCard key={x.slug} project={x} />)}</div>
        </Section>
      )}

      {relatedStories.length > 0 && (
        <Section tone="paper" pad="md">
          <SectionHeader number="04" eyebrow="From the field" title={<>Stories from <em>this programme.</em></>} />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">{relatedStories.map((s) => <StoryCard key={s.slug} story={s} />)}</div>
        </Section>
      )}
    </>
  );
}
