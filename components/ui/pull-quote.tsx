import { cn } from "@/lib/utils";

export function PullQuote({ text, by, className, large }: { text: string; by?: string; className?: string; large?: boolean }) {
  return (
    <figure className={cn("border-l-2 border-[color:var(--terracotta)] pl-6 md:pl-8", className)}>
      <blockquote className={cn("font-serif italic leading-[1.25]", large ? "text-3xl md:text-[2.6rem]" : "text-2xl md:text-[1.75rem]")}>
        <span aria-hidden className="text-terracotta">“</span>
        {text}
        <span aria-hidden className="text-terracotta">”</span>
      </blockquote>
      {by && <figcaption className="mt-4 text-sm text-muted">— {by}</figcaption>}
    </figure>
  );
}
