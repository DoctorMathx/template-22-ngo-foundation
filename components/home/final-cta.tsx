import Link from "next/link";
import { Section } from "@/components/ui/section";

const ways = [
  { title: "Give once or monthly", text: "Card, bank transfer or USSD — in naira, dollars or pounds.", href: "/donate", cta: "Donate" },
  { title: "Fund a whole project", text: "A borehole, a labour room, a processing centre.", href: "/projects", cta: "See projects" },
  { title: "Partner as an institution", text: "Grants, co-funding and multi-year partnerships.", href: "/funders", cta: "Funders hub" },
  { title: "Leave a legacy", text: "A gift in your will that keeps water flowing.", href: "/legacy", cta: "Legacy giving" },
];

export function FinalCta() {
  return (
    <Section tone="ink" pad="lg">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <h2 className="lg:col-span-5 font-serif text-4xl md:text-6xl font-light leading-[1.02]">
          There are many ways to give <em className="text-[#E9A47B]">hope.</em>
        </h2>
        <ul className="lg:col-span-7 border-t border-paper/25">
          {ways.map((w) => (
            <li key={w.title} className="border-b border-paper/20 py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-8">
                <h3 className="font-serif text-2xl">{w.title}</h3>
                <p className="text-paper/70 text-sm mt-1">{w.text}</p>
              </div>
              <div className="sm:col-span-4 sm:text-right">
                <Link href={w.href} className="btn btn-ghost-light btn-sm">{w.cta}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
