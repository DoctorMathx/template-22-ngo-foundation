import type { Indicator } from "@/lib/types";

// Results framework — baseline 2021 survey, targets for end of 2026 strategy, achieved as at Dec 2025.
export const indicators: Indicator[] = [
  { programme: "clean-water-sanitation", code: "W1", indicator: "People with safe water within 500m of home", unit: "people", baseline: "0", target: "80,000", achieved: "71,400", progress: 89, status: "on-track", source: "Household survey + water-point register" },
  { programme: "clean-water-sanitation", code: "W2", indicator: "Water points functioning at annual audit", unit: "%", baseline: "—", target: "90%", achieved: "92%", progress: 100, status: "achieved", source: "Unannounced functionality audit" },
  { programme: "clean-water-sanitation", code: "W3", indicator: "Water points meeting WHO E. coli standard", unit: "%", baseline: "—", target: "95%", achieved: "96%", progress: 100, status: "achieved", source: "Quarterly lab tests" },
  { programme: "clean-water-sanitation", code: "W4", indicator: "Schools with water, sanitation & handwashing", unit: "schools", baseline: "9", target: "60", achieved: "41", progress: 68, status: "on-track", source: "School WASH audit" },
  { programme: "clean-water-sanitation", code: "W5", indicator: "Water committees with ≥50% women members", unit: "%", baseline: "12%", target: "100%", achieved: "88%", progress: 88, status: "on-track", source: "Committee records" },
  { programme: "maternal-child-health", code: "H1", indicator: "Births attended by a skilled health worker (partner catchments)", unit: "%", baseline: "31%", target: "75%", achieved: "68%", progress: 84, status: "on-track", source: "Facility registers, verified quarterly" },
  { programme: "maternal-child-health", code: "H2", indicator: "Women with 4+ antenatal visits", unit: "%", baseline: "36%", target: "70%", achieved: "61%", progress: 74, status: "on-track", source: "Facility registers" },
  { programme: "maternal-child-health", code: "H3", indicator: "Children fully immunised by age one", unit: "%", baseline: "41%", target: "80%", achieved: "55%", progress: 36, status: "behind", source: "LGA DHIS2 data" },
  { programme: "maternal-child-health", code: "H4", indicator: "Partner PHCs with 24-hour power & water", unit: "PHCs", baseline: "1", target: "14", achieved: "11", progress: 77, status: "on-track", source: "Facility assessment" },
  { programme: "womens-livelihoods", code: "L1", indicator: "Women active in savings groups", unit: "women", baseline: "0", target: "5,000", achieved: "4,310", progress: 86, status: "on-track", source: "VSLA records" },
  { programme: "womens-livelihoods", code: "L2", indicator: "Micro-loan repayment rate", unit: "%", baseline: "—", target: "95%", achieved: "97.4%", progress: 100, status: "achieved", source: "Cooperative ledgers, audited" },
  { programme: "womens-livelihoods", code: "L3", indicator: "Change in average member income after 2 years", unit: "%", baseline: "₦18,500/mo", target: "+50%", achieved: "+58%", progress: 100, status: "achieved", source: "Panel survey (n=640)" },
  { programme: "womens-livelihoods", code: "L4", indicator: "Cooperatives with shared processing equipment", unit: "coops", baseline: "0", target: "30", achieved: "14", progress: 40, status: "behind", source: "Asset register" },
];

export const sdgs = [
  { goal: 6, title: "Clean water & sanitation", color: "#26BDE2", contribution: "71,400 people with safe water; 41 schools with WASH facilities." },
  { goal: 3, title: "Good health & well-being", color: "#4C9F38", contribution: "11 PHCs powered and equipped; skilled birth attendance up from 31% to 68%." },
  { goal: 5, title: "Gender equality", color: "#FF3A21", contribution: "4,310 women in savings groups; women hold 52% of water committee seats." },
  { goal: 8, title: "Decent work & economic growth", color: "#A21942", contribution: "Member incomes up 58% after two years; 14 cooperative processing centres." },
  { goal: 1, title: "No poverty", color: "#E5243B", contribution: "₦96m in revolving loans disbursed to women since 2018." },
  { goal: 4, title: "Quality education", color: "#C5192D", contribution: "Pupils in WASH-equipped schools miss fewer days (−23% absenteeism among girls)." },
  { goal: 17, title: "Partnerships for the goals", color: "#19486A", contribution: "MoUs with 3 State PHC agencies and 2 RUWASSAs; 8 institutional funders." },
];

export const learning = [
  { title: "What didn’t work: immunisation", text: "H3 is behind target. Outreach failed when vaccine collection depended on transport. We are now funding solar direct-drive fridges at PHCs (see Mokwa project)." },
  { title: "What didn’t work: processing equipment", text: "L4 is behind because diesel-only equipment proved too expensive to run. New centres use hybrid solar/diesel and a per-kilo user fee." },
  { title: "What we’re testing", text: "Mobile-money tariff collection for water committees in 6 communities, with an external evaluation by the University of Ibadan." },
];

export const evaluations = [
  { title: "Independent mid-term evaluation of the 2022–2026 strategy", by: "Centre for Development Evaluation, University of Ibadan", year: "2024" },
  { title: "Water-point sustainability study (64 sites)", by: "Ìrètí MEL team, externally reviewed", year: "2025" },
  { title: "VSLA income panel survey, rounds 1–3", by: "Kanem Development Fund learning partner", year: "2025" },
];
