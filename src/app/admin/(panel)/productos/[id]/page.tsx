import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import type { ProductSpec } from "@/lib/data/catalog";
import { deleteProduct } from "../../../actions";
import ProductForm from "../../../_components/ProductForm";
import { ConfirmButton, Notice } from "../../../_components/ui";

export const metadata: Metadata = { title: "Producto" };

export default async function ProductPage({ params, searchParams }: PageProps<"/admin/productos/[id]">) {
  const { id } = await params;
  const { error } = await searchParams;
  const { supabase } = await requireAdmin();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("id, category_id, title, description, image, pdf, youtube_id, specs, published")
      .eq("id", id)
      .maybeSingle<{
        id: string;
        category_id: string;
        title: string;
        description: string;
        image: string | null;
        pdf: string | null;
        youtube_id: string | null;
        specs: ProductSpec[];
        published: boolean;
      }>(),
    supabase.from("categories").select("id, name").order("position"),
  ]);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/admin/categorias/${product.category_id}`}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          ← Volver a la categoría
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold text-brand-950">{product.title}</h1>
      </div>

      {error ? <Notice tone="error">No se pudo borrar el producto. Probá de nuevo.</Notice> : null}

      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <ProductForm product={product} categories={categories ?? []} />
      </section>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-white p-5">
        <div>
          <h2 className="font-semibold text-brand-950">Borrar producto</h2>
          <p className="text-sm text-slate-600">
            Si solo querés sacarlo de la web por un tiempo, destildá “Visible en la web”.
          </p>
        </div>
        <form action={deleteProduct}>
          <input type="hidden" name="id" value={product.id} />
          <ConfirmButton message={`¿Borrar "${product.title}"? No se puede deshacer.`}>
            Borrar producto
          </ConfirmButton>
        </form>
      </section>
    </div>
  );
}
