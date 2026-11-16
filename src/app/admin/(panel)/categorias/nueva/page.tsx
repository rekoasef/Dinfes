import type { Metadata } from "next";
import Link from "next/link";
import CategoryForm from "../../../_components/CategoryForm";

export const metadata: Metadata = { title: "Nueva categoría" };

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin" className="text-sm font-medium text-brand-600 hover:underline">
          ← Categorías
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold text-brand-950">Nueva categoría</h1>
        <p className="mt-1 text-sm text-slate-600">
          La dirección de la página se arma con el nombre y queda fija, para no romper links compartidos.
        </p>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <CategoryForm />
      </section>
    </div>
  );
}
