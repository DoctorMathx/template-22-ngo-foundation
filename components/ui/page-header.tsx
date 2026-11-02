import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Editorial masthead used at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs = [],
  aside,
  tone = "paper",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  aside?: React.ReactNode;
  tone?: "paper" | "forest";
  children?: React.ReactNode;
}) {
  const dark = tone === "forest";
  return (
    <section className={cn(dark ? "bg-forest-deep text-paper on-dark" : "bg-paper", "border-b border-rule")}>
      <div className="container-x pt-10 pb-14 md:pt-14 md:pb-20">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className={cn("flex flex-wrap items-center gap-1.5 text-[0.78rem]", dark ? "text-paper/70" : "text-muted")}>
            <li><Link href="/" className="hover:underline underline-offset-4">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5" aria-hidden />
                {c.href ? <Link href={c.href} className="hover:underline underline-offset-4">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 items-end">
          <div className={cn(aside ? "md:col-span-8" : "md:col-span-10")}>
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className="[overflow-wrap:break-word] font-serif text-[2.6rem] leading-[1.03] md:text-[4.25rem] md:leading-[1.0] font-light tracking-tight">{title}</h1>
            {lede && <p className="lede mt-7 max-w-2xl">{lede}</p>}
          </div>
          {aside && <div className="md:col-span-4">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** A definition-list style fact sheet used in mastheads. */
export function FactList({ items, dark }: { items: { label: string; value: React.ReactNode }[]; dark?: boolean }) {
  return (
    <dl className={cn("border-t", dark ? "border-paper/30" : "border-ink")}>
      {items.map((i) => (
        <div key={i.label} className={cn("flex justify-between gap-6 py-3 border-b text-sm", dark ? "border-paper/20" : "border-rule")}>
          <dt className={dark ? "text-paper/70" : "text-muted"}>{i.label}</dt>
          <dd className="font-semibold text-right tabular">{i.value}</dd>
        </div>
      ))}
    </dl>
  );
}
