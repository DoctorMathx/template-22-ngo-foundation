import Link from "next/link";
import { footerColumns } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  const { org, brand } = siteConfig;
  return (
    <footer className="bg-forest-deep text-paper on-dark pb-24 sm:pb-0">
      <div className="container-x pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-14 border-b border-paper/20">
          <div className="lg:col-span-5">
            <Wordmark light />
            <p className="font-serif text-2xl md:text-[1.9rem] leading-snug mt-8 max-w-md">
              {brand.meaning} <em>We measure it</em> in working pumps, safe births and repaid loans.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-4">The field letter</p>
            <NewsletterForm dark id="footer-newsletter" />
          </div>
        </div>

        <div className="grid gap-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 py-14 border-b border-paper/20">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="inline-flex items-center min-h-[44px] text-[0.9rem] text-paper/85 hover:text-paper hover:underline underline-offset-4">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2">
            <p className="eyebrow mb-4">Contact</p>
            <address className="not-italic text-[0.9rem] text-paper/85 leading-relaxed space-y-2">
              <p>{org.address}</p>
              <p><a href={`tel:${org.phone.replace(/\s/g, "")}`} className="hover:underline underline-offset-4">{org.phone}</a></p>
              <p><a href={org.whatsappLink} className="hover:underline underline-offset-4">WhatsApp {org.whatsapp}</a></p>
              <p><a href={`mailto:${org.email}`} className="hover:underline underline-offset-4">{org.email}</a></p>
            </address>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-[0.85rem]">
              {Object.entries(org.social).map(([k, v]) => (
                <li key={k}><a href={v} className="inline-flex items-center min-h-[44px] capitalize text-paper/85 hover:text-paper hover:underline underline-offset-4">{k === "x" ? "X (Twitter)" : k}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 grid grid-cols-1 gap-4 md:grid-cols-2 text-[0.76rem] text-paper/65 leading-relaxed">
          <p>
            © {new Date(siteConfig.asOf).getFullYear()} {org.legalName}.<br />
            {org.registrationNote}. Accounts audited by {org.auditor}.
          </p>
          <p className="md:text-right">
            <Link href="/transparency" className="underline underline-offset-4 hover:text-paper">Transparency</Link> ·{" "}
            <Link href="/faq" className="underline underline-offset-4 hover:text-paper">Refund policy</Link> ·{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-paper">Safeguarding concerns</Link>
            <br />
            Built on <a href="https://finstore.africa" className="underline underline-offset-4 hover:text-paper">FinStore</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
