import { STORAGE_BUCKET } from "@/lib/supabase/env";

export type FormState = { error?: string; saved?: boolean } | undefined;

export function text(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** One entry per line, blank lines dropped. Used for features and chips. */
export function lines(form: FormData, name: string) {
  return text(form, name)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Accepts what people actually paste — a watch link, a youtu.be link, a
 * Shorts link or the bare 11-character id — and returns the id.
 */
export function parseYoutubeId(input: string): string | null | "invalid" {
  const value = input.trim();
  if (!value) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = url.hostname.replace(/^www\.|^m\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      id =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1] ??
        null;
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "invalid";
  } catch {
    return "invalid";
  }
}

/** Path inside the bucket for files this panel uploaded; null for files shipped in /public. */
export function storagePath(url: string | null | undefined) {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}
