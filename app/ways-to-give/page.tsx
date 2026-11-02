import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { CopyButton } from "@/components/ui/copy-button";
import { diasporaWays } from "@/mock/giving";
import { siteConfig } from "@/lib/site-config";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ways to give — including from the diaspora",
  description: "Give to Ìrètí Foundation by card, bank transfer, USSD, domiciliary account, payroll giving or a gift in your will — from Nigeria or abroad.",
};

const ways = [
  { title: "One-off or monthly gift", text: "Card, bank transfer or USSD, in naira, dollars or pounds.", href: "/donate", cta: "Donate" },
  { title: "Fund a whole project", text: "Close the gap on a costed, named project.", href: "/projects", cta: "Projects" },
  { title: "Friends of Ìrètí", text: "Our monthly giving circle, from ₦5,000 a month.", href: "/giving-circle", cta: "Join" },
  { title: "Gift in your will", text: "Sample wording and our legal details.", href: "/legacy", cta: "Legacy giving" },
  { title: "Corporate & payroll giving", text: "CSR packages, employee giving and match funding.", href: "/partnerships", cta: "Partnerships" },
  { title: "Grants & foundations", text: "Open calls, due diligence and concept notes.", href: "/funders", cta: "Funders hub" },
  { title: "Fundraise for us", text: "Run, walk, celebrate — or ask for gifts instead of presents.", href: "/get-involved#fundraise", cta: "Fundraise" },
];

export default function WaysToGivePage() {
  const { bank, domiciliary, rates } = siteConfig.donation;
  return (
    <>
      <PageHeader eyebrow="Ways to give" crumbs={[{ label: "Ways to give" }]} title={<>However you give, <em className="text-forest">it’s accounted for.</em></>} lede="From a ₦1,000 USSD transfer to a multi-year grant — and from Ibadan or from Houston — every gift is receipted, and restricted gifts are only spent on what you choose." />
      <Section tone="paper" pad="md">
        <ul className="border-t border-ink">
          {ways.map((w, i) => (
            <li key={w.title} className="grid grid-cols-1 gap-3 md:grid-cols-12 items-center py-6 border-b border-rule">
              <span className="md:col-span-1 section-num">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="md:col-span-4 font-serif text-2xl">{w.title}</h2>
              <p className="md:col-span-5 text-ink-soft">{w.text}</p>
              <div className="md:col-span-2 md:text-right"><Link href={w.href} className="btn btn-outline btn-sm">{w.cta}</Link></div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="card" id="diaspora">
        <SectionHeader number="—" eyebrow="Diaspora giving" title={<>Giving from <em>abroad.</em></>} lede="38% of our monthly givers live outside Nigeria. Here’s how to give in your currency, and see exactly what it’s worth in the field." />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {diasporaWays.map((d) => (
              <article key={d.title} className="border-t border-ink pt-5">
                <h3 className="font-serif text-xl mb-2">{d.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{d.text}</p>
              </article>
            ))}
          </div>
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-paper border border-ink p-6">
              <p className="eyebrow mb-3">Indicative rates</p>
              <table className="table-ed">
                <caption className="sr-only">Indicative conversions</caption>
                <thead><tr><th scope="col">You give</th><th scope="col">≈ In the field</th></tr></thead>
                <tbody>
                  {[[25, "USD"], [100, "USD"], [20, "GBP"], [100, "GBP"]].map(([v, c]) => (
                    <tr key={`${v}${c}`}><td>{c === "USD" ? "$" : "£"}{v}</td><td className="font-semibold">{formatNaira(Number(v) * rates[c as "USD" | "GBP"])}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="field-hint">{siteConfig.donation.ratesNote}</p>
              <div className="flex gap-2 mt-5">
                <Link href="/donate?currency=USD" className="btn btn-primary btn-sm">Give in USD</Link>
                <Link href="/donate?currency=GBP" className="btn btn-primary btn-sm">Give in GBP</Link>
              </div>
            </div>
            <div className="bg-paper border border-rule p-6 text-sm">
              <p className="eyebrow mb-3">Bank details</p>
              <dl className="space-y-1.5">
                <div className="flex justify-between gap-3 items-center"><dt className="text-muted">NGN · {bank.bankName}</dt><dd className="font-semibold tabular flex items-center">{bank.accountNumber}<CopyButton value={bank.accountNumber} /></dd></div>
                <div className="flex justify-between gap-3 items-center"><dt className="text-muted">USD domiciliary</dt><dd className="font-semibold tabular flex items-center">{domiciliary.usd}<CopyButton value={domiciliary.usd} /></dd></div>
                <div className="flex justify-between gap-3 items-center"><dt className="text-muted">GBP domiciliary</dt><dd className="font-semibold tabular flex items-center">{domiciliary.gbp}<CopyButton value={domiciliary.gbp} /></dd></div>
                <div className="flex justify-between gap-3 items-center"><dt className="text-muted">SWIFT</dt><dd className="font-semibold tabular">{domiciliary.swift}</dd></div>
              </dl>
              <p className="text-muted mt-3">Account name: {bank.accountName}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
