"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import {
  lines,
  parseYoutubeId,
  slugify,
  storagePath,
  text,
  type FormState,
} from "@/lib/admin/form";
import { CATALOG_TAG, type ProductSpec } from "@/lib/data/catalog";
import { STORAGE_BUCKET } from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/server";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

/** Public pages are cached until something changes; this is that moment. */
function publishChanges() {
  updateTag(CATALOG_TAG);
  revalidatePath("/", "layout");
}

/** Best effort: a file left behind only costs storage, so a failure here never blocks a save. */
async function removeFiles(supabase: Supabase, urls: (string | null | undefined)[]) {
  const paths = urls.map(storagePath).filter((path): path is string => Boolean(path));
  if (paths.length) await supabase.storage.from(STORAGE_BUCKET).remove(paths);
}

/* ------------------------------------------------------------------ */
/* Sesión                                                              */
/* ------------------------------------------------------------------ */

export async function signIn(_prev: FormState, form: FormData): Promise<FormState> {
  const email = text(form, "email");
  const password = text(form, "password");
  if (!email || !password) return { error: "Completá el email y la contraseña." };

  const supabase = await createAdminClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "El email o la contraseña no son correctos." };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createAdminClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Categorías                                                          */
/* ------------------------------------------------------------------ */

export async function saveCategory(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(form, "id");
  const name = text(form, "name");
  if (!name) return { error: "La categoría necesita un nombre." };

  const fields = {
    name,
    short_description: text(form, "short_description"),
    intro: text(form, "intro"),
    hero_image: text(form, "hero_image"),
    features: lines(form, "features"),
    chips: lines(form, "chips"),
    published: form.get("published") === "on",
  };

  if (id) {
    const { data: before } = await supabase
      .from("categories")
      .select("hero_image")
      .eq("id", id)
      .single();
    const { error } = await supabase.from("categories").update(fields).eq("id", id);
    if (error) return { error: `No se pudo guardar: ${error.message}` };
    if (before && before.hero_image !== fields.hero_image) {
      await removeFiles(supabase, [before.hero_image]);
    }
    publishChanges();
    return { saved: true };
  }

  const base = slugify(name);
  if (!base) return { error: "El nombre tiene que incluir letras o números." };

  const { data: taken } = await supabase
    .from("categories")
    .select("slug")
    .like("slug", `${base}%`);
  const used = new Set((taken ?? []).map((row) => row.slug));
  let slug = base;
  for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;

  const { data: last } = await supabase
    .from("categories")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabase
    .from("categories")
    .insert({ ...fields, slug, position: (last?.position ?? -1) + 1 })
    .select("id")
    .single();
  if (error) return { error: `No se pudo crear: ${error.message}` };

  publishChanges();
  redirect(`/admin/categorias/${data.id}`);
}

export async function deleteCategory(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(form, "id");

  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);
  if (count) redirect(`/admin/categorias/${id}?error=tiene-productos`);

  const { data: category } = await supabase
    .from("categories")
    .select("hero_image")
    .eq("id", id)
    .single();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) redirect(`/admin/categorias/${id}?error=no-se-pudo-borrar`);

  await removeFiles(supabase, [category?.hero_image]);
  publishChanges();
  redirect("/admin");
}

/* ------------------------------------------------------------------ */
/* Productos                                                           */
/* ------------------------------------------------------------------ */

function parseSpecs(raw: string): ProductSpec[] {
  try {
    const value = JSON.parse(raw || "[]");
    if (!Array.isArray(value)) return [];
    return value
      .map((spec) => ({
        label: String(spec?.label ?? "").trim(),
        value: String(spec?.value ?? "").trim(),
      }))
      .filter((spec) => spec.label && spec.value);
  } catch {
    return [];
  }
}

export async function saveProduct(_prev: FormState, form: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(form, "id");
  const title = text(form, "title");
  const categoryId = text(form, "category_id");
  if (!title) return { error: "El producto necesita un título." };
  if (!categoryId) return { error: "Elegí una categoría." };

  const youtubeId = parseYoutubeId(text(form, "youtube"));
  if (youtubeId === "invalid") {
    return { error: "El link de YouTube no es válido. Pegá el link del video tal cual." };
  }

  const fields = {
    title,
    category_id: categoryId,
    description: text(form, "description"),
    image: text(form, "image") || null,
    pdf: text(form, "pdf") || null,
    youtube_id: youtubeId,
    specs: parseSpecs(text(form, "specs")),
    published: form.get("published") === "on",
  };

  if (id) {
    const { data: before } = await supabase
      .from("products")
      .select("category_id, image, pdf")
      .eq("id", id)
      .single();
    if (!before) return { error: "Este producto ya no existe." };

    // Moving to another line puts it at the end of that line.
    const position =
      before.category_id === categoryId ? undefined : await nextProductPosition(supabase, categoryId);

    const { error } = await supabase
      .from("products")
      .update(position === undefined ? fields : { ...fields, position })
      .eq("id", id);
    if (error) return { error: `No se pudo guardar: ${error.message}` };

    await removeFiles(supabase, [
      before.image !== fields.image ? before.image : null,
      before.pdf !== fields.pdf ? before.pdf : null,
    ]);
    publishChanges();
    return { saved: true };
  }

  const { error } = await supabase
    .from("products")
    .insert({ ...fields, position: await nextProductPosition(supabase, categoryId) });
  if (error) return { error: `No se pudo crear: ${error.message}` };

  publishChanges();
  redirect(`/admin/categorias/${categoryId}?creado=1`);
}

async function nextProductPosition(supabase: Supabase, categoryId: string) {
  const { data } = await supabase
    .from("products")
    .select("position")
    .eq("category_id", categoryId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.position ?? -1) + 1;
}

export async function deleteProduct(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(form, "id");

  const { data: product } = await supabase
    .from("products")
    .select("category_id, image, pdf")
    .eq("id", id)
    .single();
  if (!product) redirect("/admin");

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) redirect(`/admin/productos/${id}?error=no-se-pudo-borrar`);

  await removeFiles(supabase, [product.image, product.pdf]);
  publishChanges();
  redirect(`/admin/categorias/${product.category_id}`);
}

/* ------------------------------------------------------------------ */
/* Orden y visibilidad                                                 */
/* ------------------------------------------------------------------ */

type Table = "categories" | "products";

/**
 * Swaps an item with its neighbour. Positions are renumbered 0..n first, so
 * gaps or duplicates left by earlier edits never make a move do nothing.
 */
export async function move(form: FormData) {
  const { supabase } = await requireAdmin();
  const table = text(form, "table") as Table;
  const id = text(form, "id");
  const direction = text(form, "direction") === "up" ? -1 : 1;
  if (table !== "categories" && table !== "products") return;

  let query = supabase.from(table).select("id, position").order("position").order("created_at");
  if (table === "products") {
    const { data: product } = await supabase
      .from("products")
      .select("category_id")
      .eq("id", id)
      .single();
    if (!product) return;
    query = query.eq("category_id", product.category_id);
  }

  const { data: rows } = await query;
  if (!rows) return;
  const ids = rows.map((row) => row.id);
  const from = ids.indexOf(id);
  const to = from + direction;
  if (from === -1 || to < 0 || to >= ids.length) return;
  [ids[from], ids[to]] = [ids[to], ids[from]];

  await Promise.all(
    ids.map((rowId, position) =>
      rows.find((row) => row.id === rowId)?.position === position
        ? null
        : supabase.from(table).update({ position }).eq("id", rowId)
    )
  );

  publishChanges();
  revalidatePath("/admin", "layout");
}

export async function togglePublished(form: FormData) {
  const { supabase } = await requireAdmin();
  const table = text(form, "table") as Table;
  const id = text(form, "id");
  if (table !== "categories" && table !== "products") return;

  await supabase
    .from(table)
    .update({ published: text(form, "published") !== "true" })
    .eq("id", id);

  publishChanges();
  revalidatePath("/admin", "layout");
}
