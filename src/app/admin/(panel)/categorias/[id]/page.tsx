import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { isYoutubeImage, youtubeThumbnail } from "@/lib/youtube";
import { deleteCategory } from "../../../actions";
import CategoryForm from "../../../_components/CategoryForm";
import RowControls from "../../../_components/RowControls";
import { ConfirmButton, Notice, buttonClass } from "../../../_components/ui";

export const metadata: Metadata = { title: "Categoría" };

const errors: Record<string, string> = {
  "tiene-productos":
    "No se puede borrar una categoría que todavía tiene productos. Mové o borrá sus productos primero.",
  "no-se-pudo-borrar": "No se pudo borrar la categoría. Probá de nuevo.",
};

export default async function CategoryPage({ params, searchParams }: PageProps<"/admin/categorias/[id]">) {
  const { id } = await params;
  const { error, creado } = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: category }, { data: products }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, slug, name, short_description, intro, hero_image, features, chips, published")
      .eq("id", id)
      .maybeSingle(),
    supabase
      .from("products")
      .select("id, title, image, youtube_id, pdf, published")
      .eq("category_id", id)
      .order("position")
      .order("created_at"),
  ]);

  if (!category) notFound();
  const rows = products ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/admin" className="text-sm font-medium text-brand-600 hover:underline">
          ← Categorías
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="font-display text-2xl font-bold text-brand-950">{category.name}</h1>
          <Link
            href={`/productos/${category.slug}`}
            target="_blank"
            className="text-sm font-medium text-brand-600 hover:underline"
          >
            Ver en la web ↗
          </Link>
        </div>
      </div>

      {typeof error === "string" && errors[error] ? <Notice tone="error">{errors[error]}</Notice> : null}
      {creado ? <Notice tone="success">Producto creado. Ya se ve en la web.</Notice> : null}

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-brand-950">
            Productos <span className="font-sans text-sm font-normal text-slate-500">({rows.length})</span>
          </h2>
          <Link href={`/admin/productos/nuevo?categoria=${category.id}`} className={buttonClass.primary}>
            + Nuevo producto
          </Link>
        </div>

        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {rows.map((product, index) => {
            const thumb =
              product.image ?? (product.youtube_id ? youtubeThumbnail(product.youtube_id) : null);
            return (
              <li key={product.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <Link
                  href={`/admin/productos/${product.id}`}
                  className="group flex min-w-0 flex-1 items-center gap-3"
                >
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-brand-950">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain"
                        unoptimized={isYoutubeImage(thumb)}
                      />
                    ) : null}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate font-semibold text-brand-950 group-hover:text-brand-600 group-hover:underline">
                      {product.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {[product.image && "Foto", product.pdf && "PDF", product.youtube_id && "Video"]
                        .filter(Boolean)
                        .join(" · ") || "Sin foto, PDF ni video"}
                    </span>
                  </span>
                </Link>
                <RowControls
                  table="products"
                  id={product.id}
                  published={product.published}
                  isFirst={index === 0}
                  isLast={index === rows.length - 1}
                  label={product.title}
                />
              </li>
            );
          })}
          {rows.length === 0 ? (
            <li className="px-4 py-10 text-center text-sm text-slate-500">
              Esta categoría todavía no tiene productos.
            </li>
          ) : null}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-bold text-brand-950">Datos de la categoría</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <CategoryForm category={category} />
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-white p-5">
        <div>
          <h2 className="font-semibold text-brand-950">Borrar categoría</h2>
          <p className="text-sm text-slate-600">Solo se puede si no tiene productos. No se puede deshacer.</p>
        </div>
        <form action={deleteCategory}>
          <input type="hidden" name="id" value={category.id} />
          <ConfirmButton message={`¿Borrar la categoría "${category.name}"? No se puede deshacer.`}>
            Borrar categoría
          </ConfirmButton>
        </form>
      </section>
    </div>
  );
}
