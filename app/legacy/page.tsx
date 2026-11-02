import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { CopyButton } from "@/components/ui/copy-button";
import { FactList } from "@/components/ui/page-header";
import { legacySteps, willWording } from "@/mock/giving";
import { photos } from "@/mock/photos";
import { siteConfig } from "@/lib/site-config";
import { LegacyForm } from "./legacy-form";

export const metadata: Metadata = {
  title: "Legacy giving — a gift in your will",
  description: "Remember Ìrètí Foundation in your will. Sample bequest wording, our legal details for your solicitor, and how legacy gifts are used.",
};

export default function LegacyPage() {
  const { org } = siteConfig;
  return (
    <>
      <PageHeader
        eyebrow="Legacy giving"
        crumbs={[{ label: "Legacy giving" }]}
        title={<>Leave a gift that <em className="text-forest">keeps flowing.</em></>}
        lede="A gift in your will — of any size — can fund a borehole that serves a community for twenty years. After family and friends are provided for, please consider remembering Ìrètí."
      />
      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6">
            <Figure photo={{ src: photos.tree, alt: "A single broad tree in a green field under a blue sky", caption: "The shade of a tree planted by someone else.", credit: "Ìrètí Foundation / archive" }} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 article dropcap">
            <p>Since 2019, 23 supporters have left gifts to Ìrètí in their wills — from a retired teacher in Ogbomoso to a nurse in Leeds. Together they have funded eleven water points and our entire midwife training programme for 2025.</p>
            <p>Legacy gifts are placed in our Legacy Fund and used for long-term work: the five-year monitoring of water points, new community partnerships, and reserves that keep us steady when grants are delayed. With your family’s permission, we name each legacy-funded water point.</p>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeader number="01" eyebrow="Four simple steps" title={<>How to leave <em>a legacy.</em></>} />
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule md:grid-cols-2 lg:grid-cols-4">
          {legacySteps.map((s, i) => (
            <li key={s.title} className="bg-card p-7">
              <p className="font-serif italic text-terracotta text-3xl mb-3">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-serif text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <SectionHeader number="02" eyebrow="Sample will wording" title={<>Wording for <em>your solicitor.</em></>} lede="This wording is a guide only. Please take independent legal advice; requirements differ between Nigeria, the UK, the US and elsewhere." />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-8">
            {willWording.map((w) => (
              <article key={w.type} className="bg-card border border-rule">
                <header className="flex flex-wrap items-baseline justify-between gap-3 px-6 pt-5 pb-3 border-b border-rule">
                  <div>
                    <h3 className="font-serif text-2xl">{w.type}</h3>
                    <p className="text-sm text-muted">{w.note}</p>
                  </div>
                  <CopyButton value={w.text} label="Copy wording" />
                </header>
                <blockquote className="px-6 py-5 font-serif text-lg leading-relaxed text-ink-soft italic">{w.text}</blockquote>
              </article>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <p className="eyebrow mb-3">Our legal details</p>
            <FactList
              items={[
                { label: "Legal name", value: <span className="font-normal">{org.legalName}</span> },
                { label: "Registered address", value: <span className="font-normal">{org.address}</span> },
              ]}
            />
            <a href="#" className="btn btn-outline btn-sm mt-6">Download legacy guide (PDF)</a>
          </aside>
        </div>
      </Section>

      <Section tone="deep" id="enquire">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader split={false} number="03" eyebrow="Talk to us, in confidence" title={<>Tell us, <em>if you’d like to.</em></>} lede="You never have to. But if you do, we can thank you — and make sure your gift goes exactly where you’d want it." />
            <p className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-forest" aria-hidden /><a href={`mailto:${org.legacyEmail}`} className="prose-link">{org.legacyEmail}</a></p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><LegacyForm /></div>
        </div>
      </Section>
    </>
  );
}
