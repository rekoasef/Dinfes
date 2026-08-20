"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProductCategory } from "@/lib/data/categories";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function CategoryCard({ category }: { category: ProductCategory }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Slight counter-drift inside the frame gives the grid depth while scrolling.
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  const count = category.items.length;

  return (
    <motion.div ref={ref} whileHover="hover" initial="rest" animate="rest" className="h-full">
      <Link
        href={`/productos/${category.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/15"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-900">
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="absolute inset-0"
          >
            <motion.div style={{ y }} className="absolute inset-[-8%]">
              <Image
                src={category.heroImage}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/25 to-transparent" />

          {count > 0 ? (
            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-brand-950/60 px-2.5 py-1 text-[0.6875rem] font-semibold text-slate-200 backdrop-blur">
              {count} {count === 1 ? "equipo" : "equipos"}
            </span>
          ) : null}

          <motion.span
            variants={{ rest: { opacity: 0, x: -8 }, hover: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L11.29 6.15a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1.02-1.1l3.098-2.9H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </motion.span>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-xl font-bold leading-tight text-white">
              {category.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-sm leading-relaxed text-slate-600">{category.shortDescription}</p>
          <span className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent-600">
            Ver productos
            <motion.svg
              variants={{ rest: { x: 0 }, hover: { x: 5 } }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L11.29 6.15a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1.02-1.1l3.098-2.9H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </motion.svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
