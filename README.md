# FinStore NGO Foundation — Template 22

A premium, editorial website template for community development foundations and NGOs, written for
**institutional funders, foundations, development agencies, diaspora major donors and legacy givers**
who need evidence, governance and measurable results before they give.

Demo brand: **Ìrètí Foundation** (Yoruba for “hope”). It runs clean water & sanitation, maternal & child health
and women’s livelihoods programmes in rural Oyo, Kwara, Niger and Plateau states. All names, figures and partners are fictional.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. The only other dependency is lucide-react.
There is no backend: all content lives in typed `mock/*.ts` files.

## Design language: “editorial & trustworthy”

- The palette is warm paper `#F6F1E7`, deep forest green `#1F4D3A`, terracotta `#C4622D`, ink `#1A1A17` and hairline rules `#D9D1C1`.
- Headings use **Fraunces**, with its soft optical axes and italics for emphasis. Body text uses **Inter**. Both load through `next/font/google`.
- The layout borrows from annual reports:
  - numbered sections (01 —), small-caps eyebrows and thin rules on column grids
  - pull quotes and drop caps on story pages
  - photos with captions and credits
  - flat, hairline cards and square buttons

## Pages

| Route | What it is |
| --- | --- |
| `/` | Data-driven homepage made of modules |
| `/donate` | Donate flow. It has one-time, monthly and annual frequencies; a **NGN / USD / GBP currency selector** using fixed mock rates; preset amounts, each with an impact line; a custom amount; designation; a cover-fees option; tributes; anonymous giving; donor details; and Card, Bank transfer and USSD tabs. A sticky summary sits alongside, and the form accepts prefills through `?amount=&campaign=&project=&programme=&frequency=&currency=&designation=` |
| `/donate/thank-you` | Receipt with a generated reference, the amount, frequency, designation, date and a tax note. Also has share buttons, next steps and a print option |
| `/projects`, `/projects/[slug]` | **Projects you can fully fund.** Each shows its location, beneficiaries, an itemised budget table, % funded, milestones, and buttons to fund the remaining amount or the whole project. These buttons prefill the donate flow |
| `/campaigns`, `/campaigns/[slug]` | Appeals with raised vs goal, donor count and days left. Each has a story, a budget, an updates timeline and recent donors |
| `/funders` | **Grants & funders hub.** It covers priorities, open co-funding calls, how restricted grants are managed, reporting cadence, the due-diligence downloads, multi-year partnership options, current funders and a concept-note form |
| `/partnerships` | Corporate and CSR partnerships, with packages, fund management, partners and an enquiry form |
| `/results` | **Results framework.** M&E indicators with baseline, target, achieved and status, plus learning, SDG alignment, results by community and evaluations |
| `/transparency` | Financials. Includes an “of every ₦1,000” breakdown, an income donut and expense bars (pure SVG/CSS), a five-year trend, annual reports and audits, governance facts, policies and the board of trustees |
| `/programmes`, `/programmes/[slug]` | Programme briefs, covering approach, indicators, related projects and stories |
| `/communities`, `/communities/[slug]` | **Community profiles** showing population, need at baseline, and before / now / target progress bars |
| `/impact` | Headline statistics, outcomes, history and stories |
| `/stories`, `/stories/[slug]` | Field reports with drop caps, pull quotes and captioned photos |
| `/events` | Events diary with an RSVP form |
| `/giving-circle` | **Friends of Ìrètí**, a monthly giving circle with four tiers in NGN, USD and GBP |
| `/legacy` | Legacy giving. Includes sample will wording (residuary, pecuniary and specific gifts) with copy buttons, legal details and a confidential enquiry form |
| `/ways-to-give` | Every way to give, including **diaspora giving** (indicative conversions and domiciliary accounts) |
| `/get-involved` | Volunteer application, fundraising pack request and partner links |
| `/about` | Mission, vision, values, history timeline, team and board |
| `/contact` | Contact form, address, phone and WhatsApp, safeguarding contact and a map placeholder |
| `/faq` | Grouped accordion covering giving, tax and receipts, refunds, funders, accountability and volunteering |

The template also includes `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `twitter-image.tsx` and `not-found.tsx`.

## Home modules

The homepage renders `siteConfig.home.modules` in order through the `MODULE_MAP` in `app/page.tsx`. To change the homepage, reorder or remove keys:

`hero` · `impactNumbers` · `programmes` · `projects` · `communities` · `results` · `story` · `campaign` · `funders` ·
`givingCircle` · `transparency` · `events` · `newsletter` · `finalCta`

Section numbers (01, 02 …) are written into each module. If you reorder modules, update them in `components/home/*`.

## Customising

| What | File |
| --- | --- |
| Brand, legal name, address, phones, emails | `lib/site-config.ts` → `brand`, `org` |
| Donation settings: presets per currency, impact ladder, fee %, minimums, **exchange rates**, bank, domiciliary and USSD details, receipt note | `lib/site-config.ts` → `donation` |
| Homepage modules, featured campaign and featured story | `lib/site-config.ts` → `home` |
| Programmes | `mock/programmes.ts` |
| Fundable projects (budget lines, raised amount, milestones) | `mock/projects.ts` |
| Campaigns / appeals | `mock/campaigns.ts` |
| Community profiles | `mock/communities.ts` |
| Results indicators, SDGs, learning, evaluations | `mock/results.ts` |
| Financials, reports, policies, governance | `mock/financials.ts` |
| Funders, priorities, open calls, due-diligence pack, partnership options, CSR tiers | `mock/funders.ts` |
| Giving circle tiers, will wording, diaspora giving | `mock/giving.ts` |
| Team & board | `mock/people.ts` |
| Stories, events, FAQs, headline stats | `mock/stories.ts`, `mock/events.ts`, `mock/faqs.ts`, `mock/impact.ts` |
| Navigation & footer | `mock/navigation.ts` |
| Photos (Unsplash ids) | `mock/photos.ts` |
| Design tokens (colours, buttons, tables, drop caps) | `app/globals.css` (`:root` + utilities) |
| Fonts | `app/layout.tsx` |

All forms are client-side only. They have controlled inputs, validation and success states, and send nothing.
`components/ui/simple-form.tsx` is config-driven, so you can connect it to a form service in one place.
The donate flow simulates payment and sends no card data anywhere.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` to your production URL for canonical, Open Graph and sitemap links.
