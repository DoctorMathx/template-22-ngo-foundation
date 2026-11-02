import type { Metadata } from "next";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { CommunityCard } from "@/components/cards/community-card";
import { communities } from "@/mock/communities";
import { sum } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Communities",
  description: "Profiles of the communities Ìrètí Foundation works with in Oyo, Kwara, Niger and Plateau — population, needs and measured progress.",
};

export default function CommunitiesPage() {
  const states = Array.from(new Set(communities.map((c) => c.state)));
  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        crumbs={[{ label: "Communities" }]}
        title={<>Named places. <em className="text-forest">Measured progress.</em></>}
        lede="We work with a small number of communities for a long time. Each profile shows the community’s own baseline, the need we were asked to help with, and where things stand today."
        aside={
          <FactList
            items={[
              { label: "Partner communities", value: communities.length },
              { label: "Combined population", value: sum(communities.map((c) => c.population)).toLocaleString("en-NG") },
              { label: "States", value: states.join(", ") },
            ]}
          />
        }
      />
      {states.map((s, i) => (
        <Section key={s} tone={i % 2 ? "card" : "paper"} pad="md">
          <SectionHeader number={String(i + 1).padStart(2, "0")} eyebrow={`${s} State`} title={<>{s} <em>State</em></>} split={false} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communities.filter((c) => c.state === s).map((c) => <CommunityCard key={c.slug} community={c} />)}
          </div>
        </Section>
      ))}
    </>
  );
}
