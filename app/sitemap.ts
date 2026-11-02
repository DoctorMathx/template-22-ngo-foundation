import type { MetadataRoute } from "next";
import { programmes } from "@/mock/programmes";
import { projects } from "@/mock/projects";
import { campaigns } from "@/mock/campaigns";
import { communities } from "@/mock/communities";
import { stories } from "@/mock/stories";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-22-ngo-foundation.vercel.app").replace(/\/$/, "");

const staticRoutes = [
  "",
  "/donate",
  "/projects",
  "/campaigns",
  "/funders",
  "/partnerships",
  "/results",
  "/transparency",
  "/programmes",
  "/communities",
  "/impact",
  "/stories",
  "/events",
  "/get-involved",
  "/giving-circle",
  "/legacy",
  "/ways-to-give",
  "/about",
  "/contact",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const dynamic = [
    ...programmes.map((p) => `/programmes/${p.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...campaigns.map((c) => `/campaigns/${c.slug}`),
    ...communities.map((c) => `/communities/${c.slug}`),
    ...stories.map((s) => `/stories/${s.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path.startsWith("/campaigns") || path.startsWith("/projects") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/donate" || path === "/funders" ? 0.9 : 0.7,
  }));
}
