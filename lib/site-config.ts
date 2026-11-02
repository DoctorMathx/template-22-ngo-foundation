// Central config — change these values (or swap the whole file) and the template rebrands.
// Organisation details, donation settings and homepage modules all live here.

export type HomeModule =
  | "hero"
  | "impactNumbers"
  | "programmes"
  | "projects"
  | "communities"
  | "results"
  | "story"
  | "campaign"
  | "funders"
  | "givingCircle"
  | "transparency"
  | "events"
  | "newsletter"
  | "finalCta";

export type CurrencyCode = "NGN" | "USD" | "GBP";

export const siteConfig = {
  brand: {
    name: "Ìrètí Foundation",
    shortName: "Ìrètí",
    plainName: "Ireti Foundation",
    meaning: "Ìrètí is Yoruba for “hope”.",
    tagline: "Water, health and livelihoods — delivered, measured and accounted for.",
    description:
      "Ìrètí Foundation is a Nigerian community development foundation delivering clean water, maternal and child health, and women’s livelihoods in rural Oyo, Kwara, Niger and Plateau states.",
    domain: "iretifoundation.org",
    founded: 2014,
  },

  org: {
    legalName: "Ìrètí Community Development Foundation (Incorporated Trustees)",
    registrationNote: "Registered with the Corporate Affairs Commission under Part F, CAMA 2020",
    address: "14 Bodija Estate Road, off Awolowo Avenue, Ibadan, Oyo State",
    fieldOffices: ["Bida, Niger State", "Ilorin, Kwara State", "Jos, Plateau State"],
    email: "hello@iretifoundation.org",
    partnershipsEmail: "partnerships@iretifoundation.org",
    legacyEmail: "legacy@iretifoundation.org",
    phone: "+234 803 412 7700",
    whatsapp: "+234 809 412 7701",
    whatsappLink: "https://wa.me/2348094127701",
    hours: "Mon – Fri, 8:30am – 5:00pm WAT",
    auditor: "Adekunle, Okafor & Co. (Chartered Accountants)",
    social: {
      linkedin: "https://linkedin.com/company/iretifoundation",
      instagram: "https://instagram.com/iretifoundation",
      x: "https://x.com/iretifoundation",
      youtube: "https://youtube.com/@iretifoundation",
    },
  },

  // As-of date used for “days left” and report timestamps so static builds stay deterministic.
  asOf: "2026-10-28",

  donation: {
    processingFeeRate: 0.015,
    minimum: { NGN: 1000, USD: 5, GBP: 5 } as Record<CurrencyCode, number>,
    // Fixed indicative rates for display only (₦ per unit). Update when you publish new guidance.
    rates: { NGN: 1, USD: 1550, GBP: 2050 } as Record<CurrencyCode, number>,
    ratesNote: "Indicative rates: $1 = ₦1,550 · £1 = ₦2,050. Your card issuer sets the final rate.",
    presets: {
      NGN: [5000, 10000, 25000, 50000, 100000],
      USD: [10, 25, 50, 100, 250],
      GBP: [10, 20, 50, 100, 200],
    } as Record<CurrencyCode, number[]>,
    // Impact ladder in naira — the donate page picks the highest line the gift reaches.
    impact: [
      { min: 1, text: "helps keep a borehole maintained and running for a community" },
      { min: 5000, text: "buys hygiene kits for 4 school pupils for a full term" },
      { min: 10000, text: "provides a clean delivery kit for 5 mothers at a primary health centre" },
      { min: 25000, text: "trains one community water committee member in pump repair" },
      { min: 50000, text: "funds a 3-month starter loan for one woman in a cooperative" },
      { min: 100000, text: "delivers safe water to 40 people for a year via a solar borehole" },
      { min: 250000, text: "equips a PHC labour room with a delivery bed and resuscitation kit" },
      { min: 1000000, text: "fully funds a community hand-pump borehole and its first year of upkeep" },
    ],
    bank: {
      bankName: "Zenith Bank Plc",
      accountName: "Ireti Community Development Foundation",
      accountNumber: "1014 728 365",
      sortCode: "057150012",
    },
    domiciliary: {
      bankName: "Zenith Bank Plc (Domiciliary)",
      accountName: "Ireti Community Development Foundation",
      usd: "5072 118 904",
      gbp: "5072 118 911",
      swift: "ZEIBNGLA",
    },
    ussd: [
      { bank: "Zenith Bank", code: "*966*{amount}*1014728365#" },
      { bank: "GTBank", code: "*737*2*{amount}*1014728365#" },
      { bank: "Access Bank", code: "*901*{amount}*1014728365#" },
    ],
    receiptNote:
      "Ìrètí Foundation is a registered not-for-profit. Gifts may qualify for deduction under Section 25 of the Companies Income Tax Act (for corporate donors). A formal receipt is emailed within 2 working days.",
  },

  home: {
    // Reorder or remove items to change the homepage. Each key maps to a component in app/page.tsx.
    modules: [
      "hero",
      "impactNumbers",
      "programmes",
      "projects",
      "communities",
      "results",
      "story",
      "campaign",
      "funders",
      "givingCircle",
      "transparency",
      "events",
      "newsletter",
      "finalCta",
    ] as HomeModule[],
    featuredCampaign: "water-before-the-dry-season",
    featuredStory: "the-pump-that-mama-ronke-fixed",
  },
} as const;
