"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductItem } from "@/lib/data/categories";
import { youtubeEmbedUrl, youtubeThumbnail } from "@/lib/youtube";
import { lockScroll, unlockScroll } from "./SmoothScroll";
import { easeOutExpo } from "@/lib/motion";

/**
 * Full detail view for a single product: image, description, spec sheet and
 * video in one place. Fields are all optional so the same component works
 * whether the data comes from the static catalogue or, later, the CMS.
 */
export default function ProductDialog({
  item,
  categoryName,
  open,
  onClose,
}: {
  item: ProductItem;
  categoryName?: string;
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    lockScroll();
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-brand-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <Panel
            ref={panelRef}
            item={item}
            categoryName={categoryName}
            onClose={onClose}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Split out so the "is the video playing?" state is created fresh each time
 * the dialog opens and thrown away when it closes.
 */
function Panel({
  ref,
  item,
  categoryName,
  onClose,
}: {
  ref: React.Ref<HTMLDivElement>;
  item: ProductItem;
  categoryName?: string;
  onClose: () => void;
}) {
  const [showVideo, setShowVideo] = useState(false);
  const poster =
    item.image ?? (item.youtubeId ? youtubeThumbnail(item.youtubeId) : null);

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      initial={{ y: 40, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 30, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-4xl overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:rounded-3xl"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-950/70 text-white backdrop-blur transition-colors hover:bg-accent-500 hover:text-brand-950"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="grid sm:grid-cols-2">
        {/* Media */}
        {/* 4:3 while stacked; fills the row height once the columns sit side by side. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-950 sm:aspect-auto sm:h-full sm:min-h-[24rem]">
          {showVideo && item.youtubeId ? (
            <iframe
              src={`${youtubeEmbedUrl(item.youtubeId)}?autoplay=1&rel=0`}
              title={item.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : poster ? (
            <>
              {/* Blurred copy fills the frame; the sharp copy stays at
                        its own scale so low-resolution files never stretch. */}
              <Image
                src={poster}
                alt=""
                fill
                aria-hidden="true"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="scale-125 object-cover opacity-40 blur-2xl"
                unoptimized={poster.startsWith("http")}
              />
              <Image
                src={poster}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="relative object-contain p-4"
                unoptimized={poster.startsWith("http")}
              />
              {item.youtubeId ? (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className="group absolute inset-0 flex items-center justify-center bg-brand-950/0 transition-colors hover:bg-brand-950/30"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand-950 shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-7 w-7"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="sr-only">
                    Reproducir video de {item.title}
                  </span>
                </button>
              ) : null}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-600">
              <span className="text-sm">Sin imagen disponible</span>
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          {categoryName ? (
            <span className="eyebrow text-accent-700">{categoryName}</span>
          ) : null}
          <h2 className="font-display text-2xl font-bold leading-tight text-brand-950">
            {item.title}
          </h2>

          <p className="text-sm leading-relaxed text-slate-600">
            {item.description ??
              "Equipo diseñado y fabricado por DINFES a medida del proceso productivo de cada cliente. Escribinos para recibir la ficha técnica completa, dimensiones y condiciones de entrega."}
          </p>

          {item.specs?.length ? (
            <dl className="flex flex-col divide-y divide-slate-200 rounded-xl border border-slate-200">
              {item.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between gap-4 px-4 py-2.5"
                >
                  <dt className="text-sm text-slate-500">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-brand-950">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-auto flex flex-col gap-2.5 pt-2">
            {item.pdf ? (
              <a
                href={item.pdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3.75A1.75 1.75 0 015.75 2h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237V16.25A1.75 1.75 0 0114.25 18h-8.5A1.75 1.75 0 014 16.25V3.75zM7 12a.75.75 0 000 1.5h6a.75.75 0 000-1.5H7zm0-3a.75.75 0 000 1.5h6A.75.75 0 0013 9H7z"
                    clipRule="evenodd"
                  />
                </svg>
                Descargar ficha técnica
              </a>
            ) : null}
            {item.youtubeId && !showVideo ? (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-brand-950 transition-colors hover:border-accent-400 hover:text-accent-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Ver el equipo en funcionamiento
              </button>
            ) : null}
            <a
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400"
            >
              Consultar por este equipo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
