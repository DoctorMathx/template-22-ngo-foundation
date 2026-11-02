import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ìrètí Foundation in Ibadan — phone, WhatsApp, email and field offices in Bida, Ilorin and Jos.",
};

export default function ContactPage() {
  const { org } = siteConfig;
  return (
    <>
      <PageHeader eyebrow="Contact" crumbs={[{ label: "Contact" }]} title={<>We answer <em className="text-forest">every message.</em></>} lede={`Our Ibadan office is open ${org.hours}. We reply to emails and WhatsApp messages within two working days.`} />
      <Section tone="paper" pad="md">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <aside className="lg:col-span-4 lg:col-start-9 space-y-8">
            <ul className="border-t border-ink">
              <li className="flex gap-4 py-4 border-b border-rule"><MapPin className="w-5 h-5 text-forest shrink-0 mt-0.5" aria-hidden /><div><p className="eyebrow mb-1">Head office</p><address className="not-italic">{org.address}</address></div></li>
              <li className="flex gap-4 py-4 border-b border-rule"><Phone className="w-5 h-5 text-forest shrink-0 mt-0.5" aria-hidden /><div><p className="eyebrow mb-1">Phone</p><a href={`tel:${org.phone.replace(/\s/g, "")}`} className="prose-link">{org.phone}</a></div></li>
              <li className="flex gap-4 py-4 border-b border-rule"><MessageCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" aria-hidden /><div><p className="eyebrow mb-1">WhatsApp</p><a href={org.whatsappLink} className="prose-link">{org.whatsapp}</a></div></li>
              <li className="flex gap-4 py-4 border-b border-rule"><Mail className="w-5 h-5 text-forest shrink-0 mt-0.5" aria-hidden /><div><p className="eyebrow mb-1">Email</p><a href={`mailto:${org.email}`} className="prose-link block">{org.email}</a><a href={`mailto:${org.partnershipsEmail}`} className="prose-link block text-sm mt-1">{org.partnershipsEmail}</a></div></li>
              <li className="flex gap-4 py-4 border-b border-rule"><ShieldAlert className="w-5 h-5 text-terracotta shrink-0 mt-0.5" aria-hidden /><div><p className="eyebrow mb-1">Safeguarding (confidential)</p><a href="mailto:safeguarding@iretifoundation.org" className="prose-link">safeguarding@iretifoundation.org</a></div></li>
            </ul>
            <div>
              <p className="eyebrow mb-2">Field offices</p>
              <ul className="text-ink-soft space-y-1">{org.fieldOffices.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section tone="deep" pad="sm">
        <div className="relative w-full h-[280px] sm:h-auto sm:aspect-[21/8] sm:min-h-[260px] border border-ink bg-paper overflow-hidden" role="img" aria-label={`Map placeholder showing our head office at ${org.address}`}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="var(--rule)" strokeWidth="1" /></pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M0 266 C 250 228, 400 304, 600 209 S 900 152, 1000 171" fill="none" stroke="var(--rule-strong)" strokeWidth="10" />
            <path d="M300 0 L 380 380" stroke="var(--rule-strong)" strokeWidth="6" />
            <path d="M0 120 L 1000 90" stroke="var(--rule)" strokeWidth="4" />
          </svg>
          <div className="absolute left-[34%] top-[46%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
            <span className="bg-forest text-paper text-xs font-semibold px-3 py-1.5 whitespace-nowrap">Ìrètí Foundation · Bodija</span>
            <span className="w-3 h-3 rotate-45 bg-forest -mt-1.5" />
          </div>
          <p className="absolute bottom-3 left-4 right-4 text-right caption">Map placeholder — embed Google Maps or OpenStreetMap here.</p>
        </div>
      </Section>
    </>
  );
}
