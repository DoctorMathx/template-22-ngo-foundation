import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, Mail, Phone } from "lucide-react";
import { PageHeader, FactList } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { dueDiligence, funders, fundingPriorities, grantManagement, openCalls, partnershipOptions, reportingCadence } from "@/mock/funders";
import { team } from "@/mock/people";
import { getProject, projectTotal } from "@/mock/projects";
import { siteConfig } from "@/lib/site-config";
import { cn, daysLeft, formatDate, formatNaira, pct } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress";
import { ProposalForm } from "./proposal-form";

export const metadata: Metadata = {
  title: "Grants & funders hub",
  description: "For foundations, development agencies and institutional funders: funding priorities, open co-funding calls, restricted-grant management, reporting cadence, due-diligence pack and concept-note submission.",
};

const toc = [
  ["priorities", "Funding priorities"],
  ["open-calls", "Open calls for co-funding"],
  ["grant-management", "How we manage restricted grants"],
  ["reporting", "Reporting cadence"],
  ["due-diligence", "Due-diligence pack"],
  ["partnerships", "Multi-year partnership options"],
  ["current-funders", "Current funders"],
  ["proposal", "Submit a concept note"],
];

export default function FundersPage() {
  const lead = team.find((t) => t.role === "Head of Partnerships")!;
  return (
    <>
      <PageHeader
        tone="forest"
        eyebrow="Grants & funders hub"
        crumbs={[{ label: "Funders" }]}
        title={<>Fund outcomes you can <em className="text-[#E9A47B]">verify.</em></>}
        lede="Ìrètí Foundation is 72% funded by foundations, development agencies and corporate partners. This hub has everything your programme officer and your finance team will ask for — in one place."
        aside={
          <FactList
            dark
            items={[
              { label: "FY2025 income", value: "₦612.4m" },
              { label: "Programme ratio", value: "82%" },
              { label: "Audit opinion", value: "Unqualified · 9 yrs" },
              { label: "Indirect cost rate", value: "8%" },
              { label: "Grants managed since 2014", value: "47" },
            ]}
          />
        }
      />

      {/* contents */}
      <nav aria-label="On this page" className="bg-paper border-b border-rule">
        <div className="container-x py-5 flex gap-x-6 gap-y-2 flex-wrap text-[0.85rem]">
          {toc.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className="inline-flex items-center gap-2 min-h-[36px] hover:text-forest"><span className="section-num !text-sm">{String(i + 1).padStart(2, "0")}</span>{label}</a>
          ))}
        </div>
      </nav>

      <Section tone="paper" id="priorities">
        <SectionHeader number="01" eyebrow="Funding priorities 2027 – 2029" title={<>Where institutional money <em>goes furthest.</em></>} lede="Our 2027–2029 strategy is costed at ₦1.9bn. These four priorities are where we are actively seeking new partners." />
        <ol className="grid grid-cols-1 gap-px bg-[color:var(--rule)] border border-rule md:grid-cols-2">
          {fundingPriorities.map((p, i) => (
            <li key={p.title} className="bg-card p-7 md:p-9">
              <p className="font-serif italic text-terracotta text-xl mb-3">{["i", "ii", "iii", "iv"][i]}.</p>
              <h3 className="font-serif text-2xl md:text-[1.7rem] leading-tight mb-3">{p.title}</h3>
              <p className="text-ink-soft leading-relaxed">{p.text}</p>
              <p className="mt-5 pt-4 border-t border-rule text-sm"><span className="text-muted">Funding sought: </span><b>{p.need}</b></p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep" id="open-calls">
        <SectionHeader number="02" eyebrow="Open calls for co-funding" title={<>Lead funders in place. <em>Gaps to close.</em></>} lede="Each call has a confirmed lead funder, a costed budget and a deadline. Co-funders receive a single consolidated report." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {openCalls.map((c) => {
            const project = getProject(c.project);
            const total = project ? projectTotal(project) : 0;
            return (
              <article key={c.title} className="bg-card border border-ink p-7 flex flex-col">
                <p className="eyebrow mb-3">Closes {formatDate(c.deadline, { day: "numeric", month: "short", year: "numeric" })} · {daysLeft(c.deadline)} days</p>
                <h3 className="font-serif text-2xl leading-tight mb-3">{c.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-5">{c.text}</p>
                <dl className="text-sm space-y-2 border-t border-rule pt-4 mb-6">
                  <div className="flex justify-between gap-4"><dt className="text-muted">Gap to close</dt><dd className="font-serif text-xl tabular">{formatNaira(c.amount)}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Lead funder</dt><dd className="text-right font-medium">{c.lead}</dd></div>
                </dl>
                {project && (
                  <div className="mb-6">
                    <p className="text-[0.75rem] text-muted mb-1.5">Related project: {pct(project.raised, total)}% funded</p>
                    <ProgressBar value={project.raised} max={total} />
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-2">
                  <a href="#proposal" className="btn btn-primary btn-sm">Express interest</a>
                  {project && <Link href={`/projects/${project.slug}`} className="btn btn-outline btn-sm">Project budget</Link>}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="paper" id="grant-management">
        <SectionHeader number="03" eyebrow="How we manage restricted grants" title={<>Your grant, <em>ring-fenced</em> from the day it lands.</>} lede="Restricted funds are only spent on the purpose agreed. Here is the control environment your auditors will want to see." />
        <ol className="grid grid-cols-1 gap-x-12 md:grid-cols-2 border-t border-ink">
          {grantManagement.map((g, i) => (
            <li key={g.title} className="flex gap-6 py-7 border-b border-rule">
              <span className="font-serif italic text-3xl text-terracotta leading-none w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-xl mb-2">{g.title}</h3>
                <p className="text-ink-soft leading-relaxed text-[0.95rem]">{g.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="card" id="reporting">
        <SectionHeader number="04" eyebrow="Reporting cadence" title={<>You’ll never have to <em>chase us</em> for a report.</>} lede="We adapt to your templates and indicators. This is our default rhythm for every grant." />
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="table-ed min-w-[640px]">
            <caption className="sr-only">Default grant reporting cadence</caption>
            <thead><tr><th scope="col">When</th><th scope="col">What you receive</th><th scope="col">Applies to</th></tr></thead>
            <tbody>
              {reportingCadence.map((r) => (
                <tr key={r.when}>
                  <td className="font-serif text-lg w-40">{r.when}</td>
                  <td className="pr-6">{r.what}</td>
                  <td className="text-muted">{r.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="paper" id="due-diligence">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader split={false} number="05" eyebrow="Due-diligence pack" title={<>Everything your <em>compliance team</em> needs.</>} lede="Download individual documents or request the full pack as a single zipped folder. Documents are current as at April 2026." />
            <a href="#" className="btn btn-primary"><Download className="w-4 h-4" aria-hidden /> Download full pack (ZIP · 18 MB)</a>
            <FactListLight />
          </div>
          <ul className="lg:col-span-7 border-t border-ink self-start">
            {dueDiligence.map((d) => (
              <li key={d.name} className="border-b border-rule">
                <a href="#" className="group flex items-center gap-4 min-h-[60px] py-3">
                  <FileText className="w-5 h-5 text-forest shrink-0" aria-hidden />
                  <span className="flex-1 group-hover:text-forest">{d.name}</span>
                  <span className="text-[0.78rem] text-muted shrink-0">{d.meta}</span>
                  <Download className="w-4 h-4 text-muted group-hover:text-forest shrink-0" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="deep" id="partnerships">
        <SectionHeader number="06" eyebrow="Multi-year partnership options" title={<>From a single borehole <em>to a five-year strategy.</em></>} lede="Multi-year and flexible funding lets us keep committees trained and water points working long after construction ends." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {partnershipOptions.map((o) => (
            <article key={o.name} className={cn("p-7 md:p-8 flex flex-col border", o.featured ? "bg-forest-deep text-paper on-dark border-forest" : "bg-card border-ink")}>
              <p className="eyebrow mb-3">{o.term}</p>
              <h3 className="font-serif text-3xl mb-1">{o.name}</h3>
              <p className={cn("font-serif italic text-xl mb-6", o.featured ? "text-[#E9A47B]" : "text-terracotta")}>{o.range}</p>
              <ul className="space-y-3 text-[0.92rem] flex-1">
                {o.points.map((pt) => <li key={pt} className={cn("pl-5 relative before:absolute before:left-0 before:top-[0.6em] before:w-2.5 before:h-px", o.featured ? "before:bg-paper/60" : "before:bg-ink")}>{pt}</li>)}
              </ul>
              <a href="#proposal" className={cn("btn mt-8 self-start", o.featured ? "btn-paper" : "btn-outline")}>Discuss this option</a>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="paper" id="current-funders">
        <SectionHeader number="07" eyebrow="Current funders & partners" title={<>In good <em>company.</em></>} lede="References from current funders are available on request." action={<Link href="/partnerships" className="link-arrow">Corporate partnerships</Link>} />
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="table-ed min-w-[640px]">
            <caption className="sr-only">Current funders and partners</caption>
            <thead><tr><th scope="col">Funder</th><th scope="col">Type</th><th scope="col">Focus of support</th><th scope="col">Since</th></tr></thead>
            <tbody>
              {funders.map((f) => (
                <tr key={f.name}>
                  <td className="font-serif text-lg">{f.name}</td>
                  <td className="text-muted">{f.type}</td>
                  <td>{f.focus}</td>
                  <td className="tabular">{f.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="card" id="proposal">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader split={false} number="08" eyebrow="Submit a concept note" title={<>Start a <em>conversation.</em></>} lede="Tell us what you’d like to fund. We respond to every enquiry within two working days." />
            <div className="border-t border-ink pt-6">
              <p className="eyebrow mb-3">Your contact</p>
              <p className="font-serif text-2xl">{lead.name}</p>
              <p className="text-sm text-muted mb-4">{lead.role}</p>
              <p className="text-sm text-ink-soft leading-relaxed mb-4">{lead.bio}</p>
              <ul className="text-sm space-y-2">
                <li><a href={`mailto:${siteConfig.org.partnershipsEmail}`} className="inline-flex items-center gap-2 min-h-[36px] prose-link"><Mail className="w-4 h-4" aria-hidden />{siteConfig.org.partnershipsEmail}</a></li>
                <li><a href={`tel:${siteConfig.org.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 min-h-[36px] prose-link"><Phone className="w-4 h-4" aria-hidden />{siteConfig.org.phone}</a></li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ProposalForm />
          </div>
        </div>
      </Section>
    </>
  );
}

function FactListLight() {
  return (
    <div className="mt-10">
      <FactList
        items={[
          { label: "Legal form", value: "Incorporated Trustees (Part F, CAMA 2020)" },
          { label: "Auditor", value: "Adekunle, Okafor & Co." },
        ]}
      />
    </div>
  );
}
