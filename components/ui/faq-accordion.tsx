"use client";

import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FaqAccordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="border-t border-ink">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b-${i}`;
        const panelId = `${base}-p-${i}`;
        return (
          <div key={item.q} className="border-b border-rule">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-5 text-left min-h-[44px] group"
              >
                <span className="font-serif text-lg md:text-xl leading-snug group-hover:text-forest">{item.q}</span>
                <span className="mt-1 shrink-0 text-forest" aria-hidden>
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="pb-6 pr-10 text-ink-soft leading-relaxed max-w-3xl">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
