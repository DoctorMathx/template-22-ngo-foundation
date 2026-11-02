import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { corporateTiers, funders, grantManagement } from "@/mock/funders";
import { photos } from "@/mock/photos";
import { cn, formatNairaShort } from "@/lib/utils";
import { EnquiryForm } from "./enquiry-form";

export const metadata: Metadata = {
  title: "Corporate partnerships & CSR",
  description: "Partner with Ìrètí Foundation: CSR packages for water, health and livelihoods, employee giving, match funding and SDG-aligned impact reporting.",
};

const why = [
  { title: "Results you can report", text: "Indicator-level reporting aligned to the SDGs and to NGX sustainability disclosure guidance." },
  { title: "Governance you can defend", text: "Nine unqualified audits, published policies and an independent board." },
  { title: "Where your customers live", text: "Projects in Oyo, Kwara, Niger and Plateau — often in towns where your staff and customers have roots." },
  { title: "Your people, involved", text: "Employee volunteering days, payroll giving and skills-based secondments." },
];

export default function PartnershipsPage() {
  const corporate = funders.filter((f) => f.type.includes("Corporate") || f.type.includes("Diaspora"));
  return (
    <>
      <PageHeader eyebrow="Corporate partnerships" crumbs={[{ label: "Funders", href: "/funders" }, { label: "Partnerships" }]} title={<>CSR that <em className="text-forest">stands up to scrutiny.</em></>} lede="Fund a named water point, power a maternity unit, or seed a women’s loan fund — with quarterly reporting your sustainability team can use as-is." />
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5"><Figure photo={{ src: photos.handshake, alt: "Two people shaking hands across a table", caption: "Signing a three-year water partnership, Lagos.", credit: "Ìrètí Foundation" }} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" /></div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeader split={false} number="01" eyebrow="Why partner with us" title={<>Four reasons <em>companies stay.</em></>} />
            <ol className="border-t border-ink">
              {why.map((w, i) => (
                <li key={w.title} className="flex gap-6 py-6 border-b border-rule">
                  <span className="font-serif italic text-terracotta text-2xl w-8 shrink-0">{i + 1}.</span>
                  <div><h3 className="font-serif text-xl">{w.title}</h3><p className="text-ink-soft mt-1">{w.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
      <Section tone="deep">
        <SectionHeader number="02" eyebrow="Partnership packages" title={<>Three ways to <em>partner.</em></>} lede="Annual packages; multi-year agreements receive a 10% reduction in management cost." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {corporateTiers.map((t) => (
            <article key={t.name} className={cn("p-8 flex flex-col border", t.featured ? "bg-forest-deep text-paper on-dark border-forest" : "bg-card border-ink")}>
              <h3 className="font-serif text-3xl">{t.name}</h3>
              <p className={cn("font-serif italic text-2xl mt-2", t.featured ? "text-[#E9A47B]" : "text-terracotta")}>from {formatNairaShort(t.amount)}</p>
              <ul className="mt-6 space-y-3 text-[0.95rem] flex-1">
                {t.points.map((p) => <li key={p} className="pl-5 relative before:absolute before:left-0 before:top-[0.6em] before:w-2.5 before:h-px before:bg-current">{p}</li>)}
              </ul>
              <a href="#enquiry" className={cn("btn mt-8 self-start", t.featured ? "btn-paper" : "btn-outline")}>Enquire</a>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="paper" pad="md">
        <SectionHeader number="03" eyebrow="How partner funds are managed" title={<>Ring-fenced, <em>reported, audited.</em></>} action={<Link href="/funders#grant-management" className="link-arrow">Full detail in the funders hub</Link>} />
        <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-3 border-t border-ink">
          {grantManagement.slice(0, 3).map((g) => (
            <li key={g.title} className="py-6 border-b border-rule"><h3 className="font-serif text-xl mb-2">{g.title}</h3><p className="text-sm text-ink-soft leading-relaxed">{g.text}</p></li>
          ))}
        </ul>
        <p className="eyebrow mt-14 mb-4">Current corporate &amp; network partners</p>
        <ul className="flex flex-wrap gap-x-12 gap-y-4">
          {corporate.map((f) => <li key={f.name} className="font-serif text-2xl text-ink-soft">{f.mark}</li>)}
        </ul>
      </Section>
      <Section tone="card" id="enquiry">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeader split={false} number="04" eyebrow="Enquire" title={<>Let’s design it <em>together.</em></>} lede="Tell us what matters to your business and your people. We’ll come back with options and costed proposals." /></div>
          <div className="lg:col-span-7 lg:col-start-6"><EnquiryForm /></div>
        </div>
      </Section>
    </>
  );
}
