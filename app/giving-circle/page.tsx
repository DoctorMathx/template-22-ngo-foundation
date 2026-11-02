import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { PullQuote } from "@/components/ui/pull-quote";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { circleStats, circleTiers } from "@/mock/giving";
import { cn, donateHref, formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Friends of Ìrètí — monthly giving circle",
  description: "Join Friends of Ìrètí, our monthly giving circle. Four tiers from ₦5,000 a month, in naira, dollars or pounds, with field letters and live calls from project sites.",
};

export default function GivingCirclePage() {
  return (
    <>
      <PageHeader
        eyebrow="Friends of Ìrètí"
        crumbs={[{ label: "Giving circle" }]}
        title={<>A circle of friends who <em className="text-forest">keep the water flowing.</em></>}
        lede="Monthly gifts are what keep a borehole working in year five, not just year one. Friends of Ìrètí fund the testing, repairs, refresher training and follow-up that most donors never see — and that make every other result last."
        aside={<FactList items={circleStats.map((s) => ({ label: s.label, value: s.value }))} />}
      />
      <Section tone="paper">
        <SectionHeader number="01" eyebrow="Choose your tier" title={<>Four ways to <em>belong.</em></>} lede="Give in naira, dollars or pounds. Change or cancel at any time." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {circleTiers.map((t) => (
            <article key={t.name} className={cn("flex flex-col p-7 border", t.featured ? "bg-forest-deep text-paper on-dark border-forest" : "bg-card border-ink")}>
              {t.featured && <p className="text-[0.66rem] uppercase tracking-[0.18em] font-semibold text-[#E9A47B] mb-3">Most chosen</p>}
              <h2 className="font-serif text-3xl">{t.name}</h2>
              <p className="mt-4"><span className="font-serif text-4xl tabular">{formatNaira(t.monthly)}</span><span className={t.featured ? "text-paper/70" : "text-muted"}> / month</span></p>
              <p className={cn("text-[0.8rem] mt-1", t.featured ? "text-paper/70" : "text-muted")}>or ${t.usd} · £{t.gbp} a month from abroad</p>
              <p className={cn("font-serif italic text-lg mt-5 leading-snug", t.featured ? "text-paper" : "text-forest")}>{t.impact}</p>
              <ul className={cn("mt-6 space-y-2.5 text-sm flex-1", t.featured ? "text-paper/85" : "text-ink-soft")}>
                {t.benefits.map((b) => <li key={b} className="pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-px before:bg-current">{b}</li>)}
              </ul>
              <div className="mt-8 space-y-2">
                <Link href={donateHref({ amount: t.monthly, frequency: "monthly", designation: "circle" })} className={cn("btn w-full", t.featured ? "btn-paper" : "btn-primary")}>Join in naira</Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={donateHref({ amount: t.usd, currency: "USD", frequency: "monthly", designation: "circle" })} className={cn("btn btn-sm", t.featured ? "btn-ghost-light" : "btn-outline")}>${t.usd} USD</Link>
                  <Link href={donateHref({ amount: t.gbp, currency: "GBP", frequency: "monthly", designation: "circle" })} className={cn("btn btn-sm", t.featured ? "btn-ghost-light" : "btn-outline")}>£{t.gbp} GBP</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="card">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <PullQuote large text="I grew up walking to the stream in Igbo-Ora. Now I live in Manchester, and every month, my £12 helps make sure no girl there has to." by="Dr. Tọ́pẹ́ A., Steward since 2021" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow mb-4">What members receive</p>
            <ul className="border-t border-ink">
              {["A quarterly field letter, written in the community", "Your annual giving statement each January", "Live calls from project sites, twice a year", "First invitation to site visits and events"].map((x) => (
                <li key={x} className="border-b border-rule py-3 text-ink-soft">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="paper" pad="md" narrow>
        <h2 className="font-serif text-3xl mb-8">Questions from members</h2>
        <FaqAccordion
          items={[
            { q: "Can I change my tier or pause?", a: "Yes, at any time — reply to any receipt, email us, or call. Pausing for up to six months keeps your membership active." },
            { q: "Can I choose where my monthly gift goes?", a: "Guardians and Patrons can restrict to a programme. Friends and Stewards’ gifts are unrestricted, which lets us fund maintenance and monitoring where it’s needed most." },
            { q: "I live abroad — how do I give?", a: "Choose the USD or GBP button on any tier. Your card is charged in that currency; we show the naira equivalent so you know what reaches the field." },
          ]}
        />
      </Section>
    </>
  );
}
