"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ProductItem } from "@/lib/data/categories";
import { youtubeThumbnail } from "@/lib/youtube";
import ProductDialog from "./ProductDialog";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

function MachineIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12 text-brand-300" aria-hidden="true">
      <path d="M10 40V22h6V10h16v12h6v18H10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 22v-6h12v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 40v-8h16v8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductCard({
  item,
  categoryName,
  index = 0,
}: {
  item: ProductItem;
  categoryName?: string;
  index?: number;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const thumb = item.image ?? (item.youtubeId ? youtubeThumbnail(item.youtubeId) : null);
  const isRemote = !!thumb?.startsWith("http");

  return (
    <>
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: easeOutExpo, delay: (index % 3) * 0.06 }}
        className="h-full"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-950">
            {thumb ? (
              <>
                {/*
                  Source photos are as small as 160px. Blowing them up to fill
                  the card looks broken, so a blurred copy fills the frame and
                  the sharp copy sits on top, contained at its own scale.
                */}
                <Image
                  src={thumb}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="scale-125 object-cover opacity-70 blur-2xl saturate-150"
                  unoptimized={isRemote}
                />
                <Image
                  src={thumb}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="relative object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  unoptimized={isRemote}
                />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-900">
                <MachineIcon />
              </div>
            )}

            {/* Media badges */}
            <div className="absolute left-3 top-3 flex gap-1.5">
              {item.youtubeId ? (
                <span className="flex items-center gap-1 rounded-full bg-brand-950/70 px-2 py-1 text-[0.625rem] font-semibold text-white backdrop-blur">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Video
                </span>
              ) : null}
              {item.pdf ? (
                <span className="flex items-center gap-1 rounded-full bg-brand-950/70 px-2 py-1 text-[0.625rem] font-semibold text-white backdrop-blur">
                  PDF
                </span>
              ) : null}
            </div>

            <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-accent-500 py-2.5 text-xs font-semibold text-brand-950 transition-transform duration-300 group-hover:translate-y-0">
              Ver detalle
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L11.29 6.15a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 11-1.02-1.1l3.098-2.9H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="text-sm font-semibold leading-snug text-brand-950 transition-colors group-hover:text-accent-700">
              {item.title}
            </h3>
            {item.description ? (
              <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                {item.description}
              </p>
            ) : null}
          </div>
        </button>
      </motion.div>

      <ProductDialog
        item={item}
        categoryName={categoryName}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
