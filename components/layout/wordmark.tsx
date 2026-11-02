import { cn } from "@/lib/utils";

/** Typographic wordmark — Fraunces italic “Ìrètí” over small-caps “Foundation”. */
export function Wordmark({ light, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="none" stroke={light ? "#F6F1E7" : "var(--forest)"} strokeWidth="1.2" />
        <path d="M16 6c3.5 5 6 8.4 6 11.6A6 6 0 0 1 10 17.6C10 14.4 12.5 11 16 6z" fill={light ? "#F6F1E7" : "var(--forest)"} />
        <path d="M13.2 18.5a3 3 0 0 0 2.8 2.6" stroke="var(--terracotta)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif italic text-[1.55rem] -mb-0.5", light ? "text-paper" : "text-ink")} style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
          Ìrètí
        </span>
        <span className={cn("text-[0.6rem] font-semibold tracking-[0.32em] uppercase", light ? "text-paper/75" : "text-muted")}>Foundation</span>
      </span>
    </span>
  );
}
