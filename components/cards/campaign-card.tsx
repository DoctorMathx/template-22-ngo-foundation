import Link from "next/link";
import Image from "next/image";
import type { Campaign } from "@/lib/types";
import { daysLeft, donateHref } from "@/lib/utils";
import { FundingMeter } from "@/components/ui/progress";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="panel panel-hover flex flex-col h-full">
      <div className="relative aspect-[16/10] bg-paper-deep">
        <Image src={campaign.image.src} alt={campaign.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow mb-3">{campaign.kicker}</p>
        <h3 className="font-serif text-2xl leading-tight mb-3">
          <Link href={`/campaigns/${campaign.slug}`} className="hover:text-forest">{campaign.title}</Link>
        </h3>
        <p className="text-sm text-ink-soft leading-relaxed mb-6 line-clamp-3">{campaign.summary}</p>
        <div className="mt-auto">
          <FundingMeter raised={campaign.raised} goal={campaign.goal} donors={campaign.donors} daysLeft={daysLeft(campaign.endDate)} compact />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={donateHref({ campaign: campaign.slug })} className="btn btn-primary btn-sm">Give to this appeal</Link>
            <Link href={`/campaigns/${campaign.slug}`} className="btn btn-outline btn-sm">Read more</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
