import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Ubicación",
  description: `Encontranos en ${site.address.full}.`,
};

export default function UbicacionPage() {
  return (
    <>
      <PageHero
        eyebrow="Ubicación"
        title="Dónde estamos"
        description={site.address.full}
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Ubicación" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-950">{site.legalName}</h3>
              <dl className="mt-5 flex flex-col gap-4 text-sm text-slate-600">
                <div>
                  <dt className="font-semibold text-brand-900">Dirección</dt>
                  <dd className="mt-1">{site.address.full}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-900">Telefax</dt>
                  <dd className="mt-1">
                    <a href={site.phoneHref} className="hover:text-brand-700">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-brand-900">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
              <Magnetic className="mt-6 w-fit">
                <a
                  href={site.mapsLinkHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  Cómo llegar
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L11.29 6.15a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1.02-1.1l3.098-2.9H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15} className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <iframe
              title="Ubicación de DINFES en el mapa"
              src={site.mapsEmbedSrc}
              className="h-[420px] w-full lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
