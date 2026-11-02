import type { Person } from "@/lib/types";
import { portraits } from "./photos";

export const team: Person[] = [
  { name: "Adaeze Okonkwo-Bámidélé", role: "Executive Director", photo: portraits.adaeze, bio: "Twenty years in public health and community development, including twelve with UNICEF Nigeria. Founded Ìrètí in 2014." },
  { name: "Túndé Ọláyínká", role: "Director of Programmes", photo: portraits.tunde, bio: "Water engineer (COREN-registered). Previously led rural WASH delivery for a state RUWASSA for nine years." },
  { name: "Dr. Musa Abubakar", role: "Health Programme Manager", photo: portraits.ibrahim, bio: "Public-health physician from Bida. Leads our PHC partnerships with the Niger and Kwara State PHC agencies." },
  { name: "Bọ́lá Ọlátúnjí", role: "Finance Director", photo: portraits.funmi, bio: "Chartered accountant (ICAN). Fifteen years in audit and NGO finance; owns our grant compliance and restricted-funds reporting." },
  { name: "Ifeoma Nwachukwu", role: "Head of Monitoring, Evaluation & Learning", photo: portraits.zainab, bio: "Statistician and evaluator; designed our results framework and annual functionality audit." },
  { name: "Emeka Obi", role: "Head of Partnerships", photo: portraits.emeka, bio: "Leads relationships with foundations, development agencies and corporate partners. Your first contact for grants." },
];

export const board: Person[] = [
  { name: "Prof. Olúwáṣeun Adébáyọ̀", role: "Chair of Trustees", initials: "OA", bio: "Professor of Community Medicine, University of Ibadan. Former WHO adviser on maternal health." },
  { name: "Mrs. Ngozi Eze, FCA", role: "Treasurer · Chair, Audit & Risk", initials: "NE", bio: "Former audit partner at a Big Four firm. Chairs our Audit & Risk Committee." },
  { name: "Alhaji Abdullahi Mohammed", role: "Trustee", initials: "AM", bio: "Retired Permanent Secretary, Niger State Ministry of Health." },
  { name: "Barr. Halima Usman", role: "Trustee · Chair, Safeguarding", initials: "HU", bio: "Human-rights lawyer; leads our safeguarding and whistleblowing oversight." },
  { name: "Mr. Dauda Pam", role: "Trustee", initials: "DP", bio: "Hydrogeologist and former Plateau RUWASSA General Manager." },
  { name: "Dr. Kemi Fálọlá", role: "Trustee · Diaspora representative", initials: "KF", bio: "London-based development economist; convenes Friends of Ìrètí UK." },
];
