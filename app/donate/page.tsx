import type { Metadata } from "next";
import { Suspense } from "react";
import { DonateClient } from "./donate-client";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once, monthly or annually to Ìrètí Foundation — by card, bank transfer or USSD, in naira, dollars or pounds. Restrict your gift to a project, programme or appeal.",
};

export default function DonatePage() {
  return (
    <Suspense fallback={<DonateSkeleton />}>
      <DonateClient />
    </Suspense>
  );
}

function DonateSkeleton() {
  return (
    <div className="container-x py-20" aria-busy="true">
      <p className="eyebrow mb-4">Donate</p>
      <div className="h-14 w-2/3 bg-paper-deep" />
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 h-[600px] bg-card border border-rule" />
        <div className="lg:col-span-4 h-[360px] bg-card border border-rule" />
      </div>
    </div>
  );
}
