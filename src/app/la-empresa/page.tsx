import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/motion/RevealImage";
import Magnetic from "@/components/motion/Magnetic";
import ScrollMarquee from "@/components/motion/ScrollMarquee";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import Image from "next/image";

export const metadata: Metadata = {
  title: "La Empresa",
  description:
    "DINFES diseña y fabrica prensas hidráulicas y máquinas especiales desde hace décadas, con foco en calidad, fiabilidad e innovación.",
};

const principles = [
  {
    title: "Ingeniería y soluciones a medida",
    description:
      "Aportamos ingeniería propia y soluciones para cada problemática de fabricación, con provisión de equipos nuevos, automatización y retrofitting de equipos existentes.",
  },
  {
    title: "Un socio de confianza",
    description:
      "Nos asociamos con nuestros clientes para lograr juntos la mejor gestión, optimizando la inversión en tiempos y formas, con innovación en cada producto y proceso.",
  },
  {
    title: "Valores éticos",
    description:
      "Respeto por la persona, transparencia, formalidad y fidelidad con los compromisos asumidos, junto a un completo servicio post-venta.",
  },
];

/** The lead paragraph is pulled out; the rest reads as a two-column article. */
const lead =
  "Desde sus inicios, DINFES ha diseñado y fabricado equipos marcando como objetivo el diseño y la fabricación de prensas hidráulicas y máquinas especiales, así como la asistencia técnica especializada, brindando a sus clientes un excelente nivel de asesoramiento y aporte de soluciones de calidad, fiabilidad e innovación en los productos fabricados.";

const body = [
  "El aporte que DINFES busca para sus clientes es lograr un óptimo asesoramiento, aportando ingeniería y soluciones para todas las problemáticas de fabricación de sus productos, con provisión de equipos nuevos, automatización y/o retrofitting de equipos existentes.",
  "Nuestra filosofía de trabajo consiste en asociarnos con nuestros clientes para lograr juntos la mejor gestión, optimizando la inversión en los tiempos y formas debidos, satisfaciendo las exigencias más variadas de cada cliente, siendo un socio de confianza que aporta innovación a la hora de diseñar soluciones para sus productos y procesos de fabricación.",
  "El éxito actual y futuro de DINFES está basado en valores éticos, centrados en el respeto por la persona, la transparencia, la formalidad y la fidelidad con los compromisos asumidos, brindando además un completo servicio post-venta, lo cual redunda en confiabilidad y garantía de nuestros equipos y servicios.",
  "Nos encontramos capacitados y dispuestos a ofrecer nuestra experiencia, desarrollando soluciones a medida para sus proyectos y líneas de producción. DINFES agradece a sus clientes y proveedores por la confianza depositada en la empresa a través de los años, permitiendo continuar con su vasta trayectoria y seguir cumpliendo con las altas exigencias e innovaciones del mercado industrial actual.",
];

const workshop = [
  "/images/gallery/1.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/9.png",
  "/images/gallery/11.jpg",
  "/images/gallery/4.jpg",
];

export default function LaEmpresaPage() {
  return (
    <>
      <PageHero
        eyebrow="La Empresa"
        title="Décadas diseñando y fabricando equipos industriales"
        description="Diseño y fabricación de prensas hidráulicas y máquinas especiales, con asistencia técnica especializada y un fuerte compromiso con la calidad."
        image="/images/gallery/6.jpg"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "La Empresa" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Calidad, fiabilidad e innovación en cada equipo"
          />

          {/* Lead paragraph, set larger to break the wall of body copy. */}
          <Reveal>
            <p className="max-w-4xl border-l-2 border-accent-500 pl-6 text-lg leading-relaxed text-brand-900 sm:text-xl">
              {lead}
            </p>
          </Reveal>

          <div className="grid gap-x-12 gap-y-5 text-base leading-relaxed text-slate-600 lg:grid-cols-2">
            {body.map((paragraph, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Workshop strip that drifts with the scroll. */}
      <section className="overflow-hidden bg-brand-50 py-12">
        <ScrollMarquee from={-7} to={7}>
          {[...workshop, ...workshop].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-[4/3] w-[14rem] shrink-0 overflow-hidden rounded-xl border border-slate-200 sm:w-[17rem]"
            >
              <Image src={src} alt="" fill sizes="17rem" className="object-cover" />
            </div>
          ))}
        </ScrollMarquee>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <StaggerGroup className="flex flex-col gap-4">
            {principles.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
                  <span className="font-display text-2xl font-bold text-brand-200 transition-colors group-hover:text-accent-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-950">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <RevealImage
            src="/images/gallery/8.jpg"
            alt="Equipo fabricado por DINFES"
            wrapperClassName="aspect-[4/5] rounded-2xl border border-slate-200 shadow-xl shadow-brand-900/10"
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-40" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-700/30 blur-3xl"
        />
        <Container className="relative flex flex-col items-center gap-7 text-center">
          <SectionHeading
            title="¿Querés conocer nuestra ingeniería y capacidad de fabricación?"
            align="center"
            tone="light"
          />
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  href="/ingenieria"
                  className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  Ver Ingeniería
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/productos"
                  className="inline-flex rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  Ver Productos
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
