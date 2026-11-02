import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { StoryCard } from "@/components/cards/story-card";
import { stories } from "@/mock/stories";

export const metadata: Metadata = {
  title: "Stories & news",
  description: "Field reports, voices from the communities, learning and news from Ìrètí Foundation.",
};

export default function StoriesPage() {
  const [lead, ...rest] = stories;
  return (
    <>
      <PageHeader eyebrow="Stories & news" crumbs={[{ label: "Stories" }]} title={<>Field reports, voices <em className="text-forest">&amp; learning.</em></>} lede="Written by our field and MEL teams, and by the people we work with. We publish what didn’t work alongside what did." />
      <Section tone="paper" pad="md">
        <StoryCard story={lead} large />
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {rest.map((s) => <StoryCard key={s.slug} story={s} />)}
        </div>
      </Section>
    </>
  );
}
