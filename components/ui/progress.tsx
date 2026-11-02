import { cn, formatNaira, formatNairaShort, pct } from "@/lib/utils";

export function ProgressBar({ value, max, className, tone = "forest", label }: { value: number; max: number; className?: string; tone?: "forest" | "terracotta" | "paper"; label?: string }) {
  const p = pct(value, max);
  const fill = tone === "terracotta" ? "bg-terracotta" : tone === "paper" ? "bg-paper" : "bg-forest";
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={p}
      aria-label={label ?? `${p}% funded`}
      className={cn("h-[6px] w-full overflow-hidden", tone === "paper" ? "bg-paper/25" : "bg-[color:var(--rule)]", className)}
    >
      <div className={cn("h-full", fill)} style={{ width: `${p}%` }} />
    </div>
  );
}

/** Raised vs goal block with %, optional donors and days left. */
export function FundingMeter({
  raised,
  goal,
  donors,
  daysLeft,
  donorsLabel = "donors",
  compact,
}: {
  raised: number;
  goal: number;
  donors?: number;
  daysLeft?: number;
  donorsLabel?: string;
  compact?: boolean;
}) {
  const p = pct(raised, goal);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <p>
          <span className={cn("font-serif tabular", compact ? "text-2xl" : "text-3xl md:text-4xl")}>{compact ? formatNairaShort(raised) : formatNaira(raised)}</span>
          <span className="text-sm text-muted"> of {compact ? formatNairaShort(goal) : formatNaira(goal)}</span>
        </p>
        <span className="font-serif italic text-xl text-terracotta tabular">{p}%</span>
      </div>
      <ProgressBar value={raised} max={goal} />
      {(donors !== undefined || daysLeft !== undefined) && (
        <dl className="mt-3 flex gap-6 text-[0.8rem] text-muted">
          {donors !== undefined && (
            <div className="flex gap-1.5"><dt className="sr-only">{donorsLabel}</dt><dd><b className="text-ink tabular">{donors.toLocaleString("en-NG")}</b> {donorsLabel}</dd></div>
          )}
          {daysLeft !== undefined && (
            <div className="flex gap-1.5"><dt className="sr-only">Days left</dt><dd><b className="text-ink tabular">{daysLeft}</b> days left</dd></div>
          )}
        </dl>
      )}
    </div>
  );
}
