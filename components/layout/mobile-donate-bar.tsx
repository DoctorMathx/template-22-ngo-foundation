"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

/** Sticky “Donate” bar on small screens; hidden inside the donate flow itself. */
export function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/donate")) return null;
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-paper/95 backdrop-blur border-t border-rule px-4 py-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="flex gap-3">
        <Link href="/donate" className="btn btn-primary flex-1"><Heart className="w-4 h-4" aria-hidden /> Donate</Link>
        <Link href="/projects" className="btn btn-outline flex-1">Fund a project</Link>
      </div>
    </div>
  );
}
