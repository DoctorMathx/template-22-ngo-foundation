export type NavItem = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };

export type Photo = { src: string; alt: string; caption?: string; credit?: string };

export type ProgrammeSlug = "clean-water-sanitation" | "maternal-child-health" | "womens-livelihoods";

export type Programme = {
  slug: ProgrammeSlug;
  number: string;
  title: string;
  short: string;
  summary: string;
  body: string[];
  image: Photo;
  approach: { title: string; text: string }[];
  stats: { value: string; label: string }[];
  budgetShare: number; // % of FY programme spend
  sdgs: number[];
  impactLine: string;
};

export type Milestone = { label: string; date: string; status: "done" | "current" | "upcoming"; note?: string };

export type BudgetLine = { item: string; detail?: string; qty?: string; cost: number };

export type Project = {
  slug: string;
  title: string;
  programme: ProgrammeSlug;
  community: string; // community slug
  location: string;
  state: string;
  beneficiaries: number;
  beneficiaryLabel: string;
  summary: string;
  body: string[];
  image: Photo;
  budget: BudgetLine[];
  raised: number;
  funders: number;
  status: "open" | "funded" | "in-delivery" | "completed";
  milestones: Milestone[];
  sdgs: number[];
  costPerPerson?: string;
};

export type CampaignUpdate = { date: string; title: string; text: string };

export type Campaign = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  story: string[];
  image: Photo;
  goal: number;
  raised: number;
  donors: number;
  endDate: string; // ISO
  programme: ProgrammeSlug;
  updates: CampaignUpdate[];
  recentDonors: { name: string; amount: number; when: string; note?: string }[];
  uses: { label: string; amount: number }[];
  matched?: string;
};

export type Community = {
  slug: string;
  name: string;
  lga: string;
  state: string;
  population: number;
  households: number;
  since: number;
  image: Photo;
  summary: string;
  needs: { label: string; value: string }[];
  progress: { label: string; before: number; now: number; target: number; unit: string }[];
  voice: { quote: string; name: string; role: string };
  programmes: ProgrammeSlug[];
};

export type Story = {
  slug: string;
  title: string;
  dek: string;
  category: "Field report" | "Voices" | "Learning" | "News";
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  image: Photo;
  body: string[];
  pullQuote?: { text: string; by: string };
  programme?: ProgrammeSlug;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  kind: "Funders" | "Community" | "Diaspora" | "Fundraiser";
  summary: string;
  online?: boolean;
};

export type Person = { name: string; role: string; bio: string; photo?: string; initials?: string };

export type Indicator = {
  programme: ProgrammeSlug;
  code: string;
  indicator: string;
  unit: string;
  baseline: string;
  target: string;
  achieved: string;
  progress: number; // % of target achieved
  status: "achieved" | "on-track" | "behind";
  source: string;
};

export type Funder = { name: string; type: string; since: number; focus: string; mark: string };

export type Faq = { q: string; a: string; group: "Giving" | "Tax & receipts" | "Refunds" | "Funders" | "Accountability" | "Volunteering" };

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "number" | "date" | "checkbox";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  half?: boolean;
  autoComplete?: string;
};
