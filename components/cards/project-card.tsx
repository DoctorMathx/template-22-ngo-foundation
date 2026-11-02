import Link from "next/link";
import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import type { Project } from "@/lib/types";
import { formatNairaShort, pct } from "@/lib/utils";
import { projectRemaining, projectStatusLabel, projectTotal } from "@/mock/projects";
import { programmeTitle } from "@/mock/programmes";
import { ProgressBar } from "@/components/ui/progress";

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const total = projectTotal(project);
  const remaining = projectRemaining(project);
  const p = pct(project.raised, total);
  return (
    <article className="group panel panel-hover flex flex-col h-full">
      <Link href={`/projects/${project.slug}`} className="block" tabIndex={-1} aria-hidden>
        <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
          <Image src={project.image.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          {index !== undefined && (
            <span className="absolute top-0 left-0 bg-paper px-3 py-1.5 font-serif italic text-terracotta text-sm">No. {String(index + 1).padStart(2, "0")}</span>
          )}
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="tag tag-forest">{programmeTitle(project.programme)}</span>
          {project.status !== "open" && <span className="tag tag-solid">{projectStatusLabel[project.status]}</span>}
        </div>
        <h3 className="font-serif text-[1.45rem] leading-tight mb-3">
          <Link href={`/projects/${project.slug}`} className="hover:text-forest">{project.title}</Link>
        </h3>
        <ul className="text-[0.82rem] text-muted space-y-1 mb-5">
          <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" aria-hidden />{project.location.split(",").slice(-1)[0].trim()}, {project.state} State</li>
          <li className="flex items-center gap-2"><Users className="w-3.5 h-3.5" aria-hidden />{project.beneficiaries.toLocaleString("en-NG")} {project.beneficiaryLabel.split(",")[0]}</li>
        </ul>
        <div className="mt-auto">
          <div className="flex justify-between text-[0.82rem] mb-2">
            <span><b className="tabular">{formatNairaShort(project.raised)}</b> <span className="text-muted">of {formatNairaShort(total)}</span></span>
            <span className="font-semibold text-forest tabular">{p}%</span>
          </div>
          <ProgressBar value={project.raised} max={total} />
          <p className="mt-4 text-[0.85rem] font-semibold">
            {remaining > 0 ? (
              <Link href={`/projects/${project.slug}`} className="link-arrow">Fund the remaining {formatNairaShort(remaining)}</Link>
            ) : (
              <Link href={`/projects/${project.slug}`} className="link-arrow">Follow progress</Link>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
