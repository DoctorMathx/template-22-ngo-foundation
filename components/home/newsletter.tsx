import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export function NewsletterModule() {
  return (
    <Section tone="deep" pad="md">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 items-end">
        <div className="md:col-span-6">
          <p className="eyebrow mb-4">The field letter</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">Four letters a year from the communities you support. <em>No noise.</em></h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <NewsletterForm id="home-newsletter" />
        </div>
      </div>
    </Section>
  );
}
