import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/hero";
import { ImpactNumbers } from "@/components/home/impact-numbers";
import { ProgrammesModule } from "@/components/home/programmes";
import { ProjectsModule } from "@/components/home/projects";
import { CommunitiesModule } from "@/components/home/communities";
import { ResultsModule } from "@/components/home/results";
import { StoryModule } from "@/components/home/story";
import { CampaignModule } from "@/components/home/campaign";
import { FundersModule } from "@/components/home/funders";
import { GivingCircleModule } from "@/components/home/giving-circle";
import { TransparencyModule } from "@/components/home/transparency";
import { EventsModule } from "@/components/home/events";
import { NewsletterModule } from "@/components/home/newsletter";
import { FinalCta } from "@/components/home/final-cta";

// The homepage is data-driven — reorder or remove keys in `siteConfig.home.modules`.
const MODULE_MAP = {
  hero: Hero,
  impactNumbers: ImpactNumbers,
  programmes: ProgrammesModule,
  projects: ProjectsModule,
  communities: CommunitiesModule,
  results: ResultsModule,
  story: StoryModule,
  campaign: CampaignModule,
  funders: FundersModule,
  givingCircle: GivingCircleModule,
  transparency: TransparencyModule,
  events: EventsModule,
  newsletter: NewsletterModule,
  finalCta: FinalCta,
} as const;

export default function HomePage() {
  return (
    <>
      {siteConfig.home.modules.map((key) => {
        const C = MODULE_MAP[key];
        return C ? <C key={key} /> : null;
      })}
    </>
  );
}
