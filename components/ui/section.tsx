import { cn } from "@/lib/utils";

type Tone = "paper" | "deep" | "card" | "forest" | "ink";

export function Section({
  children,
  className,
  tone = "paper",
  pad = "lg",
  id,
  narrow,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  pad?: "sm" | "md" | "lg";
  id?: string;
  narrow?: boolean;
  labelledBy?: string;
}) {
  const tones: Record<Tone, string> = {
    paper: "bg-paper",
    deep: "bg-paper-deep",
    card: "bg-card",
    forest: "bg-forest-deep text-paper on-dark",
    ink: "bg-ink text-paper on-dark",
  };
  const pads = { sm: "py-12 md:py-14", md: "py-16 md:py-20", lg: "py-20 md:py-28" } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], pads[pad], className)}>
      <div className={narrow ? "container-narrow" : "container-x"}>{children}</div>
    </section>
  );
}

/** Numbered, rule-topped section header in the annual-report style: "01 — Eyebrow". */
export function SectionHeader({
  number,
  eyebrow,
  title,
  lede,
  action,
  id,
  className,
  split = true,
}: {
  number?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
  className?: string;
  split?: boolean;
}) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-baseline gap-3 border-t pt-4 mb-8" style={{ borderColor: "color-mix(in srgb, currentColor 22%, transparent)" }}>
        {number && <span className="section-num">{number}</span>}
        {number && <span aria-hidden className="text-muted">—</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className={cn(split && "grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10 items-end")}>
        <h2 id={id} className={cn("font-serif text-[2.1rem] leading-[1.08] md:text-5xl md:leading-[1.05] font-normal", split && "md:col-span-7")}>
          {title}
        </h2>
        {(lede || action) && (
          <div className={cn(split && "md:col-span-5", "flex flex-col gap-5 md:items-start")}>
            {lede && <p className="lede">{lede}</p>}
            {action}
          </div>
        )}
      </div>
    </header>
  );
}
