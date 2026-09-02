import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import Reveal from "./motion/Reveal";
import { nav, site } from "@/lib/data/site";

const mainLinks = [
  { label: "Inicio", href: "/" },
  { label: "La Empresa", href: "/la-empresa" },
  { label: "Productos", href: "/productos" },
  { label: "Ingeniería", href: "/ingenieria" },
  { label: "Ubicación", href: "/ubicacion" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  const productLinks = nav.find((item) => item.href === "/productos")?.children ?? [];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-950 text-slate-300">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-30" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl"
      />

      <Container className="relative">
        {/* Contact strip */}
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-white/10 py-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                ¿Empezamos tu proyecto?
              </h2>
              <p className="text-sm text-slate-400">
                Ingeniería propia, fabricación en Rosario y servicio post-venta.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                {site.phone}
              </a>
              <Link
                href="/contacto"
                className="inline-flex rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400"
              >
                Contactanos
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">{site.description}</p>
          </div>

          <div>
            <h3 className="eyebrow text-slate-500">Navegación</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-slate-500">Productos</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {productLinks.slice(0, 6).map((child) => (
                <li key={child.href}>
                  <Link href={child.href} className="text-slate-400 transition-colors hover:text-white">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-slate-500">Contacto</h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-sm">
              <li>
                <a
                  href={site.mapsLinkHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-2.5 text-slate-400 transition-colors hover:text-white"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500">
                    <path
                      fillRule="evenodd"
                      d="M9.69 18.933A9.5 9.5 0 0010 19a9.5 9.5 0 00.31-.067c.324-.106 4.69-1.64 4.69-8.433a5 5 0 10-10 0c0 6.793 4.366 8.327 4.69 8.433zM10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {site.address.full}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="flex gap-2.5 text-slate-400 transition-colors hover:text-white">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500">
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
                  </svg>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex gap-2.5 break-all text-slate-400 transition-colors hover:text-white"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500">
                    <path d="M3 4a2 2 0 00-2 2v.161l8.441 4.221a1.25 1.25 0 001.118 0L19 6.161V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark anchoring the bottom of the page. */}
      <div aria-hidden="true" className="relative overflow-hidden">
        <span className="block select-none bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-center font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-transparent">
          {site.name}
        </span>
      </div>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.
          </p>
          <p>Rosario, Santa Fe, Argentina</p>
        </Container>
      </div>
    </footer>
  );
}
