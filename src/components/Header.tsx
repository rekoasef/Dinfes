"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { nav, site } from "@/lib/data/site";
import { easeOutExpo } from "@/lib/motion";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-brand-950/90 backdrop-blur-xl shadow-lg shadow-brand-950/20"
          : "border-transparent bg-brand-950"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <Link href="/" className="shrink-0" aria-label={`${site.name} — Inicio`}>
          <Logo compact={scrolled} />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  <svg
                    className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {isActive(item.href) ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                      transition={{ duration: 0.4, ease: easeOutExpo }}
                    />
                  ) : null}
                </Link>

                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-brand-900 p-2 shadow-2xl shadow-black/40">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {child.label}
                        <span className="text-accent-400 opacity-0 transition-opacity duration-150 hover:opacity-100">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  />
                ) : null}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            {site.phone}
          </a>
          <Link
            href="/contacto"
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400"
          >
            Contactanos
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden border-t border-white/10 bg-brand-950 lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-200 hover:bg-white/10"
                      aria-expanded={mobileProductsOpen}
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileProductsOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeOutExpo }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 flex flex-col gap-0.5 border-l border-white/10 pl-3 pt-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/10 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/10 ${
                      isActive(item.href) ? "text-accent-400" : "text-slate-200 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={site.phoneHref}
                  className="rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Llamar {site.phone}
                </a>
                <Link
                  href="/contacto"
                  className="rounded-xl bg-accent-500 px-4 py-3 text-center text-sm font-semibold text-brand-950"
                >
                  Contactanos
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
