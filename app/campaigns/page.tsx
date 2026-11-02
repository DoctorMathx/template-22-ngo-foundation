import type { Metadata } from "next";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { CampaignCard } from "@/components/cards/campaign-card";
import { campaigns } from "@/mock/campaigns";
import { formatNairaShort, sum } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Campaigns & appeals",
  description: "Current Ìrètí Foundation appeals for clean water, safe births and women’s cooperatives — with live progress, budgets and updates.",
};

export default function CampaignsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campaigns & appeals"
        crumbs={[{ label: "Campaigns" }]}
        title={<>Appeals with a <em className="text-forest">deadline</em> and a budget.</>}
        lede="Each appeal funds a defined set of projects, with a published budget and regular updates. When an appeal closes, we report on what was raised and what it paid for."
        aside={
          <FactList
            items={[
              { label: "Live appeals", value: campaigns.length },
              { label: "Raised so far", value: formatNairaShort(sum(campaigns.map((c) => c.raised))) },
              { label: "Donors", value: sum(campaigns.map((c) => c.donors)).toLocaleString("en-NG") },
            ]}
          />
        }
      />
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => <CampaignCard key={c.slug} campaign={c} />)}
        </div>
      </Section>
    </>
  );
}
