import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { FundingMeter } from "@/components/ui/progress";
import { siteConfig } from "@/lib/site-config";
import { daysLeft, donateHref } from "@/lib/utils";
import { campaigns, getCampaign } from "@/mock/campaigns";

export function CampaignModule() {
  const c = getCampaign(siteConfig.home.featuredCampaign) ?? campaigns[0];
  return (
    <Section tone="forest" pad="lg">
      <div className="flex items-baseline gap-3 border-t border-paper/25 pt-4 mb-12">
        <span className="section-num">07</span><span aria-hidden className="text-paper/50">—</span><span className="eyebrow">Current appeal</span>
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6">
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.02]">{c.title}</h2>
          <p className="lede mt-6">{c.summary}</p>
          {c.matched && <p className="mt-6 inline-block border border-[#E9A47B] text-[#F2C3A5] px-3 py-2 text-sm">{c.matched}</p>}
          <div className="mt-10 bg-paper text-ink p-6 md:p-8">
            <FundingMeter raised={c.raised} goal={c.goal} donors={c.donors} daysLeft={daysLeft(c.endDate)} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={donateHref({ campaign: c.slug })} className="btn btn-accent">Give to this appeal</Link>
              <Link href={`/campaigns/${c.slug}`} className="btn btn-outline">Updates &amp; budget</Link>
            </div>
          </div>
        </div>
        <figure className="lg:col-span-5 lg:col-start-8">
          <div className="relative aspect-[4/5] bg-forest">
            <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="caption !text-paper/70 mt-3 border-t border-paper/25 pt-2">{c.image.caption}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
