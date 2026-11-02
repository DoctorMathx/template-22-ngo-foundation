import { programmes } from "@/mock/programmes";
import { campaigns } from "@/mock/campaigns";
import { projects, projectRemaining } from "@/mock/projects";

export type Designation = { value: string; label: string; group: string; code: string };

// Everything a gift can be restricted to. Values are used in query strings (?designation=…).
export const designations: Designation[] = [
  { value: "general", label: "Where it’s needed most (unrestricted)", group: "General", code: "GEN" },
  { value: "circle", label: "Friends of Ìrètí giving circle", group: "General", code: "FOI" },
  ...campaigns.map((c) => ({ value: `campaign:${c.slug}`, label: `Appeal: ${c.title}`, group: "Campaigns", code: c.slug.slice(0, 5).toUpperCase() })),
  ...projects
    .filter((p) => projectRemaining(p) > 0)
    .map((p) => ({ value: `project:${p.slug}`, label: `Project: ${p.title}`, group: "Projects", code: p.slug.split("-").slice(-1)[0].slice(0, 5).toUpperCase() })),
  ...programmes.map((p) => ({ value: `programme:${p.slug}`, label: `Programme: ${p.title}`, group: "Programmes", code: p.slug.slice(0, 5).toUpperCase() })),
];

export const designationLabel = (value: string) => designations.find((d) => d.value === value)?.label ?? designations[0].label;
