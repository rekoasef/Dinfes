import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { getCategory, productCategories } from "@/lib/data/categories";
import { site } from "@/lib/data/site";

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.intro,
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const others = productCategories.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Productos"
        title={category.name}
        description={category.intro}
        image={category.heroImage}
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Productos", href: "/productos" },
          { label: category.name },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-14">
          {category.features ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <Reveal>
                <ul className="flex flex-col gap-3">
                  {category.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-base text-slate-700 transition-colors hover:border-brand-200"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mt-0.5 h-5 w-5 shrink-0 text-accent-700"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal direction="left" delay={0.15}>
                <div className="rounded-2xl border border-slate-200 bg-brand-50 p-8">
                  <h3 className="font-display text-lg font-bold text-brand-950">
                    Opcionales disponibles
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5 text-sm text-slate-600">
                    {[
                      "Control remoto inalámbrico",
                      "Versión con toma de fuerza para camiones grandes",
                      "Carro neumático",
                      "Estabilizadores traseros",
                    ].map((option) => (
                      <li key={option} className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-700" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ) : null}

          {category.chips ? (
            <StaggerGroup className="flex flex-wrap gap-2.5">
              {category.chips.map((chip) => (
                <StaggerItem key={chip}>
                  <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-brand-900 shadow-sm transition-colors hover:border-accent-400 hover:text-accent-700">
                    {chip}
                  </span>
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}

          {category.items.length > 0 ? (
            <div className="flex flex-col gap-6">
              <Reveal>
                <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-4">
                  <h2 className="font-display text-xl font-bold text-brand-950">
                    Equipos de esta línea
                  </h2>
                  <span className="text-sm text-slate-500">
                    {category.items.length}{" "}
                    {category.items.length === 1 ? "equipo" : "equipos"}
                  </span>
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item, i) => (
                  <ProductCard
                    key={item.title}
                    item={item}
                    categoryName={category.name}
                    index={i}
                  />
                ))}
              </div>
              <Reveal>
                <p className="text-center text-sm text-slate-500">
                  Hacé clic en cualquier equipo para ver el detalle, la ficha técnica y el video.
                </p>
              </Reveal>
            </div>
          ) : null}

          <Reveal>
            <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl bg-brand-950 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div
                aria-hidden="true"
                className="bg-blueprint absolute inset-0 opacity-40"
              />
              <div className="relative">
                <h3 className="font-display text-xl font-bold text-white">
                  ¿Necesitás un equipo a medida en esta línea?
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-400">
                  Contanos tu proyecto y te asesoramos con nuestro equipo de ingeniería.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={site.phoneHref}
                    className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    {site.phone}
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contacto"
                    className="inline-flex rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400"
                  >
                    Contactanos
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Cross-navigation so a category page is never a dead end. */}
      <section className="border-t border-slate-200 bg-brand-50 py-16">
        <Container className="flex flex-col gap-6">
          <Reveal>
            <h2 className="font-display text-lg font-bold text-brand-950">Otras líneas</h2>
          </Reveal>
          <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <StaggerItem key={other.slug}>
                <Link
                  href={`/productos/${other.slug}`}
                  className="group flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-brand-900 transition-all hover:-translate-y-1 hover:border-accent-400 hover:text-accent-700 hover:shadow-lg"
                >
                  {other.name}
                  <span className="text-accent-700 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
