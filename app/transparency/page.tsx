import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { BarList, Donut, Legend } from "@/components/ui/charts";
import { expenditure, financialYear, fiveYear, governance, incomeSources, perThousand, policies, reports, totalExpenditure, totalIncome } from "@/mock/financials";
import { board } from "@/mock/people";
import { formatNaira, formatNairaShort } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Transparency & financials",
  description: "Ìrètí Foundation’s audited income and expenditure, where every ₦1,000 goes, annual reports, registration, governance, policies and Board of Trustees.",
};

export default function TransparencyPage() {
  const maxIncome = Math.max(...fiveYear.map((y) => y.income));
  const programmeSpend = expenditure.filter((e) => e.group === "Programmes").reduce((a, b) => a + b.value, 0);
  return (
    <>
      <PageHeader
        eyebrow={`Transparency · FY${financialYear}`}
        crumbs={[{ label: "Transparency" }]}
        title={<>Every naira, <em className="text-forest">accounted for.</em></>}
        lede="Our accounts are audited every year by an independent firm of chartered accountants and published here in full. These figures are drawn from the audited statements for the year ended 31 December 2025."
        aside={
          <FactList
            items={[
              { label: "Total income", value: formatNairaShort(totalIncome) },
              { label: "Total expenditure", value: formatNairaShort(totalExpenditure) },
              { label: "Spent on programmes", value: `${Math.round((programmeSpend / totalExpenditure) * 100)}%` },
              { label: "Audit opinion", value: "Unqualified" },
            ]}
          />
        }
      />

      <Section tone="paper" id="per-thousand">
        <SectionHeader number="01" eyebrow="Of every ₦1,000" title={<>Where your <em>₦1,000</em> went in {financialYear}.</>} lede="Monitoring, evaluation and learning is shown separately because it is what makes our results trustworthy." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {perThousand.map((p) => (
            <div key={p.label} className="border-t-4 pt-5" style={{ borderColor: p.color }}>
              <p className="num-xl text-6xl tabular">₦{p.amount}</p>
              <p className="font-semibold mt-3">{p.label}</p>
              <p className="text-sm text-muted mt-1">{p.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="card" id="income">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader split={false} number="02" eyebrow="Income sources" title={<>Where the money <em>came from.</em></>} />
            <div className="flex justify-center">
              <Donut data={incomeSources} centerValue={formatNairaShort(totalIncome)} centerLabel={`FY${financialYear} income`} />
            </div>
            <div className="mt-8"><Legend data={incomeSources} /></div>
          </div>
          <div>
            <SectionHeader split={false} number="03" eyebrow="Expenditure" title={<>How it <em>was spent.</em></>} />
            <BarList data={expenditure} />
            <p className="caption mt-6">Programme costs include direct field staff, materials, contractors and community training. Support costs are shown in terracotta. Total expenditure {formatNaira(totalExpenditure)}; the surplus of {formatNairaShort(totalIncome - totalExpenditure)} is restricted funds received for 2026 projects.</p>
          </div>
        </div>
      </Section>

      <Section tone="paper" id="trend" pad="md">
        <SectionHeader number="04" eyebrow="Five-year trend" title={<>Growing, <em>without drifting.</em></>} lede="Income has nearly doubled since 2021 while the share spent on programmes has risen each year." />
        <div className="grid grid-cols-5 gap-3 md:gap-6 items-end h-64 border-b border-ink" role="img" aria-label={fiveYear.map((y) => `${y.year}: ${formatNairaShort(y.income)}, ${y.programmeRatio}% to programmes`).join("; ")}>
          {fiveYear.map((y) => (
            <div key={y.year} className="flex flex-col items-center justify-end h-full">
              <span className="text-[0.66rem] sm:text-[0.78rem] font-semibold tabular mb-2 whitespace-nowrap">{formatNairaShort(y.income)}</span>
              <div className="w-full max-w-[90px] bg-forest" style={{ height: `${(y.income / maxIncome) * 80}%` }} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3 md:gap-6 mt-3 text-center">
          {fiveYear.map((y) => (
            <div key={y.year}>
              <p className="font-serif text-base sm:text-lg">{y.year}</p>
              <p className="text-[0.66rem] sm:text-[0.72rem] text-muted leading-tight">{y.programmeRatio}% programmes</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="deep" id="reports">
        <SectionHeader number="05" eyebrow="Annual reports & audited accounts" title={<>Read the <em>full reports.</em></>} />
        <ul className="border-t border-ink">
          {reports.map((r) => (
            <li key={r.year} className="grid grid-cols-1 gap-3 md:grid-cols-12 items-center py-5 border-b border-rule">
              <span className="md:col-span-1 font-serif text-3xl text-forest">{r.year}</span>
              <div className="md:col-span-6">
                <p className="font-serif text-xl">{r.title}</p>
                <p className="text-[0.8rem] text-muted">Published {r.published} · Audit opinion: {r.opinion}</p>
              </div>
              <div className="md:col-span-5 flex flex-wrap gap-2 md:justify-end">
                <a href="#" className="btn btn-outline btn-sm"><Download className="w-4 h-4" aria-hidden /> Annual report <span className="sr-only">{r.year}</span></a>
                <a href="#" className="btn btn-outline btn-sm"><FileText className="w-4 h-4" aria-hidden /> Audited accounts <span className="sr-only">{r.year}</span></a>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" id="governance">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader split={false} number="06" eyebrow="Registration, audit & governance" title={<>The <em>small print,</em> in large type.</>} />
            <FactList items={governance.map((g) => ({ label: g.label, value: <span className="font-normal">{g.value}</span> }))} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeader split={false} number="07" eyebrow="Policies" title={<>Policies we <em>publish.</em></>} />
            <ul className="border-t border-ink">
              {policies.map((p) => (
                <li key={p} className="border-b border-rule">
                  <a href="#" className="group flex items-center gap-3 min-h-[52px]">
                    <FileText className="w-4 h-4 text-forest" aria-hidden />
                    <span className="flex-1 group-hover:text-forest">{p}</span>
                    <Download className="w-4 h-4 text-muted" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-soft mt-6">To raise a concern confidentially, email <a href="mailto:safeguarding@iretifoundation.org" className="prose-link">safeguarding@iretifoundation.org</a>. Reports go directly to the independent Chair of our Safeguarding Committee.</p>
          </div>
        </div>
      </Section>

      <Section tone="card" id="board">
        <SectionHeader number="08" eyebrow="Board of trustees" title={<>Independent, unpaid, <em>accountable.</em></>} lede="Six trustees, meeting quarterly, with Audit & Risk, Safeguarding and Programmes committees. No trustee receives remuneration." action={<Link href="/about#team" className="link-arrow">Leadership team</Link>} />
        <ul className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule sm:grid-cols-2 lg:grid-cols-3">
          {board.map((b) => (
            <li key={b.name} className="bg-card p-6 flex gap-5">
              <span className="w-14 h-14 shrink-0 rounded-full border border-forest flex items-center justify-center font-serif italic text-xl text-forest" aria-hidden>{b.initials}</span>
              <div>
                <p className="font-serif text-xl leading-tight">{b.name}</p>
                <p className="text-[0.8rem] text-terracotta font-semibold mt-1">{b.role}</p>
                <p className="text-sm text-ink-soft mt-2 leading-relaxed">{b.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
