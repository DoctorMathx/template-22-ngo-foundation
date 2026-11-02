import type { Metadata } from "next";
import { Suspense } from "react";
import { Receipt } from "./receipt";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your gift to Ìrètí Foundation has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="container-x py-24"><p className="eyebrow">Loading your receipt…</p></div>}>
      <Receipt />
    </Suspense>
  );
}
