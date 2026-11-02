import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Figure } from "@/components/ui/figure";
import { photos } from "@/mock/photos";
import { siteConfig } from "@/lib/site-config";

const contents = [
  { n: "01", label: "Programmes", href: "/programmes" },
  { n: "02", label: "Projects to fund", href: "/projects" },
  { n: "03", label: "Results framework", href: "/results" },
  { n: "04", label: "Accounts & governance", href: "/transparency" },
];

export function Hero() {
  return (
    <section className="bg-paper border-b border-rule">
      <div className="container-x pt-10 md:pt-14 pb-16 md:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink pb-3 mb-10 md:mb-14 text-[0.72rem] uppercase tracking-[0.18em] text-muted font-semibold">
          <span>Est. {siteConfig.brand.founded} · Ibadan</span>
          <span className="hidden md:inline">Oyo · Kwara · Niger · Plateau</span>
          <span>Results to 31 Dec 2025</span>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 flex flex-col">
            <p className="eyebrow mb-6"><span className="section-num normal-case tracking-normal mr-2">Ìrètí</span> means hope</p>
            <h1 className="font-serif font-light text-[3rem] leading-[0.98] sm:text-[4rem] lg:text-[5.1rem] tracking-[-0.03em]">
              Hope, <em className="text-forest pr-[0.12em]">measured</em> in working pumps &amp; safe births.
            </h1>
            <p className="lede mt-8 max-w-xl">
              We bring clean water, safer childbirth and fair livelihoods to rural communities in Oyo, Kwara, Niger and Plateau — and we publish every result, every naira and every pump that stops working.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/donate" className="btn btn-primary btn-lg">Donate</Link>
              <Link href="/funders" className="btn btn-outline btn-lg">For funders &amp; foundations</Link>
            </div>
            <nav aria-label="In this report" className="mt-auto pt-14">
              <p className="eyebrow mb-3">In this report</p>
              <ul className="grid grid-cols-2 border-t border-rule">
                {contents.map((c) => (
                  <li key={c.n} className="border-b border-rule odd:border-r odd:pr-4 even:pl-4">
                    <Link href={c.href} className="group flex items-center gap-3 min-h-[52px] text-[0.9rem]">
                      <span className="section-num">{c.n}</span>
                      <span className="flex-1 group-hover:text-forest">{c.label}</span>
                      <ArrowRight className="w-4 h-4 text-muted group-hover:text-forest" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="lg:col-span-6">
            <Figure
              photo={{ src: photos.waterHands, alt: "Cupped hands catching clean water from a tap", caption: "Oke-Ola borehole, Igbo-Ora — drilled 2018, working on 98% of days since.", credit: "Ìrètí Foundation / Ṣ. Akínwálé" }}
              aspect="aspect-[4/5]"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
