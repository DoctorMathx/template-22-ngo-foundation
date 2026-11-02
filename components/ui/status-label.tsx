import type { Indicator } from "@/lib/types";

const map: Record<Indicator["status"], { label: string; cls: string }> = {
  achieved: { label: "Achieved", cls: "status-ok" },
  "on-track": { label: "On track", cls: "status-warn" },
  behind: { label: "Behind", cls: "status-risk" },
};

export function StatusLabel({ status }: { status: Indicator["status"] }) {
  const s = map[status];
  return <span className={`status ${s.cls}`}>{s.label}</span>;
}
