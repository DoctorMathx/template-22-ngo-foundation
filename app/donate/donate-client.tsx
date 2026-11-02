"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Landmark, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { siteConfig, type CurrencyCode } from "@/lib/site-config";
import { cn, currencySymbol, formatMoney, formatNaira, impactFor, toNaira } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { designations, designationLabel } from "./designations";

type Frequency = "once" | "monthly" | "annual";
type Method = "card" | "bank" | "ussd";

const FREQS: { value: Frequency; label: string; hint: string }[] = [
  { value: "once", label: "One-time", hint: "A single gift" },
  { value: "monthly", label: "Monthly", hint: "Join Friends of Ìrètí" },
  { value: "annual", label: "Annual", hint: "Once a year" },
];
const CURRENCIES: CurrencyCode[] = ["NGN", "USD", "GBP"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s()-]{7,18}$/;

const freqSuffix: Record<Frequency, string> = { once: "", monthly: " / month", annual: " / year" };

function parseIntStrict(v: string | null) {
  if (!v || !/^\d+$/.test(v)) return null;
  const n = Number(v);
  return n > 0 && Number.isSafeInteger(n) ? n : null;
}

export function DonateClient() {
  const params = useSearchParams();
  // Re-mount the form when the query string changes so prefills always apply.
  return <DonateForm key={params.toString()} params={params} />;
}

function DonateForm({ params }: { params: URLSearchParams | ReturnType<typeof useSearchParams> }) {
  const router = useRouter();

  // ---------- prefill from query string ----------
  const initial = useMemo(() => {
    const freqParam = params.get("frequency");
    const frequency: Frequency = freqParam === "monthly" || freqParam === "annual" ? freqParam : "once";
    const curParam = params.get("currency")?.toUpperCase();
    const currency: CurrencyCode = curParam === "USD" || curParam === "GBP" ? curParam : "NGN";
    let designation = "general";
    const d = params.get("designation");
    const campaign = params.get("campaign");
    const project = params.get("project");
    const programme = params.get("programme");
    if (project && designations.some((x) => x.value === `project:${project}`)) designation = `project:${project}`;
    else if (campaign && designations.some((x) => x.value === `campaign:${campaign}`)) designation = `campaign:${campaign}`;
    else if (programme && designations.some((x) => x.value === `programme:${programme}`)) designation = `programme:${programme}`;
    else if (d && designations.some((x) => x.value === d)) designation = d;
    const amount = parseIntStrict(params.get("amount"));
    const amountInvalid = params.get("amount") !== null && amount === null;
    return { frequency, currency, designation, amount, amountInvalid };
  }, [params]);

  const [frequency, setFrequency] = useState<Frequency>(initial.frequency);
  const [currency, setCurrency] = useState<CurrencyCode>(initial.currency);
  const presets = siteConfig.donation.presets[currency];
  const [preset, setPreset] = useState<number | null>(
    initial.amount === null ? siteConfig.donation.presets[initial.currency][1] : presets.includes(initial.amount) ? initial.amount : null,
  );
  const [custom, setCustom] = useState<string>(initial.amount !== null && !presets.includes(initial.amount) ? String(initial.amount) : "");
  const [designation, setDesignation] = useState(initial.designation);
  const [coverFees, setCoverFees] = useState(true);
  const [tributeOn, setTributeOn] = useState(false);
  const [tributeType, setTributeType] = useState<"honour" | "memory">("honour");
  const [tributeName, setTributeName] = useState("");
  const [tributeNotify, setTributeNotify] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [donor, setDonor] = useState({ firstName: "", lastName: "", email: "", phone: "", country: "Nigeria", message: "" });
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [bankConfirmed, setBankConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>(initial.amountInvalid ? { amount: "The amount in the link wasn’t a whole number, so we’ve reset it. Please choose an amount." } : {});
  const [submitting, setSubmitting] = useState(false);

  // ---------- derived ----------
  const customValid = /^\d+$/.test(custom) && Number(custom) > 0;
  const amount = preset ?? (customValid ? Number(custom) : 0);
  const decimals = currency === "NGN" ? 0 : 2;
  const fee = coverFees && amount > 0 ? Number((amount * siteConfig.donation.processingFeeRate).toFixed(decimals)) : 0;
  const total = Number((amount + fee).toFixed(decimals));
  const totalNaira = toNaira(total, currency);
  const min = siteConfig.donation.minimum[currency];
  const effectiveMethod: Method = currency !== "NGN" && method === "ussd" ? "card" : method;
  const reference = `IRT-${(designations.find((d) => d.value === designation)?.code ?? "GEN").replace(/[^A-Z]/g, "")}-${(donor.lastName || "GIFT").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "GIFT"}`;

  function changeCurrency(next: CurrencyCode) {
    setCurrency(next);
    setPreset(siteConfig.donation.presets[next][1]);
    setCustom("");
    if (next !== "NGN" && method === "ussd") setMethod("card");
    setErrors((e) => ({ ...e, amount: "" }));
  }

  function clearError(key: string) {
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  // ---------- validation ----------
  function validate() {
    const e: Record<string, string> = {};
    if (preset === null) {
      if (!custom.trim()) e.amount = "Please choose or enter an amount.";
      else if (!/^\d+$/.test(custom.trim())) e.amount = "Please enter a whole number with no decimals, commas or symbols.";
      else if (Number(custom) <= 0) e.amount = "Amount must be greater than zero.";
    }
    if (!e.amount && amount < min) e.amount = `The minimum gift is ${formatMoney(min, currency)}.`;
    if (!e.amount && amount > 100_000_000_000) e.amount = "For gifts of this size, please contact our partnerships team.";
    if (!donor.firstName.trim()) e.firstName = "First name is required.";
    if (!donor.lastName.trim()) e.lastName = "Last name is required.";
    if (!donor.email.trim()) e.email = "Email is required for your receipt.";
    else if (!EMAIL.test(donor.email.trim())) e.email = "Enter a valid email address.";
    if (donor.phone.trim() && !PHONE.test(donor.phone.trim())) e.phone = "Enter a valid phone number.";
    if (tributeOn && !tributeName.trim()) e.tributeName = "Please enter the name of the person you’re honouring.";
    if (tributeOn && tributeNotify.trim() && !EMAIL.test(tributeNotify.trim())) e.tributeNotify = "Enter a valid email address.";
    if (effectiveMethod === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (!/^\d{13,19}$/.test(digits)) e.cardNumber = "Enter a valid card number.";
      if (!card.name.trim()) e.cardName = "Name on card is required.";
      const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      if (!m) e.cardExpiry = "Use MM/YY.";
      else {
        const mm = Number(m[1]);
        const yy = 2000 + Number(m[2]);
        const now = new Date();
        if (mm < 1 || mm > 12) e.cardExpiry = "Month must be 01–12.";
        else if (yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1)) e.cardExpiry = "This card has expired.";
      }
      if (!/^\d{3,4}$/.test(card.cvc)) e.cardCvc = "3 or 4 digits.";
    }
    if (effectiveMethod !== "card" && !bankConfirmed) e.bankConfirmed = "Please confirm you will complete the transfer using the reference shown.";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstKey = Object.keys(e).find((k) => e[k]);
    if (firstKey) {
      const el = document.getElementById(`don-${firstKey}`) ?? document.getElementById("don-amount-group");
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    const ref = `IRT-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const q = new URLSearchParams({
      ref,
      amount: String(total),
      gift: String(amount),
      fee: String(fee),
      currency,
      frequency,
      designation,
      method: effectiveMethod,
      name: anonymous ? "Anonymous" : `${donor.firstName.trim()} ${donor.lastName.trim()}`,
      email: donor.email.trim(),
      d: new Date().toISOString().slice(0, 10),
    });
    if (tributeOn) q.set("tribute", `${tributeType === "honour" ? "In honour of" : "In memory of"} ${tributeName.trim()}`);
    if (effectiveMethod !== "card") q.set("bankref", reference);
    setTimeout(() => router.push(`/donate/thank-you?${q.toString()}`), 900);
  }

  const impact = amount > 0 ? impactFor(toNaira(amount, currency) * (frequency === "monthly" ? 12 : 1)) : null;
  const groups = Array.from(new Set(designations.map((d) => d.group)));

  return (
    <div className="bg-paper">
      {/* Masthead */}
      <section className="border-b border-rule">
        <div className="container-x pt-10 pb-12 md:pt-14 md:pb-14">
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.78rem] text-muted"><Link href="/" className="hover:underline underline-offset-4">Home</Link> / <span aria-current="page">Donate</span></nav>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-end">
            <div className="md:col-span-8">
              <p className="eyebrow mb-4">Donate · secure &amp; receipted</p>
              <h1 className="font-serif font-light text-[2.6rem] md:text-[4rem] leading-[1.02]">Your gift, <em className="text-forest">accounted for.</em></h1>
              <p className="lede mt-6 max-w-2xl">₦820 of every ₦1,000 goes straight to programmes. Restricted gifts are only ever spent on what you choose — and you’ll receive a formal receipt for every gift.</p>
            </div>
            <div className="md:col-span-4">
              <fieldset>
                <legend className="eyebrow mb-3">Show amounts in</legend>
                <div className="inline-flex border border-ink" role="radiogroup" aria-label="Currency">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={currency === c}
                      onClick={() => changeCurrency(c)}
                      className={cn("min-h-[44px] min-w-[72px] px-4 text-sm font-semibold", currency === c ? "bg-ink text-paper" : "hover:bg-paper-deep")}
                    >
                      {currencySymbol[c]} {c}
                    </button>
                  ))}
                </div>
                <p className="field-hint">{siteConfig.donation.ratesNote}</p>
              </fieldset>
            </div>
          </div>
        </div>
      </section>

      <form noValidate onSubmit={onSubmit} className="container-x py-12 md:py-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-14">
          {/* 01 Frequency & amount */}
          <fieldset>
            <legend className="w-full flex items-baseline gap-3 border-t border-ink pt-4 mb-8">
              <span className="section-num">01</span><span className="font-serif text-2xl md:text-3xl">Your gift</span>
            </legend>
            <div role="radiogroup" aria-label="Frequency" className="grid grid-cols-3 border border-ink mb-8">
              {FREQS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  role="radio"
                  aria-checked={frequency === f.value}
                  onClick={() => setFrequency(f.value)}
                  className={cn("min-h-[60px] px-3 py-2 text-left border-r border-ink last:border-r-0 transition-colors", frequency === f.value ? "bg-forest text-paper" : "hover:bg-paper-deep")}
                >
                  <span className="block font-semibold text-[0.95rem]">{f.label}</span>
                  <span className={cn("block text-[0.72rem]", frequency === f.value ? "text-paper/75" : "text-muted")}>{f.hint}</span>
                </button>
              ))}
            </div>

            <div id="don-amount-group" tabIndex={-1} role="radiogroup" aria-label="Amount" aria-describedby={errors.amount ? "don-amount-err" : undefined} className="grid grid-cols-1 gap-3 sm:grid-cols-2 outline-none">
              {presets.map((p) => {
                const active = preset === p;
                return (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setPreset(p);
                      setCustom("");
                      clearError("amount");
                    }}
                    className={cn("text-left p-4 border min-h-[80px] transition-colors", active ? "border-forest bg-forest-soft ring-1 ring-[color:var(--forest)]" : "border-rule-strong bg-card hover:border-ink")}
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="font-serif text-2xl tabular">{formatMoney(p, currency)}<span className="text-sm text-muted font-sans">{freqSuffix[frequency]}</span></span>
                      {currency !== "NGN" && <span className="text-[0.75rem] text-muted tabular">≈ {formatNaira(toNaira(p, currency))}</span>}
                    </span>
                    <span className="block text-[0.82rem] text-ink-soft mt-1.5 leading-snug">{capitalise(impactFor(toNaira(p, currency)))}</span>
                  </button>
                );
              })}
              <div className={cn("p-4 border bg-card", preset === null ? "border-forest ring-1 ring-[color:var(--forest)]" : "border-rule-strong")}>
                <label htmlFor="don-amount" className="label">Other amount ({currency})</label>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl text-muted" aria-hidden>{currencySymbol[currency]}</span>
                  <input
                    id="don-amount"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={currency === "NGN" ? "e.g. 15000" : "e.g. 75"}
                    value={custom}
                    aria-invalid={errors.amount ? true : undefined}
                    aria-describedby={errors.amount ? "don-amount-err" : "don-amount-hint"}
                    onFocus={() => setPreset(null)}
                    onChange={(e) => {
                      setPreset(null);
                      setCustom(e.target.value.replace(/[,\s]/g, ""));
                      clearError("amount");
                    }}
                    className="input font-serif text-xl"
                  />
                </div>
                <p id="don-amount-hint" className="field-hint">Whole numbers only. Minimum {formatMoney(min, currency)}.</p>
              </div>
            </div>
            {errors.amount && <p id="don-amount-err" role="alert" className="field-error">{errors.amount}</p>}

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="don-designation" className="label">Where should your gift go?</label>
                <select id="don-designation" className="input" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                  {groups.map((g) => (
                    <optgroup key={g} label={g}>
                      {designations.filter((d) => d.group === g).map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </optgroup>
                  ))}
                </select>
                <p className="field-hint">Unrestricted gifts let us respond fastest — and fund the monitoring that keeps results honest.</p>
              </div>
              <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ink-soft cursor-pointer min-h-[44px]">
                <input type="checkbox" className="check" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} />
                <span>
                  <b className="text-ink">Cover the {siteConfig.donation.processingFeeRate * 100}% processing fee</b>
                  {amount > 0 && <> (+{formatMoney(fee || Number((amount * siteConfig.donation.processingFeeRate).toFixed(decimals)), currency)})</>} so 100% of your gift reaches the field.
                </span>
              </label>
            </div>
          </fieldset>

          {/* 02 Tribute */}
          <fieldset>
            <legend className="w-full flex items-baseline gap-3 border-t border-ink pt-4 mb-6">
              <span className="section-num">02</span><span className="font-serif text-2xl md:text-3xl">Dedicate your gift <span className="text-base text-muted font-sans">(optional)</span></span>
            </legend>
            <label className="flex items-start gap-3 text-sm text-ink-soft cursor-pointer min-h-[44px]">
              <input type="checkbox" className="check" checked={tributeOn} onChange={(e) => setTributeOn(e.target.checked)} aria-controls="tribute-fields" aria-expanded={tributeOn} />
              <span>Make this gift in honour or in memory of someone</span>
            </label>
            {tributeOn && (
              <div id="tribute-fields" className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 panel p-5">
                <div className="sm:col-span-2 flex gap-6" role="radiogroup" aria-label="Tribute type">
                  {(["honour", "memory"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm min-h-[44px] cursor-pointer">
                      <input type="radio" name="tributeType" className="check" checked={tributeType === t} onChange={() => setTributeType(t)} />
                      In {t} of
                    </label>
                  ))}
                </div>
                <Field id="don-tributeName" label="Their name" required error={errors.tributeName}>
                  <input id="don-tributeName" className="input" value={tributeName} aria-invalid={errors.tributeName ? true : undefined} onChange={(e) => { setTributeName(e.target.value); clearError("tributeName"); }} />
                </Field>
                <Field id="don-tributeNotify" label="Notify someone by email" error={errors.tributeNotify} hint="We’ll send a card — never the amount.">
                  <input id="don-tributeNotify" type="email" className="input" value={tributeNotify} aria-invalid={errors.tributeNotify ? true : undefined} onChange={(e) => { setTributeNotify(e.target.value); clearError("tributeNotify"); }} />
                </Field>
              </div>
            )}
          </fieldset>

          {/* 03 Donor */}
          <fieldset>
            <legend className="w-full flex items-baseline gap-3 border-t border-ink pt-4 mb-6">
              <span className="section-num">03</span><span className="font-serif text-2xl md:text-3xl">Your details</span>
            </legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="don-firstName" label="First name" required error={errors.firstName}>
                <input id="don-firstName" autoComplete="given-name" className="input" value={donor.firstName} aria-invalid={errors.firstName ? true : undefined} onChange={(e) => { setDonor({ ...donor, firstName: e.target.value }); clearError("firstName"); }} />
              </Field>
              <Field id="don-lastName" label="Last name" required error={errors.lastName}>
                <input id="don-lastName" autoComplete="family-name" className="input" value={donor.lastName} aria-invalid={errors.lastName ? true : undefined} onChange={(e) => { setDonor({ ...donor, lastName: e.target.value }); clearError("lastName"); }} />
              </Field>
              <Field id="don-email" label="Email (for your receipt)" required error={errors.email}>
                <input id="don-email" type="email" autoComplete="email" className="input" value={donor.email} aria-invalid={errors.email ? true : undefined} onChange={(e) => { setDonor({ ...donor, email: e.target.value }); clearError("email"); }} />
              </Field>
              <Field id="don-phone" label="Phone" error={errors.phone}>
                <input id="don-phone" type="tel" autoComplete="tel" placeholder="+234 803 000 0000" className="input" value={donor.phone} aria-invalid={errors.phone ? true : undefined} onChange={(e) => { setDonor({ ...donor, phone: e.target.value }); clearError("phone"); }} />
              </Field>
              <Field id="don-country" label="Country of residence">
                <select id="don-country" autoComplete="country-name" className="input" value={donor.country} onChange={(e) => setDonor({ ...donor, country: e.target.value })}>
                  {["Nigeria", "United Kingdom", "United States", "Canada", "Ghana", "Ireland", "Germany", "South Africa", "United Arab Emirates", "Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field id="don-message" label="A message for the team">
                <input id="don-message" className="input" value={donor.message} onChange={(e) => setDonor({ ...donor, message: e.target.value })} placeholder="e.g. For my mother’s hometown" />
              </Field>
              <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ink-soft cursor-pointer min-h-[44px]">
                <input type="checkbox" className="check" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                <span><b className="text-ink">Give anonymously.</b> Your name won’t appear in donor lists or reports. We still need your email for the receipt.</span>
              </label>
              <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ink-soft cursor-pointer min-h-[44px]">
                <input type="checkbox" className="check" checked={updates} onChange={(e) => setUpdates(e.target.checked)} />
                <span>Send me the quarterly field letter. Unsubscribe any time.</span>
              </label>
            </div>
          </fieldset>

          {/* 04 Payment */}
          <fieldset>
            <legend className="w-full flex items-baseline gap-3 border-t border-ink pt-4 mb-6">
              <span className="section-num">04</span><span className="font-serif text-2xl md:text-3xl">Payment</span>
            </legend>
            <div role="tablist" aria-label="Payment method" className="grid grid-cols-3 border-b border-ink">
              {([
                { v: "card", label: "Card", icon: CreditCard },
                { v: "bank", label: "Bank transfer", icon: Landmark },
                { v: "ussd", label: "USSD", icon: Smartphone },
              ] as const).map((m) => {
                const disabled = m.v === "ussd" && currency !== "NGN";
                const active = effectiveMethod === m.v;
                return (
                  <button
                    key={m.v}
                    type="button"
                    role="tab"
                    id={`tab-${m.v}`}
                    aria-selected={active}
                    aria-controls={`panel-${m.v}`}
                    disabled={disabled}
                    onClick={() => { setMethod(m.v); setErrors((e) => ({ ...e, bankConfirmed: "" })); }}
                    className={cn("flex items-center justify-center gap-2 min-h-[52px] px-2 text-center leading-tight text-sm font-semibold -mb-px border-b-2", active ? "border-terracotta text-ink" : "border-transparent text-muted hover:text-ink", disabled && "opacity-40 cursor-not-allowed")}
                    style={active ? { borderBottomColor: "var(--terracotta)" } : undefined}
                    title={disabled ? "USSD is available for naira gifts only" : undefined}
                  >
                    <m.icon className="w-4 h-4" aria-hidden /> {m.label}
                  </button>
                );
              })}
            </div>

            {effectiveMethod === "card" && (
              <div id="panel-card" role="tabpanel" aria-labelledby="tab-card" className="pt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
                <div className="sm:col-span-4">
                  <Field id="don-cardNumber" label="Card number" required error={errors.cardNumber}>
                    <input
                      id="don-cardNumber"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="0000 0000 0000 0000"
                      className="input tabular tracking-wider"
                      value={card.number}
                      aria-invalid={errors.cardNumber ? true : undefined}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 19);
                        setCard({ ...card, number: digits.replace(/(.{4})/g, "$1 ").trim() });
                        clearError("cardNumber");
                      }}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="don-cardName" label="Name on card" required error={errors.cardName}>
                    <input id="don-cardName" autoComplete="cc-name" className="input" value={card.name} aria-invalid={errors.cardName ? true : undefined} onChange={(e) => { setCard({ ...card, name: e.target.value }); clearError("cardName"); }} />
                  </Field>
                </div>
                <Field id="don-cardExpiry" label="Expiry" required error={errors.cardExpiry}>
                  <input
                    id="don-cardExpiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    className="input tabular"
                    value={card.expiry}
                    aria-invalid={errors.cardExpiry ? true : undefined}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                      clearError("cardExpiry");
                    }}
                  />
                </Field>
                <Field id="don-cardCvc" label="CVC" required error={errors.cardCvc}>
                  <input id="don-cardCvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" className="input tabular" value={card.cvc} aria-invalid={errors.cardCvc ? true : undefined} onChange={(e) => { setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }); clearError("cardCvc"); }} />
                </Field>
                <p className="sm:col-span-4 flex items-center gap-2 text-[0.8rem] text-muted">
                  <Lock className="w-3.5 h-3.5" aria-hidden /> Demo only — no card is charged. {frequency !== "once" && `You’ll be charged ${frequency === "monthly" ? "on this date each month" : "on this date each year"}; cancel any time.`}
                </p>
              </div>
            )}

            {effectiveMethod === "bank" && (
              <div id="panel-bank" role="tabpanel" aria-labelledby="tab-bank" className="pt-6">
                <p className="text-sm text-ink-soft mb-5">Transfer {total > 0 ? <b className="text-ink">{formatMoney(total, currency)}</b> : "your gift"} to the account below and use the reference so we can match and receipt it.{frequency !== "once" && " For recurring gifts, set up a standing order with your bank."}</p>
                <dl className="panel divide-y divide-[color:var(--rule)]">
                  {(currency === "NGN"
                    ? [
                        ["Bank", siteConfig.donation.bank.bankName],
                        ["Account name", siteConfig.donation.bank.accountName],
                        ["Account number", siteConfig.donation.bank.accountNumber],
                      ]
                    : [
                        ["Bank", siteConfig.donation.domiciliary.bankName],
                        ["Account name", siteConfig.donation.domiciliary.accountName],
                        [`${currency} account number`, currency === "USD" ? siteConfig.donation.domiciliary.usd : siteConfig.donation.domiciliary.gbp],
                        ["SWIFT / BIC", siteConfig.donation.domiciliary.swift],
                      ]
                  ).map(([k, v]) => (
                    <div key={k} className="flex flex-wrap items-center justify-between gap-2 px-5 py-2">
                      <dt className="text-sm text-muted">{k}</dt>
                      <dd className="flex items-center gap-1 font-semibold tabular">{v}{/number|SWIFT/i.test(k) && <CopyButton value={v} label="Copy" />}</dd>
                    </div>
                  ))}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2 bg-terracotta-soft">
                    <dt className="text-sm font-semibold">Payment reference</dt>
                    <dd className="flex items-center gap-1 font-semibold tabular">{reference}<CopyButton value={reference} label="Copy" /></dd>
                  </div>
                </dl>
                <BankConfirm checked={bankConfirmed} onChange={(v) => { setBankConfirmed(v); clearError("bankConfirmed"); }} error={errors.bankConfirmed} text="I will make (or have made) this transfer using the reference above." />
              </div>
            )}

            {effectiveMethod === "ussd" && (
              <div id="panel-ussd" role="tabpanel" aria-labelledby="tab-ussd" className="pt-6">
                <p className="text-sm text-ink-soft mb-5">Dial the code for your bank from the phone number linked to your account. Use reference <b className="text-ink">{reference}</b> if prompted.</p>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {siteConfig.donation.ussd.map((u) => {
                    const code = u.code.replace("{amount}", total > 0 ? String(Math.round(total)) : "Amount");
                    return (
                      <li key={u.bank} className="panel p-4">
                        <p className="eyebrow mb-2">{u.bank}</p>
                        <p className="font-serif text-lg break-all tabular">{code}</p>
                        <div className="flex items-center gap-2 -ml-3">
                          <CopyButton value={code} label="Copy code" />
                          <a href={`tel:${encodeURIComponent(code)}`} className="inline-flex items-center min-h-[44px] text-[0.8rem] font-semibold text-forest hover:text-terracotta sm:hidden">Dial</a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <BankConfirm checked={bankConfirmed} onChange={(v) => { setBankConfirmed(v); clearError("bankConfirmed"); }} error={errors.bankConfirmed} text="I will complete (or have completed) this USSD payment." />
              </div>
            )}
          </fieldset>

          <div className="lg:hidden">
            <SubmitButton submitting={submitting} total={total} currency={currency} frequency={frequency} />
          </div>
        </div>

        {/* Sticky summary */}
        <aside className="lg:col-span-4" aria-label="Gift summary">
          <div className="lg:sticky lg:top-28 space-y-5">
            <div className="bg-card border border-ink">
              <div className="px-6 pt-6 pb-4 border-b border-rule">
                <p className="eyebrow mb-1">Summary</p>
                <p className="font-serif text-xl leading-snug">{designationLabel(designation)}</p>
              </div>
              <dl className="px-6 py-4 space-y-3 text-sm" aria-live="polite">
                <Row label="Frequency" value={FREQS.find((f) => f.value === frequency)!.label} />
                <Row label="Gift" value={amount > 0 ? formatMoney(amount, currency) : "—"} />
                <Row label={`Processing fee ${coverFees ? "(covered)" : ""}`} value={coverFees && amount > 0 ? formatMoney(fee, currency) : formatMoney(0, currency)} />
                {tributeOn && tributeName && <Row label={tributeType === "honour" ? "In honour of" : "In memory of"} value={tributeName} />}
                {anonymous && <Row label="Recognition" value="Anonymous" />}
                <div className="border-t border-ink pt-3 flex items-baseline justify-between">
                  <dt className="font-semibold">Total{freqSuffix[frequency]}</dt>
                  <dd className="font-serif text-3xl tabular">{total > 0 ? formatMoney(total, currency) : "—"}</dd>
                </div>
                {currency !== "NGN" && total > 0 && <p className="text-right text-[0.78rem] text-muted tabular">≈ {formatNaira(totalNaira)} at indicative rate</p>}
                {frequency !== "once" && total > 0 && <p className="text-right text-[0.78rem] text-muted tabular">{formatMoney(Number((total * (frequency === "monthly" ? 12 : 1)).toFixed(decimals)), currency)} over a year</p>}
              </dl>
              {impact && (
                <p className="mx-6 mb-5 p-4 bg-forest-soft text-[0.85rem] leading-relaxed">
                  <span className="font-serif italic text-forest">Your impact: </span>
                  {frequency === "monthly" ? "over a year, your gifts " : "your gift "}{impact}.
                </p>
              )}
              <div className="px-6 pb-6 hidden lg:block">
                <SubmitButton submitting={submitting} total={total} currency={currency} frequency={frequency} />
              </div>
            </div>
            <ul className="text-[0.8rem] text-ink-soft space-y-2.5">
              <li className="flex gap-2.5"><ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" aria-hidden />Registered not-for-profit. Audited annually by {siteConfig.org.auditor}.</li>
              <li className="flex gap-2.5"><ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" aria-hidden />Restricted gifts are ring-fenced and only spent on what you choose.</li>
              <li className="flex gap-2.5"><ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" aria-hidden /><span>30-day no-questions refund on gifts made in error. <Link href="/faq" className="prose-link">Refund policy</Link></span></li>
            </ul>
            <p className="text-[0.78rem] text-muted">Giving from abroad? Switch currency above, or see <Link href="/ways-to-give" className="prose-link">diaspora giving</Link>. Funding as an organisation? <Link href="/funders" className="prose-link">Funders hub</Link>.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold tabular text-right">{value}</dd>
    </div>
  );
}

function Field({ id, label, required, error, hint, children }: { id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {required ? <span className="text-terracotta" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

function BankConfirm({ checked, onChange, error, text }: { checked: boolean; onChange: (v: boolean) => void; error?: string; text: string }) {
  return (
    <div className="mt-5">
      <label className="flex items-start gap-3 text-sm text-ink-soft cursor-pointer min-h-[44px]">
        <input id="don-bankConfirmed" type="checkbox" className="check" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={error ? true : undefined} />
        <span>{text}</span>
      </label>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

function SubmitButton({ submitting, total, currency, frequency }: { submitting: boolean; total: number; currency: CurrencyCode; frequency: Frequency }) {
  return (
    <button type="submit" disabled={submitting} className="btn btn-accent btn-lg w-full">
      <Lock className="w-4 h-4" aria-hidden />
      {submitting ? "Processing…" : total > 0 ? `Give ${formatMoney(total, currency)}${freqSuffix[frequency]}` : "Give now"}
    </button>
  );
}
