import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { events } from "@/mock/events";
import { formatDate } from "@/lib/utils";
import { RsvpForm } from "./rsvp-form";

export const metadata: Metadata = {
  title: "Events",
  description: "Funders’ briefings, site visits, diaspora supporter calls, community market days and fundraising walks with Ìrètí Foundation.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader eyebrow="Events" crumbs={[{ label: "Events" }]} title={<>Come and <em className="text-forest">see for yourself.</em></>} lede="Briefings for funders, calls for supporters abroad, and days in the field. Site visits are arranged with our field teams, who handle travel and security." />
      <Section tone="paper" pad="md">
        <ul className="border-t border-ink">
          {events.map((e) => (
            <li key={e.slug} id={e.slug} className="grid grid-cols-1 gap-6 md:grid-cols-12 py-8 border-b border-rule">
              <div className="md:col-span-2">
                <p className="font-serif text-5xl text-forest leading-none">{formatDate(e.date, { day: "numeric" })}</p>
                <p className="eyebrow mt-2">{formatDate(e.date, { month: "long", year: "numeric" })}</p>
              </div>
              <div className="md:col-span-7">
                <p className="mb-2"><span className="tag tag-terracotta">{e.kind}</span>{e.online && <span className="tag ml-2">Online</span>}</p>
                <h2 className="font-serif text-2xl md:text-3xl leading-tight">{e.title}</h2>
                <p className="text-ink-soft mt-3 leading-relaxed">{e.summary}</p>
              </div>
              <div className="md:col-span-3 text-sm text-ink-soft space-y-2">
                <p className="flex gap-2"><CalendarDays className="w-4 h-4 text-forest shrink-0 mt-0.5" aria-hidden />{e.time}</p>
                <p className="flex gap-2"><MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" aria-hidden />{e.venue}, {e.city}</p>
                <a href="#rsvp" className="btn btn-outline btn-sm mt-3">Register interest</a>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="card" id="rsvp">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader split={false} number="RSVP" eyebrow="Register interest" title={<>Save <em>your place.</em></>} lede="We’ll confirm by email with joining details. Funder site visits are subject to security clearance." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><RsvpForm /></div>
        </div>
      </Section>
    </>
  );
}
