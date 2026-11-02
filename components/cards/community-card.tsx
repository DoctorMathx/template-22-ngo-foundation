import Link from "next/link";
import type { Community } from "@/lib/types";
import { ProgressBar } from "@/components/ui/progress";

export function CommunityCard({ community }: { community: Community }) {
  const headline = community.progress[0];
  const isPct = headline.unit === "%";
  return (
    <article className="panel panel-hover p-6 flex flex-col h-full">
      <div className="flex items-baseline justify-between gap-4 mb-1">
        <h3 className="font-serif text-[1.6rem] leading-tight">
          <Link href={`/communities/${community.slug}`} className="hover:text-forest">{community.name}</Link>
        </h3>
        <span className="text-[0.75rem] text-muted shrink-0">since {community.since}</span>
      </div>
      <p className="text-[0.82rem] text-muted mb-5">{community.lga} LGA · {community.state} State</p>
      <dl className="grid grid-cols-2 gap-4 border-y border-rule py-4 mb-5">
        <div>
          <dt className="eyebrow !text-[0.62rem]">Population</dt>
          <dd className="font-serif text-xl tabular">{community.population.toLocaleString("en-NG")}</dd>
        </div>
        <div>
          <dt className="eyebrow !text-[0.62rem]">Key need</dt>
          <dd className="text-[0.82rem] leading-snug text-ink-soft">{community.needs[0].label.replace(/ \(baseline\)/, "")}: <b className="text-ink">{community.needs[0].value}</b></dd>
        </div>
      </dl>
      <div className="mt-auto">
        <div className="flex justify-between text-[0.8rem] mb-2">
          <span className="text-ink-soft">{headline.label}</span>
          <span className="tabular font-semibold">
            {isPct ? `${headline.before}% → ${headline.now}%` : `${headline.now.toLocaleString("en-NG")} ${headline.unit}`}
          </span>
        </div>
        <ProgressBar value={headline.now} max={headline.target} label={`${headline.label}: ${headline.now} of target ${headline.target}`} />
        <p className="mt-2 text-[0.72rem] text-muted">Target {headline.target.toLocaleString("en-NG")}{isPct ? "%" : ` ${headline.unit}`}</p>
      </div>
    </article>
  );
}
