import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contactate con DINFES por teléfono, email o completá el formulario. ${site.address.full}.`,
};

const channels = [
  {
    label: "Teléfono / Telefax",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Dirección",
    value: site.address.full,
    href: site.mapsLinkHref,
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu proyecto"
        description="Escribinos por email, llamanos o completá el formulario y te respondemos a la brevedad."
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <StaggerGroup className="flex flex-col gap-4">
            {channels.map((channel) => (
              <StaggerItem key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.label === "Dirección" ? "_blank" : undefined}
                  rel={channel.label === "Dirección" ? "noreferrer" : undefined}
                  className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-400 hover:shadow-xl"
                >
                  <span className="eyebrow text-accent-600">
                    {channel.label}
                  </span>
                  <span className="text-base font-medium text-brand-950">{channel.value}</span>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-bold text-brand-950">Envianos tu consulta</h2>
              <p className="mt-1 text-sm text-slate-600">
                Completá el formulario y se abrirá tu cliente de email con los datos cargados.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
