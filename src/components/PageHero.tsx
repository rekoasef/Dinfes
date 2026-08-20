import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import WordReveal from "./motion/WordReveal";
import Reveal from "./motion/Reveal";
import AuroraBackground from "./motion/AuroraBackground";

export type Crumb = { label: string; href?: string };

/**
 * Dark editorial hero for interior pages.
 *
 * The background photo is deliberately soft and dimmed — the source files top
 * out around 500px, so treating them as atmosphere reads better than trying to
 * present them as sharp full-bleed imagery.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {image ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover opacity-30 blur-[3px]"
          />
        </div>
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 to-transparent"
      />
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-40" />
      <AuroraBackground className="-z-10 opacity-50" />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        {crumbs?.length ? (
          <Reveal>
            <nav aria-label="Miga de pan" className="mb-6 flex flex-wrap items-center gap-2 text-sm">
              {crumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-slate-600">
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-slate-400 transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-200">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        ) : null}

        {eyebrow ? (
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 text-accent-400">
              <span aria-hidden="true" className="h-px w-6 bg-accent-500" />
              {eyebrow}
            </span>
          </Reveal>
        ) : null}

        <WordReveal
          as="h1"
          text={title}
          delay={0.05}
          className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-balance text-white sm:text-5xl lg:text-6xl"
        />

        {description ? (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
