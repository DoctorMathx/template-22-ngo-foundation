import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { ProgressBar } from "@/components/ui/progress";
import { SdgBadge } from "@/components/ui/sdg-badge";
import { ProjectCard } from "@/components/cards/project-card";
import { getProject, projectRemaining, projectStatusLabel, projectTotal, projects } from "@/mock/projects";
import { getCommunity } from "@/mock/communities";
import { getProgramme } from "@/mock/programmes";
import { cn, donateHref, formatDate, formatNaira, formatNairaShort, pct } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.summary, openGraph: { images: [{ url: p.image.src }] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const total = projectTotal(project);
  const remaining = projectRemaining(project);
  const percent = pct(project.raised, total);
  const community = getCommunity(project.community);
  const programme = getProgramme(project.programme);
  const others = projects.filter((p) => p.slug !== project.slug && projectRemaining(p) > 0).slice(0, 3);
  const half = Math.round(remaining / 2 / 1000) * 1000;

  return (
    <>
      <PageHeader
        eyebrow={`Project · ${programme?.title ?? ""}`}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        title={project.title}
        lede={project.summary}
      >
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft border-t border-rule pt-5">
          <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-forest" aria-hidden />{project.location}, {project.state} State</li>
          <li className="flex items-center gap-2"><Users className="w-4 h-4 text-forest" aria-hidden />{project.beneficiaries.toLocaleString("en-NG")} {project.beneficiaryLabel}</li>
          <li><span className="tag tag-forest">{projectStatusLabel[project.status]}</span></li>
        </ul>
      </PageHeader>

      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-14 min-w-0">
            <Figure photo={project.image} aspect="aspect-[16/10]" priority sizes="(min-width: 1024px) 58vw, 100vw" />

            <section aria-labelledby="why">
              <div className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">01</span><h2 id="why" className="font-serif text-3xl">The need &amp; the plan</h2></div>
              <div className="article dropcap">{project.body.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}</div>
            </section>

            <section aria-labelledby="budget">
              <div className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">02</span><h2 id="budget" className="font-serif text-3xl">Itemised budget</h2></div>
              <div className="overflow-x-auto">
                <table className="table-ed">
                  <caption className="sr-only">Itemised budget for {project.title}</caption>
                  <thead><tr><th scope="col">Item</th><th scope="col" className="hidden sm:table-cell">Detail</th><th scope="col" className="!text-right">Cost</th><th scope="col" className="!text-right">Share</th></tr></thead>
                  <tbody>
                    {project.budget.map((b) => (
                      <tr key={b.item}>
                        <td className="font-medium pr-4">
                          {b.item}
                          {b.detail && <span className="block sm:hidden text-muted text-[0.8rem] font-normal mt-0.5">{b.detail}</span>}
                        </td>
                        <td className="hidden sm:table-cell text-muted text-[0.85rem] pr-4">{b.detail ?? "—"}</td>
                        <td className="text-right">{formatNaira(b.cost)}</td>
                        <td className="text-right text-muted">{Math.round((b.cost / total) * 100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot><tr><td>Total project cost</td><td className="hidden sm:table-cell" /><td className="text-right">{formatNaira(total)}</td><td className="text-right">100%</td></tr></tfoot>
                </table>
              </div>
              {project.costPerPerson && <p className="caption mt-4">Unit cost: <b>{project.costPerPerson}</b>. Budgets are fixed-price quotes from approved contractors, valid for 90 days; any saving is returned to the project’s community.</p>}
            </section>

            <section aria-labelledby="timeline">
              <div className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">03</span><h2 id="timeline" className="font-serif text-3xl">Timeline &amp; milestones</h2></div>
              <ol className="relative border-l border-rule-strong ml-2">
                {project.milestones.map((m) => (
                  <li key={m.label} className="pl-8 pb-8 last:pb-0 relative">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2",
                        m.status === "done" && "bg-forest border-forest",
                        m.status === "current" && "bg-terracotta border-terracotta ring-4 ring-[color:var(--terracotta-soft)]",
                        m.status === "upcoming" && "bg-paper border-rule-strong",
                      )}
                    />
                    <p className="text-[0.78rem] text-muted flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5" aria-hidden /><time dateTime={m.date}>{formatDate(m.date)}</time> · <span className={cn(m.status === "done" && "text-forest", m.status === "current" && "text-terracotta font-semibold")}>{m.status === "done" ? "Complete" : m.status === "current" ? "In progress" : "Planned"}</span></p>
                    <p className="font-serif text-xl mt-1">{m.label}</p>
                    {m.note && <p className="text-sm text-ink-soft mt-1">{m.note}</p>}
                  </li>
                ))}
              </ol>
            </section>

            {community && (
              <section aria-labelledby="community" className="panel p-6 md:p-8">
                <p className="eyebrow mb-2">The community</p>
                <h2 id="community" className="font-serif text-2xl mb-3">{community.name}, {community.state} State</h2>
                <p className="text-ink-soft leading-relaxed mb-5">{community.summary}</p>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm border-t border-rule pt-4">
                  <div><dt className="text-muted">Population</dt><dd className="font-serif text-xl">{community.population.toLocaleString("en-NG")}</dd></div>
                  <div><dt className="text-muted">Households</dt><dd className="font-serif text-xl">{community.households.toLocaleString("en-NG")}</dd></div>
                  <div><dt className="text-muted">Partner since</dt><dd className="font-serif text-xl">{community.since}</dd></div>
                </dl>
                <Link href={`/communities/${community.slug}`} className="link-arrow mt-6">Community profile &amp; progress</Link>
              </section>
            )}

            <section aria-label="Sustainable Development Goals" className="flex flex-wrap items-center gap-4 border-t border-rule pt-6">
              <span className="eyebrow">Contributes to</span>
              {project.sdgs.map((g) => <SdgBadge key={g} goal={g} withTitle />)}
            </section>
          </div>

          {/* Funding sidebar */}
          <aside className="lg:col-span-5 lg:col-start-8 min-w-0" aria-label="Fund this project">
            <div className="lg:sticky lg:top-28 bg-card border border-ink">
              <div className="p-6 md:p-8 border-b border-rule">
                <p className="eyebrow mb-3">Funding status</p>
                <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span><span className="font-serif text-[2rem] sm:text-4xl tabular">{formatNaira(project.raised)}</span> <span className="text-sm text-muted">raised</span></span>
                  <span className="font-serif italic text-2xl text-terracotta">{percent}%</span>
                </p>
                <ProgressBar value={project.raised} max={total} className="mt-4 !h-2" />
                <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                  <div><dt className="text-muted">Total cost</dt><dd className="font-semibold tabular">{formatNairaShort(total)}</dd></div>
                  <div><dt className="text-muted">Remaining</dt><dd className="font-semibold tabular text-terracotta">{formatNairaShort(remaining)}</dd></div>
                  <div><dt className="text-muted">Funders</dt><dd className="font-semibold tabular">{project.funders}</dd></div>
                </dl>
              </div>
              <div className="p-6 md:p-8 space-y-3">
                {remaining > 0 ? (
                  <>
                    <Link href={donateHref({ amount: remaining, project: project.slug })} className="btn btn-accent btn-lg w-full">Fund the remaining {formatNaira(remaining)}</Link>
                    <Link href={donateHref({ amount: total, project: project.slug })} className="btn btn-primary w-full">Fund the whole project · {formatNairaShort(total)}</Link>
                    {half >= 1000 && <Link href={donateHref({ amount: half, project: project.slug })} className="btn btn-outline w-full">Fund half the gap · {formatNaira(half)}</Link>}
                    <Link href={donateHref({ project: project.slug })} className="btn btn-outline w-full">Give any amount</Link>
                    <p className="text-[0.78rem] text-muted pt-2">Funding the whole project? You’ll receive a named handover report and an invitation to the handover. If the project is over-funded, we’ll ask before moving any surplus.</p>
                  </>
                ) : (
                  <>
                    <p className="font-serif text-xl">This project is fully funded. Thank you to all {project.funders} funders.</p>
                    <Link href="/projects" className="btn btn-primary w-full">Find a project that still needs you</Link>
                  </>
                )}
              </div>
              <div className="px-6 md:px-8 pb-6 text-[0.8rem] text-ink-soft border-t border-rule pt-5">
                <p className="font-semibold text-ink mb-1">Funding as an organisation?</p>
                <p>Grants and co-funding for this project are welcome. <Link href="/funders#proposal" className="prose-link">Submit a concept note</Link> or email the partnerships team.</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="deep" pad="md">
          <div className="flex items-baseline justify-between gap-4 border-t border-ink pt-4 mb-10">
            <h2 className="font-serif text-3xl">Other projects to fund</h2>
            <Link href="/projects" className="link-arrow">All projects</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{others.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        </Section>
      )}
    </>
  );
}
