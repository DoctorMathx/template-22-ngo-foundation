import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectCard } from "@/components/cards/project-card";
import { projects, projectRemaining } from "@/mock/projects";
import { formatNairaShort, sum } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects you can fund",
  description: "Fully-costed water, health and livelihoods projects with itemised budgets, milestones and live funding progress. Fund the remaining balance or the whole project.",
};

export default function ProjectsPage() {
  const open = projects.filter((p) => projectRemaining(p) > 0);
  const funded = projects.filter((p) => projectRemaining(p) === 0);
  const totalGap = sum(open.map(projectRemaining));
  return (
    <>
      <PageHeader
        eyebrow="Fund a project"
        crumbs={[{ label: "Projects" }]}
        title={<>Projects you can <em className="text-forest">fund outright.</em></>}
        lede="Every project here is a named place with a costed budget, a timeline and a community committee waiting to start. Give toward it, close the gap, or fund the whole thing — and receive a personal handover report."
        aside={
          <FactList
            items={[
              { label: "Open projects", value: open.length },
              { label: "Total still needed", value: formatNairaShort(totalGap) },
              { label: "Funded & in delivery", value: funded.length },
              { label: "Indirect cost rate", value: "8% of direct" },
            ]}
          />
        }
      />
      <Section tone="paper">
        <SectionHeader number="01" eyebrow="Open for funding" title={<>Choose a project. <em>See every line.</em></>} lede="Budgets include survey, construction, training, testing and our 8% management and M&E cost — nothing hidden." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {open.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
        </div>
      </Section>
      {funded.length > 0 && (
        <Section tone="deep" pad="md">
          <SectionHeader number="02" eyebrow="Funded · in delivery" title={<>Fully funded — <em>follow along.</em></>} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {funded.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </Section>
      )}
      <Section tone="card" pad="md">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-3">For foundations, companies &amp; families</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Want to fund a project <em>that isn’t listed?</em></h2>
            <p className="lede mt-4">We hold a pipeline of surveyed sites across all four states, from ₦5m hand-pump boreholes to ₦40m PHC upgrades. Current pipeline: 38 surveyed sites, about ₦640m.</p>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <Link href="/funders#proposal" className="btn btn-primary">Request the pipeline</Link>
            <Link href="/partnerships" className="btn btn-outline">Corporate partnerships</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
