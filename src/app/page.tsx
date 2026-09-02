import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SectionDivider from "@/components/SectionDivider";
import CategoryCard from "@/components/CategoryCard";
import HomeHero from "@/components/HomeHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Magnetic from "@/components/motion/Magnetic";
import ScrollMarquee from "@/components/motion/ScrollMarquee";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { productCategories, totalCategories, totalProducts } from "@/lib/data/categories";
import { site } from "@/lib/data/site";

const values = [
  {
    title: "Diseño y fabricación propia",
    description:
      "Ingeniería propia para el desarrollo íntegro de prensas hidráulicas, máquinas especiales y equipos a medida.",
  },
  {
    title: "Certificación ASME VIII",
    description:
      "Recipientes sometidos a presión fabricados bajo Norma ASME VIII, con los estándares de seguridad más exigentes.",
  },
  {
    title: "Retrofitting industrial",
    description:
      "Modernizamos y ponemos a punto equipos existentes, extendiendo su vida útil y mejorando su rendimiento.",
  },
  {
    title: "Asistencia técnica",
    description:
      "Asesoramiento y soporte post-venta para acompañar a cada cliente en sus proyectos y líneas de producción.",
  },
];

const processSteps = [
  {
    title: "Asesoramiento",
    description:
      "Analizamos tu proceso productivo y definimos juntos el equipo que realmente necesita tu línea.",
  },
  {
    title: "Ingeniería",
    description:
      "Diseñamos el equipo íntegramente con ingeniería propia, con foco en seguridad, eficiencia y mantenibilidad.",
  },
  {
    title: "Fabricación",
    description:
      "Fabricamos en nuestro taller de Rosario, con control de calidad en cada etapa y bajo norma cuando corresponde.",
  },
  {
    title: "Puesta en marcha",
    description:
      "Montamos, ponemos a punto y capacitamos a tu equipo, con servicio post-venta y repuestos.",
  },
];

const galleryStrip = [
  { src: "/images/gallery/2.jpg", alt: "Prensa hidráulica en el taller de DINFES" },
  { src: "/images/gallery/10.png", alt: "Máquina especial fabricada por DINFES" },
  { src: "/images/gallery/6.jpg", alt: "Equipo industrial en proceso de fabricación" },
  { src: "/images/gallery/4.jpg", alt: "Línea de producción equipada por DINFES" },
  { src: "/images/gallery/8.jpg", alt: "Prensa en montaje" },
  { src: "/images/gallery/11.jpg", alt: "Equipo hidráulico terminado" },
  { src: "/images/gallery/5.jpg", alt: "Detalle de fabricación" },
];

const stats = [
  { value: totalProducts, suffix: "+", label: "Equipos y modelos fabricados" },
  { value: totalCategories, suffix: "", label: "Líneas de producto" },
  { value: 35, suffix: "+", label: "Fichas técnicas disponibles" },
  { raw: "ASME VIII", label: "Recipientes certificados" },
];

export default function Home() {
  return (
    <>
      <HomeHero totalProducts={totalProducts} />

      {/* STATS — stays on the dark band so the hero reads as one block */}
      <section
        id="contenido"
        className="relative overflow-hidden border-t border-white/10 bg-brand-900"
      >
        <div aria-hidden="true" className="bg-blueprint-sm absolute inset-0 opacity-50" />
        <Container className="relative">
          <StaggerGroup className="grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
            {stats.map((stat) => (
              <StaggerItem
                key={stat.label}
                className="flex flex-col items-center gap-2 px-4 py-10 text-center lg:py-14"
              >
                {stat.raw ? (
                  <span className="font-display text-3xl font-bold text-white sm:text-[2.5rem]">
                    {stat.raw}
                  </span>
                ) : (
                  <Counter
                    value={stat.value as number}
                    suffix={stat.suffix}
                    className="font-display text-3xl font-bold text-white sm:text-[2.5rem]"
                  />
                )}
                <span className="max-w-[12rem] text-xs font-medium uppercase tracking-wider text-slate-400 sm:text-[0.8125rem]">
                  {stat.label}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <SectionDivider fillClass="fill-white" className="bg-brand-900" flip />

      {/* VALUES */}
      <section className="bg-white pb-20 pt-6 sm:pb-28">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow="Por qué DINFES"
            title="Calidad, fiabilidad e innovación en cada equipo"
            description="Décadas diseñando y fabricando prensas hidráulicas y máquinas especiales, con ingeniería propia y un compromiso real con cada cliente."
            align="center"
          />
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <StaggerItem key={value.title} className="h-full">
                <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/10">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-accent-300 transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span className="font-display text-3xl font-bold text-brand-200 transition-colors duration-300 group-hover:text-accent-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-snug text-brand-950">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="border-y border-slate-200/70 bg-brand-50 py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Nuestra oferta"
              title="Líneas de producto"
              description="Desde prensas hidráulicas hasta recipientes certificados ASME VIII: diseñamos y fabricamos la solución específica que tu línea de producción necesita."
            />
            <Reveal direction="left">
              <Link
                href="/productos"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:border-accent-400 hover:text-accent-700"
              >
                Ver todas las líneas
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" amount={0.05}>
            {productCategories.map((category) => (
              <StaggerItem key={category.slug} className="h-full">
                <CategoryCard category={category} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden bg-brand-950 py-20 sm:py-28">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-40" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-brand-700/25 blur-3xl"
        />
        <Container className="relative flex flex-col gap-16">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Del primer boceto a la puesta en marcha"
            description="Cuatro etapas en las que acompañamos el proyecto de punta a punta, con un mismo equipo de ingeniería desde el diagnóstico hasta el servicio post-venta."
            tone="light"
          />
          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      {/* TRAYECTORIA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-brand-900 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-accent-500/10 blur-3xl"
        />
        <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Trayectoria"
              title="Equipos diseñados y fabricados a medida"
              description="Desde sus inicios, DINFES ha diseñado y fabricado prensas hidráulicas y máquinas especiales, brindando a sus clientes asesoramiento técnico especializado y soluciones de calidad."
              tone="light"
            />
            <Reveal delay={0.3}>
              <Magnetic className="w-fit">
                <Link
                  href="/la-empresa"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  Conocé la empresa
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {galleryStrip.slice(0, 4).map((item, i) => (
                <div
                  key={item.src}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                    i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>

        {/* Full-bleed strip that drifts sideways with the scroll. */}
        <div className="relative mt-16">
          <ScrollMarquee from={-6} to={6}>
            {[...galleryStrip, ...galleryStrip].map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className="relative aspect-[4/3] w-[15rem] shrink-0 overflow-hidden rounded-xl border border-white/10 sm:w-[18rem]"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="18rem"
                  className="object-cover opacity-70 transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            ))}
          </ScrollMarquee>
        </div>
      </section>

      <SectionDivider fillClass="fill-white" className="bg-brand-900" flip />

      {/* CTA */}
      <section className="relative overflow-hidden bg-white pb-24 pt-10 sm:pb-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-200/60 via-accent-200/40 to-transparent blur-3xl"
        />
        <Container className="relative flex flex-col items-center gap-7 text-center">
          <SectionHeading
            eyebrow="Siguiente paso"
            title="¿Tenés un proyecto o un equipo para modernizar?"
            description="Contanos qué necesitás y te asesoramos con ingeniería propia, desde el diseño hasta la puesta en marcha."
            align="center"
          />
          <Reveal delay={0.25}>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-950/20 transition-colors hover:bg-brand-800"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" />
                  </svg>
                  {site.phone}
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contacto"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-brand-950 shadow-lg shadow-accent-500/25 transition-colors hover:bg-accent-400"
                >
                  Ir a Contacto
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
