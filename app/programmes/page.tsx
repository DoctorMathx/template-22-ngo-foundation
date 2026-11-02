import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { SdgBadge } from "@/components/ui/sdg-badge";
import { programmes } from "@/mock/programmes";
import { donateHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Clean water & sanitation, maternal & child health, and women’s livelihoods — Ìrètí Foundation’s three programmes in rural Oyo, Kwara, Niger and Plateau.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our programmes"
        crumbs={[{ label: "Programmes" }]}
        title={<>Water, health &amp; livelihoods — <em className="text-forest">together.</em></>}
        lede="Clean water makes clinics safer and frees women’s time; safer births keep mothers earning; income keeps water committees solvent. We run three programmes because each one makes the others last."
      />
      {programmes.map((p, i) => (
        <Section key={p.slug} tone={i % 2 ? "card" : "paper"}>
          <article className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            <div className={i % 2 ? "lg:col-span-6 lg:order-2" : "lg:col-span-6"}>
              <Figure photo={p.image} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className={i % 2 ? "lg:col-span-6 lg:order-1" : "lg:col-span-5 lg:col-start-8"}>
              <p className="flex items-baseline gap-3 border-t border-ink pt-4 mb-6"><span className="section-num">{p.number}</span><span className="eyebrow">{p.budgetShare}% of programme spend</span></p>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-[1.05]">{p.title}</h2>
              <p className="lede mt-5">{p.summary}</p>
              <dl className="grid grid-cols-3 gap-4 mt-8 border-y border-rule py-5">
                {p.stats.map((s) => (
                  <div key={s.label}><dt className="sr-only">{s.label}</dt><dd><span className="font-serif text-2xl md:text-3xl text-forest block">{s.value}</span><span className="text-[0.75rem] text-muted leading-snug block mt-1">{s.label}</span></dd></div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3 mt-6">{p.sdgs.map((g) => <SdgBadge key={g} goal={g} />)}</div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href={`/programmes/${p.slug}`} className="btn btn-primary">Programme brief</Link>
                <Link href={donateHref({ programme: p.slug })} className="btn btn-outline">Give to this programme</Link>
              </div>
            </div>
          </article>
        </Section>
      ))}
    </>
  );
}
