import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Figure } from "@/components/ui/figure";
import { photos } from "@/mock/photos";
import { FundraiseForm, VolunteerForm } from "./forms";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer your skills, fundraise for Ìrètí Foundation, or partner with us as an organisation.",
};

const ideas = [
  { title: "Water Walk", text: "Walk 5km carrying 5 litres. Ibadan, January — or anywhere, any time." },
  { title: "Celebrate with purpose", text: "Ask for gifts to a water point instead of presents at your birthday, wedding or naming ceremony." },
  { title: "Faith & community appeals", text: "Many water points were funded by a single church or mosque harvest." },
  { title: "At work", text: "Payroll giving, a matched bake sale, or a team challenge." },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        crumbs={[{ label: "Get involved" }]}
        title={<>Give your time, your skill, <em className="text-forest">your voice.</em></>}
        lede="Our 42 staff are supported by more than 300 volunteers — engineers who review drilling reports, midwives who mentor, accountants who check cooperative ledgers, and students who walk 5km with a jerrycan."
      />
      <nav aria-label="On this page" className="bg-paper border-b border-rule">
        <div className="container-x py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <a href="#volunteer" className="inline-flex items-center min-h-[40px] hover:text-forest"><span className="section-num mr-2">01</span>Volunteer</a>
          <a href="#fundraise" className="inline-flex items-center min-h-[40px] hover:text-forest"><span className="section-num mr-2">02</span>Fundraise for us</a>
          <a href="#partner" className="inline-flex items-center min-h-[40px] hover:text-forest"><span className="section-num mr-2">03</span>Partner with us</a>
        </div>
      </nav>
      <Section tone="paper" id="volunteer">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader split={false} number="01" eyebrow="Volunteer" title={<>Skilled volunteering, <em>remote or in the field.</em></>} lede="Most roles are remote or based in Ibadan. A small number of field placements are offered each year, with full safeguarding training." />
            <Figure photo={{ src: photos.volunteerKids, alt: "A volunteer with children outdoors", caption: "A volunteer at a school hygiene day.", credit: "Ìrètí Foundation" }} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><VolunteerForm /></div>
        </div>
      </Section>
      <Section tone="card" id="fundraise">
        <SectionHeader number="02" eyebrow="Fundraise for us" title={<>Raise money <em>your way.</em></>} lede="We’ll send a pack, a personal donation link that tracks your total, and a certificate showing exactly what you funded." />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-4 border-t border-ink self-start">
            {ideas.map((i) => (
              <li key={i.title} className="py-5 border-b border-rule"><h3 className="font-serif text-xl">{i.title}</h3><p className="text-sm text-ink-soft mt-1">{i.text}</p></li>
            ))}
          </ul>
          <div className="lg:col-span-7 lg:col-start-6"><FundraiseForm /></div>
        </div>
      </Section>
      <Section tone="forest" id="partner">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">03 — Partner with us</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">Representing a foundation, agency or company?</h2>
            <p className="lede mt-5">Our funders hub has priorities, open co-funding calls and the full due-diligence pack. Corporate partners can explore CSR packages and employee giving.</p>
          </div>
          <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <Link href="/funders" className="btn btn-paper">Funders hub</Link>
            <Link href="/partnerships" className="btn btn-ghost-light">Corporate partnerships</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
