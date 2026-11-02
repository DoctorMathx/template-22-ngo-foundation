import type { Funder } from "@/lib/types";

// Funders & partners are fictional placeholders — replace with your own (with permission).
export const funders: Funder[] = [
  { name: "Northbridge Foundation", type: "Private foundation", since: 2019, focus: "Rural water · match funding", mark: "NORTHBRIDGE" },
  { name: "Sahel Water Trust", type: "Trust", since: 2017, focus: "Borehole sustainability", mark: "Sahel Water" },
  { name: "Atlantic Health Partners", type: "Development agency", since: 2021, focus: "Maternal & newborn health", mark: "ATLANTIC·HEALTH" },
  { name: "The Adeyemi Family Foundation", type: "Family foundation", since: 2016, focus: "Oyo State communities", mark: "Adeyemi" },
  { name: "Kanem Development Fund", type: "Pooled fund", since: 2022, focus: "Women’s economic empowerment", mark: "KANEM" },
  { name: "Clearwater Bank Plc", type: "Corporate (CSR)", since: 2020, focus: "Employee giving + school WASH", mark: "clearwater" },
  { name: "Harmattan Energy Ltd", type: "Corporate (CSR)", since: 2023, focus: "Solar for PHCs", mark: "HARMATTAN" },
  { name: "Plateau Diaspora Circle", type: "Diaspora network", since: 2020, focus: "Plateau water points", mark: "PDC" },
];

export const fundingPriorities = [
  { title: "Five-year water functionality", text: "Multi-year support that funds not only drilling but the five years of testing, repairs and committee mentoring that keep 9 in 10 water points working.", need: "₦180m over 3 years" },
  { title: "PHC maternity upgrades in Niger & Kwara", text: "Equip and power 8 further PHCs with State staffing commitments already in place.", need: "₦220m over 3 years" },
  { title: "Women’s revolving loan capital", text: "Seed capital for 120 cooperatives; every naira is lent, repaid and re-lent for years.", need: "₦90m over 3 years" },
  { title: "Core & MEL capacity", text: "Unrestricted support for monitoring, evaluation, learning and the systems that make our numbers trustworthy.", need: "₦45m per year" },
];

export const openCalls = [
  {
    title: "Co-fund: Wadata maternity ward, Bida",
    amount: 11330000,
    deadline: "2026-12-15",
    lead: "Atlantic Health Partners (lead funder, 48%)",
    text: "We are seeking one or two co-funders to close the remaining gap. Naming of the newborn corner is available.",
    project: "maternity-ward-bida-phc",
  },
  {
    title: "Co-fund: Oyo dry-season water plan 2027",
    amount: 38000000,
    deadline: "2027-01-31",
    lead: "Northbridge Foundation (match fund)",
    text: "Eight new water points and four rehabilitations across Ibarapa and Oke-Ogun. Co-funders receive a consolidated report.",
    project: "borehole-igbo-ora",
  },
  {
    title: "Seed partner: Her Cooperative Fund (Plateau)",
    amount: 12000000,
    deadline: "2027-03-31",
    lead: "Kanem Development Fund",
    text: "Extend the revolving loan model to 15 new cooperatives in Bokkos and Mangu LGAs.",
    project: "share-shea-processing-centre",
  },
];

export const grantManagement = [
  { title: "Ring-fenced in our ledger", text: "Every restricted grant gets its own fund code in our accounting system (Sage Intacct). Expenditure is coded at source and cannot be moved between funds without Finance Director and donor approval." },
  { title: "Separate bank tracking", text: "Grants above ₦50m — or where the donor requires it — are held in a dedicated sub-account with dual signatories." },
  { title: "Budget-vs-actual every month", text: "Programme and finance teams review variance monthly. Any line moving more than 10% is flagged to you before it happens." },
  { title: "Independent audit", text: "Restricted funds are audited annually as part of our statutory audit; project-specific audits on request." },
  { title: "Procurement you can inspect", text: "Three-quote minimum above ₦500,000, tender committee above ₦5m, and a conflict-of-interest register signed by every staff member and trustee." },
  { title: "Indirect cost rate", text: "Our standard indirect cost recovery is 8% of direct costs. We share the calculation in our due-diligence pack." },
];

export const reportingCadence = [
  { when: "Monthly", what: "Short email update with photos and milestone status", who: "All grants" },
  { when: "Quarterly", what: "Narrative + financial report: budget vs actual, indicator progress, risks", who: "Grants ≥ ₦10m" },
  { when: "Bi-annually", what: "Joint review call with the programme and finance leads", who: "Multi-year partners" },
  { when: "Annually", what: "Audited accounts, annual report, functionality audit dataset", who: "All funders" },
  { when: "End of grant", what: "Final report, evaluation summary, lessons learned and asset register", who: "All grants" },
  { when: "Any time", what: "Site visits with our field team — we arrange travel and security", who: "On request" },
];

export const dueDiligence = [
  { name: "CAC Certificate of Incorporation (Part F)", meta: "PDF · 1.2 MB" },
  { name: "Constitution & Trust Deed", meta: "PDF · 2.4 MB" },
  { name: "Audited financial statements 2023–2025", meta: "PDF · 6.8 MB" },
  { name: "SCUML certificate & TIN", meta: "PDF · 0.8 MB" },
  { name: "Safeguarding policy (PSEA)", meta: "PDF · 0.9 MB" },
  { name: "Anti-fraud, bribery & corruption policy", meta: "PDF · 0.6 MB" },
  { name: "Whistleblowing policy", meta: "PDF · 0.4 MB" },
  { name: "Procurement & conflict-of-interest policy", meta: "PDF · 0.7 MB" },
  { name: "M&E framework & indicator reference sheets", meta: "PDF · 1.9 MB" },
  { name: "Organisational chart & key staff CVs", meta: "PDF · 1.1 MB" },
  { name: "Risk register (summary)", meta: "XLSX · 0.2 MB" },
  { name: "References from current funders", meta: "On request" },
];

export const partnershipOptions = [
  {
    name: "Project funder",
    term: "6 – 18 months",
    range: "₦5m – ₦30m",
    points: ["Fund a single, fully-costed project end to end", "Named recognition at site (optional)", "Monthly updates + final report", "One site visit"],
  },
  {
    name: "Programme partner",
    term: "2 – 3 years",
    range: "₦30m – ₦150m",
    points: ["Restricted to one programme across several communities", "Quarterly reporting against your indicators", "Joint learning review each year", "Co-designed results framework"],
    featured: true,
  },
  {
    name: "Strategic partner",
    term: "3 – 5 years",
    range: "₦150m+",
    points: ["Flexible or core funding across our strategy", "Seat on our annual Strategy & Learning forum", "Independent mid-term evaluation", "Co-branded learning publications"],
  },
];

export const corporateTiers = [
  { name: "Community Partner", amount: 5000000, points: ["Fund a school sanitation block or 5 cooperative loans", "Employee volunteering day", "Impact certificate for your annual report"] },
  { name: "Water Partner", amount: 15000000, points: ["Fund a solar borehole in a named community", "Plaque at the tap-stand (optional)", "Staff site visit and storytelling assets", "Payroll-giving set-up"], featured: true },
  { name: "Health Partner", amount: 40000000, points: ["Power and equip a PHC maternity unit", "Quarterly impact dashboard", "CSR reporting aligned to SDGs and NGX sustainability disclosure", "Board-level briefing"] },
];
