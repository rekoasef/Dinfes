"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "./Container";
import Ticker from "./Ticker";
import Magnetic from "./motion/Magnetic";
import TiltCard from "./motion/TiltCard";
import RotatingWord from "./motion/RotatingWord";
import WordReveal from "./motion/WordReveal";
import Counter from "./motion/Counter";
import AuroraBackground from "./motion/AuroraBackground";
import { easeOutExpo } from "@/lib/motion";
import { site } from "@/lib/data/site";
import { useReducedMotion } from "@/lib/useReducedMotion";

const capabilities = [
  "Prensas hidráulicas",
  "Máquinas especiales",
  "Recipientes ASME VIII",
  "Retrofitting industrial",
  "Centrales hidráulicas",
  "Moldes y matricería",
  "Automatización de líneas",
];

export default function HomeHero({ totalProducts }: { totalProducts: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // The backdrop sinks and dims as the hero scrolls away.
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.1, reduced ? 1.1 : 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.2]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-brand-950">
      {/*
        The source photo is only ~460px wide, so it is used as an intentionally
        soft, darkened backdrop rather than a full-bleed sharp image.
      */}
      <motion.div
        aria-hidden="true"
        style={{ y: backdropY, scale: backdropScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/gallery/2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 blur-[3px]"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/70"
      />
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-40" />
      <AuroraBackground className="-z-10 opacity-70" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }}>
        <Container className="grid gap-16 pt-16 pb-14 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-28 lg:pb-20">
          <div className="flex flex-col gap-8">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="eyebrow inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-slate-300 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
              </span>
              Rosario, Santa Fe — Argentina
            </motion.span>

            <div className="flex flex-col gap-3">
              <WordReveal
                as="h1"
                text="Ingeniería y fabricación de máquinas hidráulicas"
                className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[3.875rem]"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.5 }}
                className="font-display text-2xl font-semibold tracking-tight text-slate-400 sm:text-3xl"
              >
                para tu{" "}
                <RotatingWord words={["producción", "planta", "línea", "industria"]} />
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.62 }}
              className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              Diseñamos y fabricamos prensas hidráulicas, máquinas especiales y recipientes
              certificados bajo Norma ASME VIII, con ingeniería propia desde el primer boceto
              hasta la puesta en marcha.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.72 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Link
                  href="/productos"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-colors hover:bg-accent-600"
                >
                  Ver productos
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L11.29 6.15a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1.02-1.1l3.098-2.9H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contacto"
                  className="inline-flex rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  Hablar con un ingeniero
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/*
            Constrained to ~26rem so the 462px source renders at close to its
            native size and stays sharp.
          */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.25 }}
            className="mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto"
          >
            <TiltCard maxTilt={7}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/50">
                  <Image
                    src="/images/gallery/2.jpg"
                    alt="Prensa hidráulica fabricada por DINFES"
                    fill
                    priority
                    sizes="(min-width: 1024px) 26rem, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-brand-950/70 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-accent-400 backdrop-blur">
                    Norma ASME VIII
                  </span>

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div className="flex flex-col">
                      <Counter
                        value={totalProducts}
                        suffix="+"
                        className="font-display text-4xl font-bold leading-none text-white"
                      />
                      <span className="mt-1 text-[0.6875rem] font-medium uppercase tracking-wider text-slate-300">
                        equipos fabricados
                      </span>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[0.6875rem] font-semibold text-white backdrop-blur">
                      Fabricación propia
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </Container>
      </motion.div>

      <div className="relative border-t border-white/10 bg-brand-950/60 py-4 backdrop-blur">
        <Ticker items={capabilities} />
      </div>

      <a
        href="#contenido"
        aria-label="Ir al contenido"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em]">
          Scroll
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 animate-[scroll-hint_2s_ease-in-out_infinite]"
        >
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <span className="sr-only">{site.tagline}</span>
    </section>
  );
}
