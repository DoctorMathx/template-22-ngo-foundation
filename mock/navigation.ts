import type { NavItem } from "@/lib/types";

export const navItems: NavItem[] = [
  {
    label: "Our work",
    href: "/programmes",
    children: [
      { label: "Programmes", href: "/programmes", description: "Water, health and women’s livelihoods" },
      { label: "Communities", href: "/communities", description: "Where we work, what they need, progress so far" },
      { label: "Impact", href: "/impact", description: "What has changed since 2014" },
      { label: "Stories", href: "/stories", description: "Field reports, voices and learning" },
    ],
  },
  {
    label: "Fund a project",
    href: "/projects",
    children: [
      { label: "Projects to fund", href: "/projects", description: "Fully-costed projects you can fund outright" },
      { label: "Campaigns", href: "/campaigns", description: "Current appeals and match funds" },
      { label: "Friends of Ìrètí", href: "/giving-circle", description: "Our monthly giving circle" },
      { label: "Legacy giving", href: "/legacy", description: "Remember Ìrètí in your will" },
      { label: "Ways to give", href: "/ways-to-give", description: "Diaspora, corporate, payroll and more" },
    ],
  },
  {
    label: "Funders",
    href: "/funders",
    children: [
      { label: "Grants & funders hub", href: "/funders", description: "Priorities, open calls and due diligence" },
      { label: "Corporate partnerships", href: "/partnerships", description: "CSR packages and employee giving" },
      { label: "Results framework", href: "/results", description: "Indicators, targets and SDG alignment" },
      { label: "Transparency", href: "/transparency", description: "Financials, audits and governance" },
    ],
  },
  { label: "Get involved", href: "/get-involved" },
  { label: "About", href: "/about" },
];

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Our work",
    links: [
      { label: "Programmes", href: "/programmes" },
      { label: "Communities", href: "/communities" },
      { label: "Impact", href: "/impact" },
      { label: "Stories", href: "/stories" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Give",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Projects to fund", href: "/projects" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Friends of Ìrètí", href: "/giving-circle" },
      { label: "Legacy giving", href: "/legacy" },
      { label: "Ways to give", href: "/ways-to-give" },
    ],
  },
  {
    title: "Accountability",
    links: [
      { label: "Funders hub", href: "/funders" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Results", href: "/results" },
      { label: "Transparency", href: "/transparency" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { label: "About us", href: "/about" },
      { label: "Get involved", href: "/get-involved" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
