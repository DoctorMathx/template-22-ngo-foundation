import type { Campaign } from "@/lib/types";
import { photos } from "./photos";

export const campaigns: Campaign[] = [
  {
    slug: "water-before-the-dry-season",
    title: "Water before the dry season",
    kicker: "Appeal · Clean water",
    summary:
      "Twelve communities in Oyo and Plateau lose their only water source between January and April. Help us finish 12 water points before the harmattan.",
    story: [
      "Every year, as the rains end in October, the same pattern begins. Open wells sink, streams shrink to pools, and by February women and girls in twelve of our partner communities are walking two to four kilometres for water that is often unsafe to drink.",
      "This appeal funds the last stretch of our 2026 water plan: eight solar or hand-pump boreholes and four rehabilitations of broken pumps, each with a trained, gender-balanced water committee and a maintenance account.",
      "The Northbridge Foundation will match every gift made before 15 December, up to ₦25 million — so every naira you give now does twice the work.",
    ],
    image: { src: photos.waterHands, alt: "Hands cupping clean flowing water", caption: "Every water point is tested at handover and quarterly after.", credit: "Ìrètí Foundation / field team" },
    goal: 60000000,
    raised: 41850000,
    donors: 1284,
    endDate: "2026-12-15",
    programme: "clean-water-sanitation",
    matched: "Matched ₦1-for-₦1 by the Northbridge Foundation up to ₦25m until 15 December.",
    updates: [
      { date: "2026-10-21", title: "Drilling begins at Kopmur, Bokkos", text: "The rig reached site on Tuesday. The first of two hand-pump boreholes in Mushere ward is at 42m." },
      { date: "2026-10-02", title: "Match fund confirmed", text: "The Northbridge Foundation has agreed to match all gifts to this appeal up to ₦25m until 15 December." },
      { date: "2026-09-18", title: "Bokkos fully funded", text: "Thanks to the Plateau Diaspora Circle and 96 individual donors, both Bokkos boreholes are now fully funded." },
      { date: "2026-09-01", title: "Appeal launched", text: "We launched with surveys complete in 9 of 12 communities." },
    ],
    recentDonors: [
      { name: "Adébáyọ̀ O.", amount: 50000, when: "2 hours ago", note: "For my grandmother’s town." },
      { name: "Anonymous", amount: 250000, when: "5 hours ago" },
      { name: "Chiamaka & Tobi", amount: 25000, when: "Yesterday", note: "In memory of Mama Ìyábọ̀." },
      { name: "Nnamdi E. (London)", amount: 155000, when: "Yesterday" },
      { name: "Hauwa B.", amount: 10000, when: "2 days ago" },
      { name: "Lagos Rotaract Club", amount: 380000, when: "3 days ago" },
    ],
    uses: [
      { label: "Drilling, pumps & tanks (8 new water points)", amount: 42400000 },
      { label: "Rehabilitation of 4 broken pumps", amount: 6200000 },
      { label: "Water committees: training & toolkits", amount: 4300000 },
      { label: "Water-quality testing (year one)", amount: 2300000 },
      { label: "Project management, M&E & audit", amount: 4800000 },
    ],
  },
  {
    slug: "safe-births-niger-state",
    title: "Safe births in Niger State",
    kicker: "Appeal · Maternal health",
    summary:
      "Help us open the Wadata maternity ward in Bida and equip two more labour rooms — so women can give birth with light, water and a trained midwife.",
    story: [
      "In the PHCs we work with in Niger State, the commonest reason women give for giving birth at home is not distance. It is that the clinic has no light at night, no water and no bed.",
      "This appeal completes the Wadata maternity ward and equips the labour rooms at Mokwa Town and Lemu PHCs, including solar power, delivery beds, newborn resuscitation kits and refresher training for midwives.",
    ],
    image: { src: photos.vaccination, alt: "A health worker vaccinating an older woman", caption: "Outreach day at a partner PHC, Niger State.", credit: "Ìrètí Foundation / M. Abubakar" },
    goal: 45000000,
    raised: 26700000,
    donors: 612,
    endDate: "2027-03-08",
    programme: "maternal-child-health",
    updates: [
      { date: "2026-10-12", title: "Roof completed at Wadata", text: "Structural works are 60% complete. The new roof went on ahead of schedule." },
      { date: "2026-09-15", title: "Works begin", text: "The contractor mobilised to site with the Niger State PHCDA engineer present." },
      { date: "2026-05-02", title: "MoU signed", text: "The State committed to two new midwife posts at Wadata." },
    ],
    recentDonors: [
      { name: "Dr. Aisha M.", amount: 100000, when: "Today" },
      { name: "Anonymous", amount: 20000, when: "Yesterday" },
      { name: "The Okonkwo family", amount: 75000, when: "3 days ago", note: "For every mother who deserves a safe birth." },
      { name: "Halima S. (Abuja)", amount: 15000, when: "4 days ago" },
    ],
    uses: [
      { label: "Wadata maternity ward completion", amount: 27500000 },
      { label: "Labour-room equipment: Mokwa & Lemu", amount: 9400000 },
      { label: "EmONC midwife training", amount: 3600000 },
      { label: "Project management, M&E & audit", amount: 4500000 },
    ],
  },
  {
    slug: "her-cooperative-fund",
    title: "Her Cooperative Fund",
    kicker: "Appeal · Livelihoods",
    summary:
      "A revolving loan fund for 1,000 women in 40 savings cooperatives. Every naira is lent, repaid and lent again.",
    story: [
      "Our women’s savings groups repay 97.4% of loans on time. What they lack is capital: most cooperatives have a waiting list of members ready to borrow.",
      "Her Cooperative Fund seeds revolving loan funds in 40 cooperatives across Kwara, Oyo and Plateau. Loans of ₦30,000–₦150,000 are approved by the members themselves, and repayments stay in the group.",
    ],
    image: { src: photos.fieldRows, alt: "Rows of green crops stretching to the horizon", caption: "A cooperative member’s farm, Kwara State.", credit: "Ìrètí Foundation / field team" },
    goal: 30000000,
    raised: 12450000,
    donors: 388,
    endDate: "2027-06-30",
    programme: "womens-livelihoods",
    updates: [
      { date: "2026-10-08", title: "First 10 cooperatives seeded", text: "₦8.2m disbursed to 10 cooperatives; 214 women received first loans." },
      { date: "2026-07-01", title: "Fund launched", text: "Launched at the Share Women’s Market Day with the Kwara State Ministry of Women Affairs." },
    ],
    recentDonors: [
      { name: "Funmilayo A.", amount: 30000, when: "Today", note: "From one market woman’s daughter." },
      { name: "Anonymous", amount: 50000, when: "2 days ago" },
      { name: "Ngozi K. (Houston)", amount: 77500, when: "5 days ago" },
    ],
    uses: [
      { label: "Revolving loan capital (40 cooperatives)", amount: 22000000 },
      { label: "Business & bookkeeping training", amount: 4200000 },
      { label: "Cooperative registration & audit support", amount: 1500000 },
      { label: "Project management & M&E", amount: 2300000 },
    ],
  },
];

export const getCampaign = (slug: string) => campaigns.find((c) => c.slug === slug);
