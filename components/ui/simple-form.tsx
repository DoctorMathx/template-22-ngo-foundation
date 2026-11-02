"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { FormField } from "@/lib/types";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s()-]{7,18}$/;

/**
 * Config-driven, fully client-side form: controlled inputs, validation and a success state.
 * Nothing is sent anywhere — wire `onSubmit` to your backend or form service when you go live.
 */
export function SimpleForm({
  fields,
  submitLabel = "Submit",
  successTitle = "Thank you",
  successText = "We’ve received your message and will reply within two working days.",
  initial = {},
  note,
  id,
}: {
  fields: FormField[];
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  initial?: Record<string, string>;
  note?: React.ReactNode;
  id?: string;
}) {
  const empty = Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? ""]));
  const [values, setValues] = useState<Record<string, string>>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  function validate(v: Record<string, string>) {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const val = (v[f.name] ?? "").trim();
      if (f.required && (!val || (f.type === "checkbox" && val !== "yes"))) {
        e[f.name] = f.type === "checkbox" ? "Please confirm to continue." : `${f.label} is required.`;
        continue;
      }
      if (!val) continue;
      if (f.type === "email" && !EMAIL.test(val)) e[f.name] = "Enter a valid email address.";
      if (f.type === "tel" && !PHONE.test(val)) e[f.name] = "Enter a valid phone number, e.g. +234 803 000 0000.";
      if (f.type === "number" && (!/^\d+$/.test(val) || Number(val) <= 0)) e[f.name] = "Enter a whole number greater than zero.";
    }
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = fields.find((f) => e[f.name]);
      if (first) document.getElementById(`${id ?? "f"}-${first.name}`)?.focus();
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 700);
  }

  if (sent) {
    return (
      <div role="status" className="panel p-8 md:p-10">
        <CheckCircle2 className="w-8 h-8 text-forest mb-4" aria-hidden />
        <h3 className="font-serif text-2xl mb-2">{successTitle}</h3>
        <p className="text-ink-soft leading-relaxed">{successText}</p>
        <button
          type="button"
          className="btn btn-outline btn-sm mt-6"
          onClick={() => {
            setValues(empty);
            setSent(false);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
      {fields.map((f) => {
        const fid = `${id ?? "f"}-${f.name}`;
        const err = errors[f.name];
        const describedBy = [err && `${fid}-err`, f.hint && `${fid}-hint`].filter(Boolean).join(" ") || undefined;
        const common = {
          id: fid,
          name: f.name,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
          required: f.required,
        };
        if (f.type === "checkbox") {
          return (
            <div key={f.name} className="sm:col-span-2">
              <label htmlFor={fid} className="flex items-start gap-3 text-sm text-ink-soft cursor-pointer min-h-[44px]">
                <input type="checkbox" className="check" {...common} checked={values[f.name] === "yes"} onChange={(e) => set(f.name, e.target.checked ? "yes" : "")} />
                <span>{f.label}</span>
              </label>
              {err && <p id={`${fid}-err`} className="field-error">{err}</p>}
            </div>
          );
        }
        return (
          <div key={f.name} className={cn(!f.half && "sm:col-span-2")}>
            <label htmlFor={fid} className="label">
              {f.label} {f.required ? <span className="text-terracotta" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
            </label>
            {f.type === "select" ? (
              <select {...common} className="input" value={values[f.name]} onChange={(e) => set(f.name, e.target.value)}>
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} className="input" placeholder={f.placeholder} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} />
            ) : (
              <input
                {...common}
                className="input"
                type={f.type === "number" ? "text" : f.type}
                inputMode={f.type === "number" ? "numeric" : undefined}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
              />
            )}
            {f.hint && !err && <p id={`${fid}-hint`} className="field-hint">{f.hint}</p>}
            {err && <p id={`${fid}-err`} className="field-error">{err}</p>}
          </div>
        );
      })}
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button type="submit" className="btn btn-primary btn-lg" disabled={busy}>
          {busy ? "Sending…" : submitLabel}
        </button>
        {note && <p className="text-[0.8rem] text-muted">{note}</p>}
      </div>
    </form>
  );
}
