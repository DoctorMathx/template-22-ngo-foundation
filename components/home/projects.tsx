import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/mock/projects";

export function ProjectsModule() {
  const open = projects.filter((p) => p.status === "open").slice(0, 3);
  return (
    <Section tone="paper">
      <SectionHeader number="03" eyebrow="Projects you can fund outright" title={<>Fund a whole borehole. <em>Or finish one.</em></>} lede="Each project is fully costed, line by line, with milestones and a named community. Close the gap yourself, or give any amount toward it." action={<Link href="/projects" className="link-arrow">All projects</Link>} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {open.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
    </Section>
  );
}
