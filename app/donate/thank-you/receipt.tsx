"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, Link2, Mail, Printer } from "lucide-react";
import { siteConfig, type CurrencyCode } from "@/lib/site-config";
import { formatDate, formatMoney, formatNaira, toNaira } from "@/lib/utils";
import { designationLabel } from "../designations";

const FREQ_LABEL: Record<string, string> = { once: "One-time", monthly: "Monthly", annual: "Annual" };
const METHOD_LABEL: Record<string, string> = { card: "Card", bank: "Bank transfer", ussd: "USSD" };

function num(v: string | null) {
  const n = Number(v);
  return v && Number.isFinite(n) && n > 0 ? n : null;
}

export function Receipt() {
  const p = useSearchParams();
  const [copied, setCopied] = useState(false);
  const amount = num(p.get("amount"));
  const currencyParam = (p.get("currency") ?? "NGN").toUpperCase();
  const currency: CurrencyCode = currencyParam === "USD" || currencyParam === "GBP" ? currencyParam : "NGN";
  const ref = p.get("ref") ?? "IRT-PENDING";
  const frequency = p.get("frequency") ?? "once";
  const designation = designationLabel(p.get("designation") ?? "general");
  const name = p.get("name")?.trim() || "Friend";
  const firstName = name === "Anonymous" ? "friend" : name.split(" ")[0];
  const date = p.get("d") && /^\d{4}-\d{2}-\d{2}$/.test(p.get("d")!) ? p.get("d")! : siteConfig.asOf;
  const method = METHOD_LABEL[p.get("method") ?? "card"] ?? "Card";
  const tribute = p.get("tribute");
  const bankref = p.get("bankref");
  const fee = num(p.get("fee"));
  const pending = p.get("method") === "bank" || p.get("method") === "ussd";

  const shareText = `I just gave to ${siteConfig.brand.name} — they publish every result and every naira. Join me:`;
  const shareUrl = `https://${siteConfig.brand.domain}/donate`;

  if (!amount) {
    return (
      <section className="container-x py-24 md:py-32 max-w-2xl">
        <p className="eyebrow mb-4">Receipt</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight">We couldn’t find a gift to show.</h1>
        <p className="lede mt-6">This page shows a receipt after you complete a donation. If you’ve just given and see this message, please check your email for a confirmation, or contact us.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/donate" className="btn btn-primary">Make a donation</Link>
          <Link href="/contact" className="btn btn-outline">Contact us</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-paper">
      <section className="container-x pt-14 pb-10 md:pt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest text-paper mb-8"><Check className="w-6 h-6" aria-hidden /></span>
          <p className="eyebrow mb-4">{pending ? "Pledge received" : "Gift received"}</p>
          <h1 className="font-serif font-light text-[2.8rem] md:text-[4.2rem] leading-[1.0]">E ṣé, <em className="text-forest">{firstName}.</em></h1>
          <p className="lede mt-6">
            Thank you. Your {FREQ_LABEL[frequency]?.toLowerCase() ?? ""} gift of <b className="text-ink">{formatMoney(amount, currency)}</b> will go to <b className="text-ink">{designation.replace(/^(Appeal|Project|Programme): /, "")}</b>.
            {pending && " We’ll confirm by email as soon as your transfer arrives — usually within one working day."}
          </p>
          <p className="mt-4 text-sm text-muted">A formal receipt has been sent to {p.get("email") || "your email address"}.</p>

          <div className="mt-10">
            <p className="eyebrow mb-3">Share why you gave</p>
            <div className="flex flex-wrap gap-2">
              <a className="btn btn-outline btn-sm" href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a className="btn btn-outline btn-sm" href={`https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">X</a>
              <a className="btn btn-outline btn-sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn btn-outline btn-sm" href={`mailto:?subject=${encodeURIComponent("I gave to Ìrètí Foundation")}&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}><Mail className="w-4 h-4" aria-hidden /> Email</a>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                <Link2 className="w-4 h-4" aria-hidden /> <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Receipt */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="bg-card border border-ink p-7 md:p-8 paper-grain">
            <div className="flex items-start justify-between gap-4 border-b border-ink pb-4">
              <div>
                <p className="font-serif italic text-2xl text-forest leading-none">Ìrètí</p>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-muted mt-1">Foundation</p>
              </div>
              <div className="text-right">
                <p className="eyebrow">Donation receipt</p>
                <p className="font-semibold tabular mt-1">{ref}</p>
              </div>
            </div>
            <dl className="py-4 space-y-2.5 text-sm">
              {[
                ["Date", formatDate(date)],
                ["Donor", name],
                ["Frequency", FREQ_LABEL[frequency] ?? "One-time"],
                ["Designation", designation],
                ["Payment method", method],
                ...(bankref ? [["Transfer reference", bankref]] : []),
                ...(tribute ? [["Dedication", tribute]] : []),
                ...(fee ? [["Incl. processing fee covered", formatMoney(fee, currency)]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-ink pt-4 flex items-baseline justify-between">
              <span className="font-semibold">Amount</span>
              <span className="font-serif text-3xl tabular">{formatMoney(amount, currency)}</span>
            </div>
            {currency !== "NGN" && <p className="text-right text-[0.78rem] text-muted mt-1">≈ {formatNaira(toNaira(amount, currency))} at indicative rate</p>}
            <p className="mt-6 text-[0.75rem] leading-relaxed text-muted border-t border-rule pt-4">
              {siteConfig.org.legalName}. {siteConfig.donation.receiptNote}
            </p>
            <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm mt-5"><Printer className="w-4 h-4" aria-hidden /> Print receipt</button>
          </div>
        </div>
      </section>

      <section className="container-x py-16 border-t border-rule">
        <div className="flex items-baseline gap-3 mb-10"><span className="section-num">Next</span><span className="eyebrow">What happens now</span></div>
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { t: "Within 2 working days", d: "Your formal receipt arrives by email, ready for your records." },
            { t: "Within 3 months", d: "A field update on the project or programme your gift supports, with photos and numbers." },
            { t: "Every April", d: "Our audited accounts and annual report — so you can see exactly how gifts were spent." },
          ].map((s, i) => (
            <li key={s.t} className="border-t border-ink pt-5">
              <p className="font-serif italic text-terracotta text-xl mb-2">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-serif text-2xl mb-2">{s.t}</h2>
              <p className="text-ink-soft leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-3">
          {frequency === "once" && <Link href="/giving-circle" className="btn btn-primary">Make it monthly — join Friends of Ìrètí</Link>}
          <Link href="/projects" className="btn btn-outline">See projects you can fund</Link>
          <Link href="/results" className="btn btn-outline">How we measure results</Link>
        </div>
      </section>
    </div>
  );
}
