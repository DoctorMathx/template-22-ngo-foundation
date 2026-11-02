"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpen(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <div className="bg-forest-deep text-paper/85 text-[0.74rem]">
        <div className="container-x flex items-center justify-between gap-4 h-9">
          <p className="truncate">
            Registered not-for-profit<span className="hidden sm:inline"> · Audited annually</span>
          </p>
          <p className="flex items-center gap-5 shrink-0">
            <Link href="/transparency" className="hover:text-paper underline-offset-4 hover:underline">Annual Report 2025</Link>
            <Link href="/funders" className="hidden sm:inline hover:text-paper underline-offset-4 hover:underline">For funders</Link>
          </p>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-rule">
        <div className="container-x flex items-center justify-between h-[72px] gap-6">
          <Link href="/" aria-label={`${siteConfig.brand.name} — home`} className="shrink-0">
            <Wordmark />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {navItems.map((item) => {
                const active = pathname === item.href || item.children?.some((c) => pathname.startsWith(c.href));
                if (!item.children)
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn("inline-flex items-center px-3.5 min-h-[44px] text-[0.9rem] font-medium hover:text-forest", active && "text-forest underline underline-offset-[10px] decoration-[color:var(--terracotta)]")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                const isOpen = open === item.label;
                return (
                  <li key={item.label} className="relative">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`menu-${item.label}`}
                      onClick={() => setOpen(isOpen ? null : item.label)}
                      className={cn("inline-flex items-center gap-1 px-3.5 min-h-[44px] text-[0.9rem] font-medium hover:text-forest", active && "text-forest")}
                    >
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} aria-hidden />
                    </button>
                    {isOpen && (
                      <div id={`menu-${item.label}`} className="absolute left-0 top-full mt-3 w-[360px] bg-card border border-ink shadow-[0_18px_40px_-24px_rgba(26,26,23,.35)] rise">
                        <ul className="py-2">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="block px-5 py-3 hover:bg-paper-deep">
                                <span className="block font-serif text-[1.05rem]">{c.label}</span>
                                {c.description && <span className="block text-[0.78rem] text-muted mt-0.5">{c.description}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/donate" className="hidden sm:inline-flex btn btn-primary btn-sm">Donate</Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2"
            >
              <Menu className="w-6 h-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] bg-paper overflow-y-auto lg:hidden">
          <div className="container-x flex items-center justify-between h-[72px] border-b border-rule">
            <Wordmark />
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="inline-flex items-center justify-center w-11 h-11 -mr-2">
              <X className="w-6 h-6" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="container-x py-6">
            {navItems.map((item, i) => (
              <div key={item.label} className="border-b border-rule py-4">
                <Link href={item.href} className="flex items-baseline gap-3 min-h-[44px]">
                  <span className="section-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl">{item.label}</span>
                </Link>
                {item.children && (
                  <ul className="mt-1 ml-9 space-y-0.5">
                    {item.children.map((c) => (
                      <li key={c.href}><Link href={c.href} className="flex items-center min-h-[44px] text-ink-soft">{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="py-6 flex flex-col gap-3">
              <Link href="/donate" className="btn btn-primary btn-lg w-full">Donate</Link>
              <Link href="/contact" className="btn btn-outline btn-lg w-full">Contact us</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
