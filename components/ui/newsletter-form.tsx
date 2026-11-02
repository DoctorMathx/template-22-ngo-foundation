"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm({ dark, id = "newsletter" }: { dark?: boolean; id?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return state === "done" ? (
    <p role="status" className={dark ? "text-paper" : "text-forest"}>
      <span className="font-serif italic text-xl">Thank you.</span> Look out for our next field letter in your inbox.
    </p>
  ) : (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) ? "done" : "error");
      }}
    >
      <label htmlFor={`${id}-email`} className={dark ? "label !text-paper/80" : "label"}>Email address</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
          placeholder="you@example.com"
          className="input flex-1"
        />
        <button type="submit" className={dark ? "btn btn-paper" : "btn btn-primary"}>
          Subscribe <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
      {state === "error" && <p id={`${id}-err`} className={dark ? "field-error !text-[#F2B79A]" : "field-error"}>Please enter a valid email address.</p>}
      <p className={dark ? "mt-3 text-[0.78rem] text-paper/65" : "field-hint"}>Quarterly. Field reports, results and the occasional appeal. Unsubscribe any time.</p>
    </form>
  );
}
