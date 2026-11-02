// FY2025 (Jan–Dec) — figures from the audited financial statements. Replace with your own.
export const financialYear = "2025";
export const totalIncome = 612400000;
export const totalExpenditure = 588900000;

export const incomeSources = [
  { label: "Institutional grants & development agencies", value: 281700000, color: "var(--forest)" },
  { label: "Foundations & trusts", value: 110200000, color: "#4E7A63" },
  { label: "Individual donors in Nigeria", value: 85700000, color: "var(--terracotta)" },
  { label: "Diaspora giving (incl. Friends of Ìrètí)", value: 67400000, color: "#E09A6E" },
  { label: "Corporate partners (CSR)", value: 49000000, color: "#8C7B5C" },
  { label: "Investment income & other", value: 18400000, color: "#BDB29C" },
];

export const expenditure = [
  { label: "Clean water & sanitation", value: 202800000, group: "Programmes" },
  { label: "Maternal & child health", value: 173900000, group: "Programmes" },
  { label: "Women’s livelihoods", value: 106200000, group: "Programmes" },
  { label: "Monitoring, evaluation & learning", value: 23600000, group: "Support" },
  { label: "Fundraising & donor care", value: 41200000, group: "Support" },
  { label: "Governance & administration", value: 41200000, group: "Support" },
];

export const perThousand = [
  { amount: 820, label: "Programmes", detail: "Water ₦345 · Health ₦295 · Livelihoods ₦180", color: "var(--forest)" },
  { amount: 40, label: "Monitoring, evaluation & learning", detail: "Audits, surveys, water testing", color: "#4E7A63" },
  { amount: 70, label: "Fundraising & donor care", detail: "Receipts, reporting, appeals", color: "var(--terracotta)" },
  { amount: 70, label: "Governance & administration", detail: "Audit, finance, HR, IT, office", color: "#BDB29C" },
];

export const reports = [
  { year: "2025", title: "Annual Report 2025 — “Still working”", audited: true, opinion: "Unqualified", size: "PDF · 8.4 MB", published: "30 April 2026" },
  { year: "2024", title: "Annual Report 2024 — “Ten years of water”", audited: true, opinion: "Unqualified", size: "PDF · 7.9 MB", published: "28 April 2025" },
  { year: "2023", title: "Annual Report 2023", audited: true, opinion: "Unqualified", size: "PDF · 6.1 MB", published: "2 May 2024" },
  { year: "2022", title: "Annual Report 2022", audited: true, opinion: "Unqualified", size: "PDF · 5.6 MB", published: "29 April 2023" },
  { year: "2021", title: "Annual Report 2021", audited: true, opinion: "Unqualified", size: "PDF · 4.8 MB", published: "30 April 2022" },
];

export const fiveYear = [
  { year: "2021", income: 318000000, programmeRatio: 79 },
  { year: "2022", income: 386000000, programmeRatio: 80 },
  { year: "2023", income: 447000000, programmeRatio: 81 },
  { year: "2024", income: 506000000, programmeRatio: 81 },
  { year: "2025", income: 612400000, programmeRatio: 82 },
];

export const policies = [
  "Safeguarding & PSEA policy",
  "Anti-fraud, bribery & corruption policy",
  "Whistleblowing policy",
  "Procurement policy",
  "Conflict-of-interest policy & register",
  "Data protection policy (NDPA 2023)",
  "Reserves & investment policy",
  "Complaints & feedback policy",
];

export const governance = [
  { label: "Registration", value: "Incorporated Trustees, Part F CAMA 2020" },
  { label: "Tax", value: "Exempt under CITA s.23(1)(c)" },
  { label: "External auditor", value: "Adekunle, Okafor & Co. (Chartered Accountants)" },
  { label: "Audit opinion", value: "Unqualified, nine consecutive years (2017–2025)" },
  { label: "Reserves", value: "4.2 months of operating costs (policy: 3–6 months)" },
  { label: "Board", value: "6 independent trustees · meets quarterly · no trustee is paid" },
  { label: "Committees", value: "Audit & Risk · Safeguarding · Programmes & Learning" },
];
