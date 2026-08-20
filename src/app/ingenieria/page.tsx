import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/motion/RevealImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Ingeniería",
  description:
    "Ingeniería propia para la fabricación de maquinaria y el diseño de procesos de producción continuos, con asesoramiento técnico integral.",
};

const areas = [
  {
    title: "Fabricación de maquinaria",
    description:
      "Diseño y fabricación de prensas hidráulicas, máquinas especiales y equipos a medida, con ingeniería propia en cada etapa del proyecto.",
    points: ["Prensas hidráulicas", "Máquinas especiales", "Moldes y matricería", "Equipos a medida"],
  },
  {
    title: "Procesos de producción continuos",
    description:
      "Desarrollo integral de líneas de producción: manipuladores, alimentadores y equipamiento general para procesos continuos.",
    points: ["Manipuladores", "Alimentadores", "Cintas y transportes", "Automatización"],
  },
];

export default function IngenieriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Ingeniería"
        title="Ingeniería propia al servicio de cada proyecto"
        description="Asesoramiento técnico y desarrollo continuo del diseño de nuestros productos, con altos parámetros de calidad, eficiencia y seguridad."
        image="/images/gallery/10.png"
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Ingeniería" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Cómo trabajamos"
              title="Ingeniería, seguridad y eficiencia en cada equipo"
            />
            <Reveal delay={0.15}>
              <p className="text-base leading-relaxed text-slate-600">
                DINFES cuenta con un alto nivel de ingeniería propia, asesoramiento técnico y
                constante innovación y desarrollo en el diseño de sus productos; es decir, todo lo
                necesario para ofrecer un servicio de calidad y eficiencia, con altos parámetros de
                seguridad.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-base leading-relaxed text-slate-600">
                DINFES cuenta con dos áreas fundamentales de trabajo: la fabricación de maquinaria y
                el desarrollo de procesos de producción continuos. En ambos casos dispone de una
                ingeniería propia capaz de asesorar al cliente y desarrollar los proyectos
                íntegramente.
              </p>
            </Reveal>
          </div>
          <RevealImage
            src="/images/gallery/5.jpg"
            alt="Ingeniería DINFES"
            wrapperClassName="aspect-[4/3] rounded-2xl border border-slate-200 shadow-xl shadow-brand-900/10"
            sizes="(min-width: 1024px) 45vw, 90vw"
          />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-20 sm:py-28">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-40" />
        <Container className="relative flex flex-col gap-12">
          <SectionHeading
            eyebrow="Áreas de trabajo"
            title="Dos áreas, un mismo estándar de calidad"
            align="center"
            tone="light"
          />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2">
            {areas.map((area) => (
              <StaggerItem key={area.title} className="h-full">
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-500/40 hover:bg-white/[0.06]">
                  <h3 className="font-display text-xl font-bold text-white">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{area.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {area.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
