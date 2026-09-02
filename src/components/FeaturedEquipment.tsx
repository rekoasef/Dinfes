"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { FeaturedItem } from "@/lib/data/categories";
import { youtubeThumbnail } from "@/lib/youtube";
import ProductDialog from "./ProductDialog";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Real machines on the home page, above the category grid.
 *
 * The catalogue's strongest evidence is a video of the equipment running, and
 * it used to sit two clicks deep behind category tiles. Depth here is tonal —
 * border and ground shift on hover, nothing lifts — per DESIGN.md.
 */
export default function FeaturedEquipment({ items }: { items: FeaturedItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const poster = item.image ?? youtubeThumbnail(item.youtubeId!);
          const isRemote = poster.startsWith("http");

          return (
            <motion.div
              key={`${item.categorySlug}-${item.title}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: (index % 3) * 0.06 }}
              className="h-full"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-colors duration-300 hover:border-accent-500/50 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                  <Image
                    src={poster}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                    unoptimized={isRemote}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent"
                  />

                  {/* The single orange signal on the card: it marks the video. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-brand-950 transition-colors duration-300 group-hover:bg-accent-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>

                  <span className="eyebrow absolute inset-x-4 bottom-3 text-slate-300">
                    {item.categoryName}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400">
                    Ver el equipo funcionando
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
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          Ver el catálogo completo
        </Link>
      </div>

      {openIndex !== null ? (
        <ProductDialog
          item={items[openIndex]}
          categoryName={items[openIndex].categoryName}
          open
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </>
  );
}
