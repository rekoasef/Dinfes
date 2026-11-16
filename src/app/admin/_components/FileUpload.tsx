"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { STORAGE_BUCKET } from "@/lib/supabase/env";
import { buttonClass } from "./ui";

const MAX_BYTES = 20 * 1024 * 1024;

const kinds = {
  image: {
    accept: "image/jpeg,image/png,image/webp,image/avif",
    folder: "imagenes",
    empty: "Sin imagen",
    choose: "Subir imagen",
    replace: "Cambiar imagen",
  },
  pdf: {
    accept: "application/pdf",
    folder: "fichas",
    empty: "Sin ficha técnica",
    choose: "Subir PDF",
    replace: "Cambiar PDF",
  },
} as const;

function safeName(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : "";
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "archivo"}${ext}`;
}

/**
 * Uploads straight from the browser to Supabase Storage with the admin's own
 * session, so large PDFs never pass through a Server Action body limit. The
 * form only carries the resulting public URL.
 */
export default function FileUpload({
  name,
  kind,
  defaultValue,
}: {
  name: string;
  kind: keyof typeof kinds;
  defaultValue?: string | null;
}) {
  const config = kinds[kind];
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    if (file.size > MAX_BYTES) {
      setError("El archivo pesa más de 20 MB. Probá con una versión más liviana.");
      return;
    }

    setStatus("uploading");
    const supabase = createBrowserSupabase();
    const path = `${config.folder}/${crypto.randomUUID()}-${safeName(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { contentType: file.type, cacheControl: "31536000" });
    setStatus("idle");

    if (uploadError) {
      setError(`No se pudo subir el archivo: ${uploadError.message}`);
      return;
    }
    setUrl(supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
      <input type="hidden" name={name} value={url} />

      {url ? (
        kind === "image" ? (
          <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-md bg-brand-950">
            <Image src={url} alt="" fill sizes="320px" className="object-contain" unoptimized />
          </div>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="truncate text-sm font-medium text-brand-700 underline underline-offset-2"
          >
            {decodeURIComponent(url.split("/").pop() ?? "Ver PDF")}
          </a>
        )
      ) : (
        <p className="text-sm text-slate-500">{config.empty}</p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={inputId} className={`${buttonClass.secondary} cursor-pointer`}>
          {status === "uploading" ? "Subiendo…" : url ? config.replace : config.choose}
        </label>
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={config.accept}
          disabled={status === "uploading"}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
            event.target.value = "";
          }}
        />
        {url ? (
          <button type="button" className={buttonClass.secondary} onClick={() => setUrl("")}>
            Quitar
          </button>
        ) : null}
      </div>

      {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
