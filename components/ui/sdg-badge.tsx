import { sdgs } from "@/mock/results";

const fallback = "#19486A";

export function SdgBadge({ goal, withTitle }: { goal: number; withTitle?: boolean }) {
  const s = sdgs.find((x) => x.goal === goal);
  return (
    <span className="inline-flex items-center gap-2 text-[0.78rem]">
      <span
        className="inline-flex h-7 min-w-7 px-1 items-center justify-center text-white text-[0.72rem] font-bold"
        style={{ background: s?.color ?? fallback }}
        aria-label={`Sustainable Development Goal ${goal}`}
      >
        {goal}
      </span>
      {withTitle && <span className="text-ink-soft">{s?.title ?? `SDG ${goal}`}</span>}
    </span>
  );
}
