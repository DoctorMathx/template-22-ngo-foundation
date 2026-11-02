import type { Programme, ProgrammeSlug } from "@/lib/types";
import { photos } from "./photos";

export const programmes: Programme[] = [
  {
    slug: "clean-water-sanitation",
    number: "01",
    title: "Clean water & sanitation",
    short: "Solar and hand-pump boreholes, school sanitation blocks and community-run water committees.",
    summary:
      "We drill, equip and hand over boreholes that communities own and maintain — then we keep testing the water and the committees for five years.",
    body: [
      "In the rural wards where we work, more than half of households still walk over 30 minutes to collect water, most of it from open wells and seasonal streams. Diarrhoeal disease peaks every dry season, and girls lose school days to the water run.",
      "Every water point we build starts with a hydrogeological survey and a community agreement. A water committee — at least half of its members women — is trained in pump repair, bookkeeping and tariff-setting, and a small monthly user levy goes into a maintenance account the committee controls.",
      "We test water quality at handover and then quarterly, publish functionality rates every year, and return for repairs within 14 days of any reported breakdown. A borehole is only counted as a result while it is still working.",
    ],
    image: { src: photos.waterHands, alt: "Cupped hands under a stream of clean water", caption: "Clean water at a solar borehole tap-stand.", credit: "Ìrètí Foundation / field team" },
    approach: [
      { title: "Survey & agree", text: "Hydro-geological survey, site selection with the community, and a signed community agreement." },
      { title: "Build to standard", text: "Drilling to Federal Ministry of Water Resources specification, with solar or hand-pump systems." },
      { title: "Train the committee", text: "A 7-person water committee trained in repair, tariffs and record-keeping — at least 50% women." },
      { title: "Monitor for five years", text: "Quarterly water-quality tests, functionality checks and a 14-day repair promise." },
    ],
    stats: [
      { value: "64", label: "water points built since 2014" },
      { value: "92%", label: "still functioning (2025 audit)" },
      { value: "71,400", label: "people with safe water within 500m" },
    ],
    budgetShare: 42,
    sdgs: [6, 3, 4],
    impactLine: "₦1,000,000 funds a hand-pump borehole and its first year of upkeep.",
  },
  {
    slug: "maternal-child-health",
    number: "02",
    title: "Maternal & child health",
    short: "Refurbished primary health centres, trained midwives, cold chain and community health outreach.",
    summary:
      "We work alongside State Primary Health Care Boards to make rural PHCs places where women choose to give birth — equipped, staffed and open at night.",
    body: [
      "Nigeria carries one of the world’s highest burdens of maternal death, and most of it is concentrated in rural communities far from a functioning facility. In the PHCs we partner with, the most common problems are simple: no light at night, no running water, no delivery kits, no cold chain for vaccines.",
      "We refurbish labour rooms and maternity wards, install solar power and water, supply essential equipment, and fund refresher training in emergency obstetric and newborn care for midwives and community health extension workers (CHEWs).",
      "Every refurbishment is co-signed with the State PHC Board, which commits to staffing. We track skilled birth attendance, antenatal visits and immunisation coverage from facility registers, verified quarterly by our M&E team.",
    ],
    image: { src: photos.vaccination, alt: "A health worker administering a vaccine to an older woman", caption: "Outreach immunisation day, Niger State.", credit: "Ìrètí Foundation / M. Abubakar" },
    approach: [
      { title: "Assess with the State", text: "Joint facility assessment with the State Primary Health Care Board." },
      { title: "Refurbish & equip", text: "Solar power, water, labour-room equipment and a vaccine cold chain." },
      { title: "Train the team", text: "Emergency obstetric & newborn care refresher training for midwives and CHEWs." },
      { title: "Bring women in", text: "Community health volunteers and transport vouchers for antenatal and delivery." },
    ],
    stats: [
      { value: "11", label: "PHCs refurbished and equipped" },
      { value: "68%", label: "births with a skilled attendant (from 31%)" },
      { value: "9,860", label: "antenatal visits in 2025" },
    ],
    budgetShare: 36,
    sdgs: [3, 5, 6],
    impactLine: "₦250,000 equips a labour room with a delivery bed and resuscitation kit.",
  },
  {
    slug: "womens-livelihoods",
    number: "03",
    title: "Women’s livelihoods",
    short: "Savings cooperatives, micro-loans, shea and cassava processing, and business training for rural women.",
    summary:
      "We help women form and run savings cooperatives, then add business training, revolving micro-loans and shared processing equipment.",
    body: [
      "Women in our partner communities do most of the farming, processing and trading — but rarely own the equipment or have access to credit. Shea butter, cassava and locust beans are processed by hand, and most value is captured further up the chain.",
      "We start with Village Savings and Loan Associations (VSLAs): 15–25 women who save weekly and lend to each other. After a full cycle, we add business training and a revolving loan fund held by the cooperative, and invest in shared processing equipment owned by the group.",
      "Repayment, savings and income are recorded at every meeting and audited annually. Loan repayments return to the cooperative fund — so every naira is lent again.",
    ],
    image: { src: photos.market, alt: "Fresh vegetables — carrots, peppers and greens — at a market stall", caption: "Produce from a cooperative member’s stall, Share market.", credit: "Ìrètí Foundation / field team" },
    approach: [
      { title: "Save together", text: "Women form VSLAs and complete a 9–12 month savings cycle." },
      { title: "Learn the business", text: "Bookkeeping, pricing, quality and market access training." },
      { title: "Borrow & grow", text: "A revolving loan fund held and managed by the cooperative." },
      { title: "Process & sell", text: "Shared processing equipment that adds value locally." },
    ],
    stats: [
      { value: "186", label: "women’s savings groups formed" },
      { value: "97.4%", label: "micro-loan repayment rate" },
      { value: "+58%", label: "average member income after two years" },
    ],
    budgetShare: 22,
    sdgs: [5, 8, 1],
    impactLine: "₦50,000 funds a 3-month starter loan for one woman.",
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
export const programmeTitle = (slug: ProgrammeSlug) => getProgramme(slug)?.title ?? slug;
