import { cn, formatNairaShort } from "@/lib/utils";

/** Pure-SVG donut. Segments use stroke-dasharray on circles — no chart library. */
export function Donut({
  data,
  size = 240,
  thickness = 34,
  centerLabel,
  centerValue,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = data.reduce((a, b) => a + b.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  // Precompute each segment's length and starting offset (no mutation during render).
  const segments = data.map((d, i) => {
    const len = (d.value / total) * c;
    const start = data.slice(0, i).reduce((a, b) => a + (b.value / total) * c, 0);
    return { ...d, len, start };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-[280px]" role="img" aria-label={data.map((d) => `${d.label} ${Math.round((d.value / total) * 100)}%`).join(", ")}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((d) => (
          <circle
            key={d.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={thickness}
            strokeDasharray={`${Math.max(0, d.len - 2)} ${c}`}
            strokeDashoffset={-d.start}
          />
        ))}
      </g>
      {centerValue && (
        <text x="50%" y="48%" textAnchor="middle" className="font-serif" style={{ fontSize: size * 0.13, fill: "var(--ink)" }}>
          {centerValue}
        </text>
      )}
      {centerLabel && (
        <text x="50%" y="60%" textAnchor="middle" style={{ fontSize: size * 0.05, fill: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {centerLabel}
        </text>
      )}
    </svg>
  );
}

export function Legend({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <ul className="divide-y divide-[color:var(--rule)] border-t border-ink">
      {data.map((d) => (
        <li key={d.label} className="flex items-center gap-3 py-3 text-sm">
          <span className="w-3 h-3 shrink-0" style={{ background: d.color }} aria-hidden />
          <span className="flex-1 text-ink-soft">{d.label}</span>
          <span className="tabular text-muted">{formatNairaShort(d.value)}</span>
          <span className="tabular font-semibold w-12 text-right">{Math.round((d.value / total) * 100)}%</span>
        </li>
      ))}
    </ul>
  );
}

/** Horizontal bars with labels, CSS only. */
export function BarList({ data, max, format = formatNairaShort, className }: { data: { label: string; value: number; group?: string }[]; max?: number; format?: (n: number) => string; className?: string }) {
  const top = max ?? Math.max(...data.map((d) => d.value));
  return (
    <ul className={cn("space-y-5", className)}>
      {data.map((d) => (
        <li key={d.label}>
          <div className="flex justify-between gap-4 text-sm mb-2">
            <span className="text-ink-soft">{d.label}{d.group && <span className="ml-2 text-[0.68rem] uppercase tracking-[0.12em] text-muted">{d.group}</span>}</span>
            <span className="tabular font-semibold">{format(d.value)}</span>
          </div>
          <div className="h-2.5 bg-rule/60" aria-hidden>
            <div className={cn("h-full", d.group === "Support" ? "bg-terracotta" : "bg-forest")} style={{ width: `${(d.value / top) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
