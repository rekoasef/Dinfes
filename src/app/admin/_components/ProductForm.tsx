"use client";

import { useActionState } from "react";
import type { ProductSpec } from "@/lib/data/catalog";
import { saveProduct } from "../actions";
import FileUpload from "./FileUpload";
import SpecsEditor from "./SpecsEditor";
import { Field, Notice, SubmitButton, inputClass } from "./ui";

export type ProductFormValues = {
  id?: string;
  category_id: string;
  title: string;
  description: string;
  image: string | null;
  pdf: string | null;
  youtube_id: string | null;
  specs: ProductSpec[];
  published: boolean;
};

export default function ProductForm({
  product,
  categories,
}: {
  product: ProductFormValues;
  categories: { id: string; name: string }[];
}) {
  const [state, action] = useActionState(saveProduct, undefined);
  const isNew = !product.id;

  return (
    <form action={action} className="flex flex-col gap-6">
      {product.id ? <input type="hidden" name="id" value={product.id} /> : null}

      <Field label="Título" htmlFor="title">
        <input id="title" name="title" required defaultValue={product.title} className={inputClass} />
      </Field>

      <Field label="Categoría" htmlFor="category_id">
        <select
          id="category_id"
          name="category_id"
          defaultValue={product.category_id}
          className={inputClass}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Descripción"
        htmlFor="description"
        hint="Se respetan los renglones. Si queda vacía, la web muestra un texto genérico invitando a consultar."
      >
        <textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={product.description}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Foto">
          <FileUpload name="image" kind="image" defaultValue={product.image} />
        </Field>
        <Field label="Ficha técnica (PDF)">
          <FileUpload name="pdf" kind="pdf" defaultValue={product.pdf} />
        </Field>
      </div>

      <Field
        label="Video de YouTube"
        htmlFor="youtube"
        hint="Pegá el link del video. Si el producto no tiene foto, se usa la imagen del video."
      >
        <input
          id="youtube"
          name="youtube"
          inputMode="url"
          placeholder="https://www.youtube.com/watch?v=…"
          defaultValue={product.youtube_id ? `https://www.youtube.com/watch?v=${product.youtube_id}` : ""}
          className={inputClass}
        />
      </Field>

      <Field label="Datos técnicos" hint="Se muestran como tabla en el detalle del producto. Opcional.">
        <SpecsEditor name="specs" defaultValue={product.specs} />
      </Field>

      <label className="flex items-center gap-3 text-sm font-medium text-brand-950">
        <input
          type="checkbox"
          name="published"
          defaultChecked={product.published}
          className="h-4 w-4 accent-brand-700"
        />
        Visible en la web
      </label>

      {state?.error ? <Notice tone="error">{state.error}</Notice> : null}
      {state?.saved ? <Notice tone="success">Cambios guardados. Ya se ven en la web.</Notice> : null}

      <div>
        <SubmitButton>{isNew ? "Crear producto" : "Guardar cambios"}</SubmitButton>
      </div>
    </form>
  );
}
