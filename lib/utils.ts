import { siteConfig, type CurrencyCode } from "./site-config";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Unsplash helper — swap the id for your own photography. */
export const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function formatNaira(value: number) {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

/** Compact naira for big figures: ₦612.4m, ₦28.5m, ₦850k */
export function formatNairaShort(value: number) {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}bn`;
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  if (value >= 1_000) return `₦${Math.round(value / 1_000)}k`;
  return formatNaira(value);
}

export const currencySymbol: Record<CurrencyCode, string> = { NGN: "₦", USD: "$", GBP: "£" };

export function formatMoney(value: number, currency: CurrencyCode = "NGN") {
  if (currency === "NGN") return formatNaira(value);
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return `${currencySymbol[currency]}${value.toLocaleString("en-GB", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

export const formatPrice = formatNaira;

export function toNaira(value: number, currency: CurrencyCode) {
  return Math.round(value * siteConfig.donation.rates[currency]);
}

export function fromNaira(value: number, currency: CurrencyCode) {
  return value / siteConfig.donation.rates[currency];
}

export function pct(part: number, whole: number) {
  if (!whole) return 0;
  return Math.min(100, Math.round((part / whole) * 100));
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Date(iso + (iso.length === 10 ? "T12:00:00" : "")).toLocaleDateString("en-GB", opts);
}

export function daysLeft(endIso: string, fromIso: string = siteConfig.asOf) {
  const ms = new Date(endIso + "T23:59:59").getTime() - new Date(fromIso + "T00:00:00").getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function impactFor(nairaAmount: number) {
  const ladder = siteConfig.donation.impact;
  let line: string = ladder[0].text;
  for (const step of ladder) if (nairaAmount >= step.min) line = step.text;
  return line;
}

export function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

export function donateHref(params: Record<string, string | number | undefined>) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") q.set(k, String(v));
  const s = q.toString();
  return s ? `/donate?${s}` : "/donate";
}
