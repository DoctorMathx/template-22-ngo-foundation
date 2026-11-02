import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faqs } from "@/mock/faqs";
import type { Faq } from "@/lib/types";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Answers about donating to Ìrètí Foundation — receipts, tax, refunds, restricted gifts, funders and accountability.",
};

export default function FaqPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.group))) as Faq["group"][];
  return (
    <>
      <PageHeader eyebrow="FAQ" crumbs={[{ label: "FAQ" }]} title={<>Questions, <em className="text-forest">answered plainly.</em></>} lede="About giving, receipts and tax, refunds, grants and how we hold ourselves to account." />
      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="lg:sticky lg:top-28 border-t border-ink">
              {groups.map((g, i) => (
                <li key={g} className="border-b border-rule"><a href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="flex items-center gap-3 min-h-[48px] hover:text-forest"><span className="section-num">{String(i + 1).padStart(2, "0")}</span>{g}</a></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-8 lg:col-start-5 space-y-16">
            {groups.map((g, i) => (
              <section key={g} id={g.toLowerCase().replace(/[^a-z]+/g, "-")} aria-labelledby={`h-${i}`} className="scroll-mt-28">
                <h2 id={`h-${i}`} className="font-serif text-3xl mb-6">{g}</h2>
                <FaqAccordion items={faqs.filter((f) => f.group === g)} defaultOpen={i === 0 ? 0 : null} />
              </section>
            ))}
            <div className="bg-card border border-ink p-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-serif text-2xl">Still have a question?</p>
              <Link href="/contact" className="btn btn-primary">Contact us</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
