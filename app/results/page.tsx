import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProgressBar } from "@/components/ui/progress";
import { StatusLabel } from "@/components/ui/status-label";
import { evaluations, indicators, learning, sdgs } from "@/mock/results";
import { programmes } from "@/mock/programmes";
import { communities } from "@/mock/communities";

export const metadata: Metadata = {
  title: "Results & accountability",
  description: "Ìrètí Foundation’s public results framework: M&E indicators with baseline, target, achieved and status, SDG alignment, evaluations and what we’ve learned.",
};

export default function ResultsPage() {
  const counts = {
    achieved: indicators.filter((i) => i.status === "achieved").length,
    onTrack: indicators.filter((i) => i.status === "on-track").length,
    behind: indicators.filter((i) => i.status === "behind").length,
  };
  return (
    <>
      <PageHeader
        eyebrow="Results & accountability"
        crumbs={[{ label: "Results" }]}
        title={<>The results framework, <em className="text-forest">in full.</em></>}
        lede="Thirteen indicators across three programmes, each with a 2021 baseline, a target for the end of our 2022–2026 strategy, and the latest verified figure. Including the ones we are behind on."
        aside={
          <FactList
            items={[
              { label: "Indicators tracked", value: indicators.length },
              { label: "Achieved", value: <span className="status status-ok">{counts.achieved}</span> },
              { label: "On track", value: <span className="status status-warn">{counts.onTrack}</span> },
              { label: "Behind", value: <span className="status status-risk">{counts.behind}</span> },
              { label: "Data as at", value: "31 Dec 2025" },
            ]}
          />
        }
      />

      <Section tone="paper" id="framework">
        <SectionHeader number="01" eyebrow="M&E indicators" title={<>Baseline, target, <em>achieved.</em></>} lede="Data is verified quarterly by our MEL team and reviewed annually by an external evaluator." action={<a href="#" className="btn btn-outline btn-sm"><Download className="w-4 h-4" aria-hidden /> Download dataset (CSV)</a>} />
        {programmes.map((p) => (
          <div key={p.slug} className="mb-14 last:mb-0">
            <h3 className="flex items-baseline gap-3 mb-4">
              <span className="section-num">{p.number}</span>
              <Link href={`/programmes/${p.slug}`} className="font-serif text-2xl hover:text-forest">{p.title}</Link>
            </h3>
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="table-ed min-w-[900px]">
                <caption className="sr-only">Indicators for {p.title}</caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-14">Code</th>
                    <th scope="col">Indicator</th>
                    <th scope="col">Baseline (2021)</th>
                    <th scope="col">Target (2026)</th>
                    <th scope="col">Achieved (2025)</th>
                    <th scope="col" className="w-40">Progress to target</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {indicators.filter((i) => i.programme === p.slug).map((i) => (
                    <tr key={i.code}>
                      <td className="font-serif italic text-terracotta">{i.code}</td>
                      <td className="pr-6">
                        <span className="block">{i.indicator}</span>
                        <span className="block text-[0.75rem] text-muted mt-1">Source: {i.source}</span>
                      </td>
                      <td className="text-muted">{i.baseline}</td>
                      <td>{i.target}</td>
                      <td className="font-semibold">{i.achieved}</td>
                      <td className="pr-6"><ProgressBar value={i.progress} max={100} label={`${i.code}: ${i.progress}% of target`} /><span className="text-[0.72rem] text-muted">{i.progress}%</span></td>
                      <td><StatusLabel status={i.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Section>

      <Section tone="deep" id="learning">
        <SectionHeader number="02" eyebrow="Learning" title={<>What didn’t work, <em>and what we changed.</em></>} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {learning.map((l) => (
            <article key={l.title} className="bg-card border border-rule p-7">
              <h3 className="font-serif text-xl mb-3">{l.title}</h3>
              <p className="text-ink-soft leading-relaxed text-[0.95rem]">{l.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="paper" id="sdgs">
        <SectionHeader number="03" eyebrow="SDG alignment" title={<>How our work maps to the <em>Global Goals.</em></>} lede="We report against SDG targets 6.1, 6.2, 3.1, 3.2, 3.b, 5.a and 8.10 in our annual report." />
        <ul className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule sm:grid-cols-2 lg:grid-cols-4">
          {sdgs.map((s) => (
            <li key={s.goal} className="bg-card p-6 flex flex-col">
              <span className="w-12 h-12 flex items-center justify-center text-white font-bold text-lg mb-4" style={{ background: s.color }} aria-hidden>{s.goal}</span>
              <h3 className="font-serif text-xl mb-2">SDG {s.goal}: {s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.contribution}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="card" id="communities">
        <SectionHeader number="04" eyebrow="Results by community" title={<>Progress, <em>place by place.</em></>} action={<Link href="/communities" className="link-arrow">Community profiles</Link>} />
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="table-ed min-w-[760px]">
            <caption className="sr-only">Headline progress by community</caption>
            <thead><tr><th scope="col">Community</th><th scope="col">State</th><th scope="col">Headline indicator</th><th scope="col">Before</th><th scope="col">Now</th><th scope="col">Target</th></tr></thead>
            <tbody>
              {communities.map((c) => {
                const h = c.progress[0];
                const u = h.unit === "%" ? "%" : "";
                return (
                  <tr key={c.slug}>
                    <td><Link href={`/communities/${c.slug}`} className="font-serif text-lg hover:text-forest">{c.name}</Link></td>
                    <td className="text-muted">{c.state}</td>
                    <td>{h.label}</td>
                    <td className="text-muted">{h.before.toLocaleString("en-NG")}{u}</td>
                    <td className="font-semibold">{h.now.toLocaleString("en-NG")}{u}</td>
                    <td>{h.target.toLocaleString("en-NG")}{u}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="paper" id="evaluations" pad="md">
        <SectionHeader number="05" eyebrow="Independent evaluations" title={<>Don’t take <em>our word</em> for it.</>} action={<Link href="/transparency" className="link-arrow">Financials &amp; governance</Link>} />
        <ul className="border-t border-ink">
          {evaluations.map((e) => (
            <li key={e.title} className="border-b border-rule">
              <a href="#" className="group grid grid-cols-1 gap-2 md:grid-cols-12 py-5 items-baseline">
                <span className="md:col-span-1 font-serif italic text-terracotta">{e.year}</span>
                <span className="md:col-span-7 font-serif text-xl group-hover:text-forest">{e.title}</span>
                <span className="md:col-span-3 text-sm text-muted">{e.by}</span>
                <span className="md:col-span-1 md:text-right"><Download className="w-4 h-4 inline text-forest" aria-label="Download" /></span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
