import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { FundingMeter } from "@/components/ui/progress";
import { BarList } from "@/components/ui/charts";
import { campaigns, getCampaign } from "@/mock/campaigns";
import { getProgramme } from "@/mock/programmes";
import { daysLeft, donateHref, formatDate, formatNaira, sum } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return { title: "Campaign not found" };
  return { title: c.title, description: c.summary, openGraph: { images: [{ url: c.image.src }] } };
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const programme = getProgramme(c.programme);
  const left = daysLeft(c.endDate);
  const amounts = siteConfig.donation.presets.NGN.slice(1, 5);
  const usesTotal = sum(c.uses.map((u) => u.amount));

  return (
    <>
      <PageHeader eyebrow={c.kicker} crumbs={[{ label: "Campaigns", href: "/campaigns" }, { label: c.title }]} title={c.title} lede={c.summary} />
      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-14">
            <Figure photo={c.image} aspect="aspect-[16/10]" priority sizes="(min-width: 1024px) 58vw, 100vw" />
            <section aria-labelledby="story">
              <div className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">01</span><h2 id="story" className="font-serif text-3xl">Why this appeal</h2></div>
              <div className="article dropcap">{c.story.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
              {programme && <Link href={`/programmes/${programme.slug}`} className="link-arrow">About the {programme.title.toLowerCase()} programme</Link>}
            </section>

            <section aria-labelledby="uses">
              <div className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">02</span><h2 id="uses" className="font-serif text-3xl">How the funds will be used</h2></div>
              <BarList data={c.uses.map((u) => ({ label: u.label, value: u.amount }))} max={usesTotal} />
              <p className="caption mt-5">Budget total {formatNaira(usesTotal)}. If the appeal is over-subscribed, surplus goes to the next surveyed site in the same programme — and we’ll tell you where.</p>
            </section>

            <section aria-labelledby="updates">
              <div className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">03</span><h2 id="updates" className="font-serif text-3xl">Updates</h2></div>
              <ol className="relative border-l border-rule-strong ml-2">
                {c.updates.map((u, i) => (
                  <li key={u.title} className="pl-8 pb-8 last:pb-0 relative">
                    <span aria-hidden className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full ${i === 0 ? "bg-terracotta" : "bg-forest"}`} />
                    <p className="text-[0.78rem] text-muted"><time dateTime={u.date}>{formatDate(u.date)}</time></p>
                    <h3 className="font-serif text-xl mt-1">{u.title}</h3>
                    <p className="text-ink-soft mt-1 leading-relaxed">{u.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8 space-y-8" aria-label="Give to this appeal">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div className="bg-card border border-ink p-6 md:p-8">
                <FundingMeter raised={c.raised} goal={c.goal} donors={c.donors} daysLeft={left} />
                {c.matched && <p className="mt-5 p-3 bg-terracotta-soft text-sm">{c.matched}</p>}
                <p className="eyebrow mt-7 mb-3">Choose an amount</p>
                <div className="grid grid-cols-2 gap-2">
                  {amounts.map((a) => (
                    <Link key={a} href={donateHref({ amount: a, campaign: c.slug })} className="btn btn-outline">{formatNaira(a)}</Link>
                  ))}
                </div>
                <Link href={donateHref({ campaign: c.slug })} className="btn btn-accent btn-lg w-full mt-3">Give to this appeal</Link>
                <Link href={donateHref({ campaign: c.slug, frequency: "monthly" })} className="btn btn-primary w-full mt-2">Give monthly</Link>
                <p className="text-[0.78rem] text-muted mt-4">Closes {formatDate(c.endDate)}. Gifts are restricted to this appeal.</p>
              </div>
              <div>
                <h2 className="eyebrow mb-3">Recent donors</h2>
                <ul className="border-t border-ink">
                  {c.recentDonors.map((d) => (
                    <li key={d.name + d.when} className="py-3 border-b border-rule">
                      <p className="flex justify-between gap-4 text-sm"><span className="font-semibold">{d.name}</span><span className="tabular">{formatNaira(d.amount)}</span></p>
                      <p className="text-[0.75rem] text-muted">{d.when}</p>
                      {d.note && <p className="font-serif italic text-[0.95rem] mt-1 text-ink-soft">“{d.note}”</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
