import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import RowControls from "../_components/RowControls";
import { buttonClass } from "../_components/ui";

export const metadata: Metadata = { title: "Categorías" };

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, published, products(count)")
    .order("position")
    .order("created_at")
    .returns<
      { id: string; name: string; slug: string; published: boolean; products: { count: number }[] }[]
    >();

  const rows = categories ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">Categorías</h1>
          <p className="mt-1 text-sm text-slate-600">
            Entrá a una categoría para editar sus productos. Las flechas cambian el orden en la web.
          </p>
        </div>
        <Link href="/admin/categorias/nueva" className={buttonClass.primary}>
          + Nueva categoría
        </Link>
      </div>

      <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {rows.map((category, index) => {
          const count = category.products[0]?.count ?? 0;
          return (
            <li key={category.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <Link
                href={`/admin/categorias/${category.id}`}
                className="group flex min-w-0 flex-1 flex-col"
              >
                <span className="truncate font-semibold text-brand-950 group-hover:text-brand-600 group-hover:underline">
                  {category.name}
                </span>
                <span className="text-xs text-slate-500">
                  {count} {count === 1 ? "producto" : "productos"}
                </span>
              </Link>
              <RowControls
                table="categories"
                id={category.id}
                published={category.published}
                isFirst={index === 0}
                isLast={index === rows.length - 1}
                label={category.name}
              />
            </li>
          );
        })}
        {rows.length === 0 ? (
          <li className="px-4 py-10 text-center text-sm text-slate-500">Todavía no hay categorías.</li>
        ) : null}
      </ul>
    </div>
  );
}
