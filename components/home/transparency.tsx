import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { perThousand, reports } from "@/mock/financials";
import { Download } from "lucide-react";

export function TransparencyModule() {
  return (
    <Section tone="paper">
      <SectionHeader number="10" eyebrow="Where the money goes" title={<>Of every <em>₦1,000</em> we spent in 2025…</>} lede="Audited by Adekunle, Okafor & Co. Unqualified opinion, nine years running." action={<Link href="/transparency" className="link-arrow">Full financials &amp; governance</Link>} />
      <div className="flex h-14 w-full overflow-hidden" role="img" aria-label={perThousand.map((p) => `₦${p.amount} ${p.label}`).join(", ")}>
        {perThousand.map((p) => (
          <div key={p.label} style={{ width: `${p.amount / 10}%`, background: p.color }} className="h-full border-r-2 border-paper last:border-r-0" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {perThousand.map((p) => (
          <div key={p.label} className="border-t border-rule pt-4">
            <p className="flex items-center gap-2"><span className="w-3 h-3" style={{ background: p.color }} aria-hidden /><span className="font-serif text-4xl tabular">₦{p.amount}</span></p>
            <p className="mt-2 font-semibold text-sm">{p.label}</p>
            <p className="text-[0.82rem] text-muted mt-1">{p.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink pt-6">
        <p className="eyebrow">Latest reports</p>
        {reports.slice(0, 3).map((r) => (
          <a key={r.year} href="#" className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-forest hover:text-terracotta">
            <Download className="w-4 h-4" aria-hidden /> {r.year} Annual Report &amp; audited accounts
          </a>
        ))}
      </div>
    </Section>
  );
}
