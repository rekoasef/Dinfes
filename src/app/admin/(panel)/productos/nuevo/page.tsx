import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import ProductForm from "../../../_components/ProductForm";

export const metadata: Metadata = { title: "Nuevo producto" };

export default async function NewProductPage({ searchParams }: PageProps<"/admin/productos/nuevo">) {
  const { categoria } = await searchParams;
  const { supabase } = await requireAdmin();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("position");

  const options = categories ?? [];
  const categoryId =
    typeof categoria === "string" && options.some((c) => c.id === categoria)
      ? categoria
      : options[0]?.id ?? "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={categoryId ? `/admin/categorias/${categoryId}` : "/admin"}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold text-brand-950">Nuevo producto</h1>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <ProductForm
          categories={options}
          product={{
            category_id: categoryId,
            title: "",
            description: "",
            image: null,
            pdf: null,
            youtube_id: null,
            specs: [],
            published: true,
          }}
        />
      </section>
    </div>
  );
}
