import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { circleStats, circleTiers } from "@/mock/giving";
import { donateHref, formatNaira } from "@/lib/utils";

export function GivingCircleModule() {
  return (
    <Section tone="deep">
      <SectionHeader number="09" eyebrow="Friends of Ìrètí" title={<>A monthly circle of <em>1,960 friends</em> in 14 countries.</>} lede="Monthly gifts are the steadiest money we receive — they pay for the testing, repairs and follow-up visits that keep results real." action={<Link href="/giving-circle" className="link-arrow">About the giving circle</Link>} />
      <div className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule sm:grid-cols-2 lg:grid-cols-4">
        {circleTiers.map((t) => (
          <div key={t.name} className="bg-card p-6 flex flex-col">
            <p className="eyebrow mb-2">{t.name}</p>
            <p className="font-serif text-3xl tabular">{formatNaira(t.monthly)}<span className="text-base text-muted"> /month</span></p>
            <p className="text-[0.78rem] text-muted mt-1">≈ ${t.usd} · £{t.gbp}</p>
            <p className="mt-4 text-sm text-ink-soft leading-relaxed flex-1">{t.impact}</p>
            <Link href={donateHref({ amount: t.monthly, frequency: "monthly", designation: "circle" })} className="btn btn-outline btn-sm mt-6 self-start">Join as {t.name}</Link>
          </div>
        ))}
      </div>
      <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
        {circleStats.map((s) => (
          <div key={s.label}><dt className="sr-only">{s.label}</dt><dd><span className="font-serif text-2xl text-forest">{s.value}</span> <span className="text-sm text-muted">{s.label}</span></dd></div>
        ))}
      </dl>
    </Section>
  );
}
