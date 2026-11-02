import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { programmes } from "@/mock/programmes";

export function ProgrammesModule() {
  return (
    <Section tone="card">
      <SectionHeader number="02" eyebrow="Our programmes" title={<>Three programmes. <em>Four states.</em> One standard of evidence.</>} lede="We stay in a community for at least five years, working with local government so that what we build is staffed, maintained and owned." />
      <div className="border-t border-ink">
        {programmes.map((p) => (
          <article key={p.slug} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 py-10 border-b border-rule items-start">
            <p className="md:col-span-1 font-serif italic text-4xl text-terracotta leading-none">{p.number}</p>
            <div className="md:col-span-5">
              <h3 className="font-serif text-3xl md:text-[2.2rem] leading-tight">
                <Link href={`/programmes/${p.slug}`} className="hover:text-forest">{p.title}</Link>
              </h3>
              <p className="mt-4 text-ink-soft leading-relaxed">{p.summary}</p>
              <Link href={`/programmes/${p.slug}`} className="link-arrow mt-6">Read the programme brief</Link>
            </div>
            <dl className="md:col-span-3 space-y-4">
              {p.stats.slice(0, 2).map((s) => (
                <div key={s.label} className="border-t border-rule pt-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd><span className="font-serif text-3xl text-forest tabular">{s.value}</span><span className="block text-[0.82rem] text-muted mt-1">{s.label}</span></dd>
                </div>
              ))}
            </dl>
            <div className="md:col-span-3 relative aspect-[4/3] bg-paper-deep">
              <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 22vw, 100vw" className="object-cover" />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
