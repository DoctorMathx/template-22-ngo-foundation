// Friends of Ìrètí monthly giving circle, legacy giving and diaspora giving content.

export const circleTiers = [
  {
    name: "Friend",
    monthly: 5000,
    usd: 5,
    gbp: 4,
    impact: "Keeps one community water point tested and maintained every quarter.",
    benefits: ["Quarterly field letter from a community we serve", "Annual impact statement", "Invitation to the online supporters’ call"],
  },
  {
    name: "Steward",
    monthly: 15000,
    usd: 15,
    gbp: 12,
    impact: "Trains a midwife in emergency obstetric care every year.",
    benefits: ["Everything in Friend", "Your name in the Annual Report (optional)", "Live call from a project site twice a year"],
    featured: true,
  },
  {
    name: "Guardian",
    monthly: 50000,
    usd: 40,
    gbp: 30,
    impact: "Funds a woman’s starter loan every month — repaid and re-lent.",
    benefits: ["Everything in Steward", "Choose the programme your gift supports", "Invitation to the annual funders’ breakfast"],
  },
  {
    name: "Patron",
    monthly: 150000,
    usd: 100,
    gbp: 80,
    impact: "Delivers a community borehole every year, with your name on the handover report.",
    benefits: ["Everything in Guardian", "Annual site visit with our Executive Director", "Personal quarterly report on your borehole"],
  },
];

export const circleStats = [
  { value: "1,960", label: "members in 14 countries" },
  { value: "₦11.2m", label: "given every month" },
  { value: "38%", label: "of members live outside Nigeria" },
];

export const willWording = [
  {
    type: "Residuary gift",
    note: "A share of what remains after family and friends are provided for. Keeps its value over time.",
    text: "I give [ ]% of the residue of my estate to Ìrètí Community Development Foundation (Incorporated Trustees), [registration number], of 14 Bodija Estate Road, Ibadan, Oyo State, Nigeria, for its general charitable purposes, and I declare that the receipt of its Treasurer or other authorised officer shall be a sufficient discharge to my executors.",
  },
  {
    type: "Pecuniary gift",
    note: "A fixed sum of money.",
    text: "I give the sum of ₦[amount in words and figures] to Ìrètí Community Development Foundation (Incorporated Trustees), [registration number], for its general charitable purposes, and I declare that the receipt of its Treasurer or other authorised officer shall be a sufficient discharge to my executors.",
  },
  {
    type: "Specific gift",
    note: "A named asset such as land, shares or property.",
    text: "I give my [description of asset] to Ìrètí Community Development Foundation (Incorporated Trustees), [registration number], for its general charitable purposes.",
  },
];

export const legacySteps = [
  { title: "Talk to your family", text: "Most legacy gifts are made after loved ones are provided for." },
  { title: "Speak to a solicitor", text: "A will made with a legal practitioner (and, in Nigeria, filed at the Probate Registry) is the surest way to make your wishes clear." },
  { title: "Use our wording", text: "Give your solicitor our full legal name and address below; we’ll confirm our registration number on request." },
  { title: "Let us know — if you’d like", text: "You never have to tell us. But if you do, we can thank you, and talk about where your gift could do the most good." },
];

export const diasporaWays = [
  { title: "Give by card in USD or GBP", text: "Switch the currency on the donate page. We show the naira equivalent so you know exactly what reaches the field." },
  { title: "Domiciliary transfer", text: "Wire directly to our USD or GBP domiciliary account at Zenith Bank — details on the donate page under Bank transfer." },
  { title: "Friends of Ìrètí chapters", text: "Volunteer-led supporter groups in London, Houston and Toronto meet quarterly and fund named projects together." },
  { title: "Fund your hometown", text: "Choose a community or project by name. Many of our diaspora donors fund water points in the towns their parents came from." },
];
