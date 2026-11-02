import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { CommunityCard } from "@/components/cards/community-card";
import { communities } from "@/mock/communities";

export function CommunitiesModule() {
  const states = Array.from(new Set(communities.map((c) => c.state)));
  return (
    <Section tone="deep">
      <SectionHeader number="04" eyebrow="Where we work" title={<>Six partner communities, <em>each with its own baseline.</em></>} lede={`We work in ${states.join(", ")} States, staying for at least five years and reporting progress against each community’s own starting point.`} action={<Link href="/communities" className="link-arrow">Community profiles</Link>} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communities.map((c) => <CommunityCard key={c.slug} community={c} />)}
      </div>
    </Section>
  );
}
