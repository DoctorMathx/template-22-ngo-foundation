import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { indicators } from "@/mock/results";
import { StatusLabel } from "@/components/ui/status-label";

export function ResultsModule() {
  const rows = ["W1", "W2", "H1", "H3", "L2"].map((c) => indicators.find((i) => i.code === c)!).filter(Boolean);
  return (
    <Section tone="paper">
      <SectionHeader number="05" eyebrow="Results & accountability" title={<>We publish the indicators <em>we’re behind on,</em> too.</>} lede="Our results framework sets a baseline, a target and a data source for every indicator — and it’s public." action={<Link href="/results" className="link-arrow">Full results framework</Link>} />
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="table-ed min-w-[720px]">
          <caption className="sr-only">Selected results indicators</caption>
          <thead>
            <tr><th scope="col">Code</th><th scope="col">Indicator</th><th scope="col">Baseline</th><th scope="col">Target 2026</th><th scope="col">Achieved 2025</th><th scope="col">Status</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code}>
                <td className="font-serif italic text-terracotta">{r.code}</td>
                <td className="pr-6 max-w-[22rem]">{r.indicator}</td>
                <td className="text-muted">{r.baseline}</td>
                <td>{r.target}</td>
                <td className="font-semibold">{r.achieved}</td>
                <td><StatusLabel status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
