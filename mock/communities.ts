import type { Community } from "@/lib/types";
import { photos } from "./photos";

// Progress values are percentages (or counts where unit says so) from our baseline and latest survey.
export const communities: Community[] = [
  {
    slug: "igbo-ora",
    name: "Igbo-Ora",
    lga: "Ibarapa Central",
    state: "Oyo",
    population: 38500,
    households: 6900,
    since: 2017,
    image: { src: photos.waterChild, alt: "Child playing in a spray of water", caption: "Igbo-Ora, Oyo State.", credit: "Ìrètí Foundation" },
    summary:
      "Known as the ‘twins capital of the world’, Igbo-Ora is a farming town where the older quarters still depend on hand-dug wells that fail every dry season.",
    needs: [
      { label: "Households with safe water within 500m (baseline)", value: "34%" },
      { label: "Dry-season water walk", value: "2.4km" },
      { label: "Primary schools without a water point", value: "5 of 9" },
    ],
    progress: [
      { label: "Households with safe water", before: 34, now: 71, target: 90, unit: "%" },
      { label: "Schools with water & sanitation", before: 44, now: 78, target: 100, unit: "%" },
      { label: "Water points functioning", before: 0, now: 94, target: 95, unit: "%" },
    ],
    voice: { quote: "We used to plan the whole day around water. Now we plan it around the farm and the children’s lessons.", name: "Mrs. Rónkẹ́ Adéyẹmí", role: "Chair, Oke-Ola Water Committee" },
    programmes: ["clean-water-sanitation", "womens-livelihoods"],
  },
  {
    slug: "kishi",
    name: "Kishi",
    lga: "Irepo",
    state: "Oyo",
    population: 52000,
    households: 9100,
    since: 2019,
    image: { src: photos.classroomGreen, alt: "Pupils in green uniforms in a classroom", caption: "Kishi, Oyo State.", credit: "Ìrètí Foundation" },
    summary:
      "A savannah town on the Oyo–Kwara border with fast-growing schools and badly overstretched sanitation.",
    needs: [
      { label: "Pupils per working toilet (baseline)", value: "312" },
      { label: "Schools with handwashing stations", value: "2 of 14" },
      { label: "Girls missing school during menstruation", value: "1 in 3" },
    ],
    progress: [
      { label: "Schools with handwashing stations", before: 14, now: 57, target: 100, unit: "%" },
      { label: "Schools with separate girls’ toilets", before: 21, now: 43, target: 100, unit: "%" },
      { label: "Households with a latrine", before: 48, now: 66, target: 85, unit: "%" },
    ],
    voice: { quote: "When the girls have privacy and water, they stay in class. It is as simple and as hard as that.", name: "Mr. Akin Olálékan", role: "Principal, Community High School" },
    programmes: ["clean-water-sanitation"],
  },
  {
    slug: "share",
    name: "Share",
    lga: "Ifelodun",
    state: "Kwara",
    population: 41200,
    households: 7300,
    since: 2018,
    image: { src: photos.farmers, alt: "Farmers in a green field", caption: "Share, Kwara State.", credit: "Ìrètí Foundation" },
    summary:
      "An agricultural centre in the shea belt of Kwara State, where women process most of the harvest by hand.",
    needs: [
      { label: "Women with access to formal credit (baseline)", value: "6%" },
      { label: "Share of shea sold as raw nuts", value: "82%" },
      { label: "Average monthly income, women processors", value: "₦18,500" },
    ],
    progress: [
      { label: "Women in savings groups", before: 0, now: 1840, target: 2500, unit: "women" },
      { label: "Members with an active loan", before: 0, now: 61, target: 70, unit: "%" },
      { label: "Shea sold processed (as butter)", before: 18, now: 36, target: 70, unit: "%" },
    ],
    voice: { quote: "The group gave me a loan when no bank would. I paid it back in five months and I have two girls helping me now.", name: "Alhaja Sẹ̀kínát Bello", role: "Treasurer, Ìfẹ́ Ọlọ́run Women’s Cooperative" },
    programmes: ["womens-livelihoods", "clean-water-sanitation"],
  },
  {
    slug: "bida",
    name: "Bida",
    lga: "Bida",
    state: "Niger",
    population: 266000,
    households: 41000,
    since: 2016,
    image: { src: photos.healthCheck, alt: "Health worker checking a woman’s blood pressure", caption: "Bida, Niger State.", credit: "Ìrètí Foundation" },
    summary:
      "The historic Nupe capital, with a large rural catchment where most women still give birth at home.",
    needs: [
      { label: "Births with a skilled attendant (baseline)", value: "29%" },
      { label: "PHCs with power at night", value: "3 of 17" },
      { label: "Women with 4+ antenatal visits", value: "38%" },
    ],
    progress: [
      { label: "Births with a skilled attendant", before: 29, now: 64, target: 75, unit: "%" },
      { label: "Partner PHCs with 24-hour power", before: 18, now: 82, target: 100, unit: "%" },
      { label: "Women with 4+ antenatal visits", before: 38, now: 61, target: 70, unit: "%" },
    ],
    voice: { quote: "A labour room with light is a labour room women trust. They come now, even at night.", name: "Hajiya Fatima Ndagi", role: "Midwife-in-charge, Wadata PHC" },
    programmes: ["maternal-child-health"],
  },
  {
    slug: "mokwa",
    name: "Mokwa",
    lga: "Mokwa",
    state: "Niger",
    population: 74000,
    households: 12600,
    since: 2021,
    image: { src: photos.vaccination, alt: "Vaccination at an outreach day", caption: "Mokwa, Niger State.", credit: "Ìrètí Foundation" },
    summary:
      "A river-trading town on the Kaduna river, recovering from the 2025 flood, with scattered settlements far from vaccine storage.",
    needs: [
      { label: "Children fully immunised by age one (baseline)", value: "41%" },
      { label: "Distance to nearest vaccine store", value: "70km" },
      { label: "Settlements without regular outreach", value: "6" },
    ],
    progress: [
      { label: "Children fully immunised by age one", before: 41, now: 55, target: 80, unit: "%" },
      { label: "Outreach sessions held as planned", before: 35, now: 62, target: 90, unit: "%" },
      { label: "Households reached after the flood", before: 0, now: 1240, target: 1500, unit: "households" },
    ],
    voice: { quote: "When there is no fridge, there is no vaccine day. When there is no vaccine day, mothers stop coming.", name: "Mr. Yakubu Gana", role: "LGA Immunisation Officer" },
    programmes: ["maternal-child-health", "clean-water-sanitation"],
  },
  {
    slug: "bokkos",
    name: "Bokkos",
    lga: "Bokkos",
    state: "Plateau",
    population: 29800,
    households: 5200,
    since: 2020,
    image: { src: photos.childrenGroup, alt: "A group of smiling children", caption: "Bokkos, Plateau State.", credit: "Ìrètí Foundation" },
    summary:
      "Upland farming hamlets on the Jos Plateau, where water is shared with livestock and cholera outbreaks recur.",
    needs: [
      { label: "Households using surface water (baseline)", value: "61%" },
      { label: "Cholera cases recorded, 2024", value: "143" },
      { label: "Hamlets without a protected source", value: "11 of 19" },
    ],
    progress: [
      { label: "Households with safe water", before: 39, now: 63, target: 85, unit: "%" },
      { label: "Hamlets with a protected source", before: 42, now: 68, target: 100, unit: "%" },
      { label: "Women in savings groups", before: 0, now: 420, target: 600, unit: "women" },
    ],
    voice: { quote: "Since the pump at Daffo, not one child in our compound has had the running stomach.", name: "Mrs. Lydia Dakwak", role: "Community health volunteer" },
    programmes: ["clean-water-sanitation", "womens-livelihoods"],
  },
];

export const getCommunity = (slug: string) => communities.find((c) => c.slug === slug);
