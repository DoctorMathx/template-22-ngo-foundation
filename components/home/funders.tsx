import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { funders } from "@/mock/funders";

const points = [
  { n: "i.", title: "Restricted funds, ring-fenced", text: "Every grant has its own fund code; budget-vs-actual reviewed monthly." },
  { n: "ii.", title: "Reporting on your cadence", text: "Monthly notes, quarterly narrative and financial reports, audited annually." },
  { n: "iii.", title: "Due diligence, ready", text: "CAC, audited accounts, safeguarding and M&E framework in one pack." },
];

export function FundersModule() {
  return (
    <Section tone="paper">
      <SectionHeader number="08" eyebrow="For institutional funders" title={<>Built to be <em>funded with confidence.</em></>} lede="Foundations, development agencies and corporate partners fund 72% of our work. Here is how we make that easy to approve, and easy to report on." action={<Link href="/funders" className="btn btn-primary">Visit the funders hub</Link>} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 border-t border-ink pt-8 mb-16">
        {points.map((p) => (
          <div key={p.n}>
            <p className="font-serif italic text-terracotta text-xl mb-2">{p.n}</p>
            <h3 className="font-serif text-2xl mb-2">{p.title}</h3>
            <p className="text-ink-soft leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
      <p className="eyebrow mb-5">Funded and trusted by</p>
      <ul className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-rule">
        {funders.map((f) => (
          <li key={f.name} className="border-r border-b border-rule h-24 flex flex-col items-center justify-center px-4 text-center">
            <span className="font-serif text-lg md:text-xl tracking-tight text-ink-soft">{f.mark}</span>
            <span className="text-[0.66rem] uppercase tracking-[0.14em] text-muted mt-1">since {f.since}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
