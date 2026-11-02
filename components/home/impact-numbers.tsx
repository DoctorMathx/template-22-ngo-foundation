import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { headlineStats } from "@/mock/impact";

export function ImpactNumbers() {
  return (
    <Section tone="paper" pad="md">
      <SectionHeader number="01" eyebrow="The year in numbers" title={<>What changed, <em>and how we know.</em></>} lede="Every figure links to an indicator in our public results framework, with its baseline, target and data source." action={<Link href="/results" className="link-arrow">See the results framework</Link>} />
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-ink">
        {headlineStats.map((s, i) => (
          <div key={s.label} className={`py-8 pr-6 border-b border-rule lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-6 lg:pl-6" : ""}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="num-xl block text-[3.4rem] md:text-[4.2rem] lg:text-[3.4rem] xl:text-[4.2rem] text-forest">{s.value}</span>
              <span className="block mt-4 text-[0.95rem] text-ink-soft leading-snug max-w-[16rem]">{s.label}</span>
              <span className="block mt-3 text-[0.7rem] tracking-[0.14em] uppercase text-muted">Indicator {s.note}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
