import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { events } from "@/mock/events";
import { formatDate } from "@/lib/utils";

export function EventsModule() {
  return (
    <Section tone="card" pad="md">
      <SectionHeader number="11" eyebrow="Diary" title={<>Come and <em>see for yourself.</em></>} action={<Link href="/events" className="link-arrow">All events</Link>} />
      <ul className="border-t border-ink">
        {events.slice(0, 3).map((e) => (
          <li key={e.slug} className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-8 py-6 border-b border-rule items-baseline">
            <p className="md:col-span-2 font-serif text-2xl text-forest">
              <time dateTime={e.date}>{formatDate(e.date, { day: "numeric", month: "short" })}</time>
            </p>
            <div className="md:col-span-7">
              <p className="eyebrow mb-1">{e.kind}{e.online ? " · Online" : ""}</p>
              <h3 className="font-serif text-xl md:text-2xl">{e.title}</h3>
            </div>
            <p className="md:col-span-3 text-sm text-muted">{e.venue}, {e.city}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
