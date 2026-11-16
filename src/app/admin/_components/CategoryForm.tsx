"use client";

import { useActionState } from "react";
import { saveCategory } from "../actions";
import FileUpload from "./FileUpload";
import { Field, Notice, SubmitButton, inputClass } from "./ui";

export type CategoryFormValues = {
  id?: string;
  name: string;
  short_description: string;
  intro: string;
  hero_image: string;
  features: string[];
  chips: string[];
  published: boolean;
};

export default function CategoryForm({ category }: { category?: CategoryFormValues }) {
  const [state, action] = useActionState(saveCategory, undefined);
  const isNew = !category?.id;

  return (
    <form action={action} className="flex flex-col gap-6">
      {category?.id ? <input type="hidden" name="id" value={category.id} /> : null}

      <Field label="Nombre" htmlFor="name">
        <input
          id="name"
          name="name"
          required
          defaultValue={category?.name}
          className={inputClass}
        />
      </Field>

      <Field
        label="Descripción corta"
        htmlFor="short_description"
        hint="Una línea. Aparece en la tarjeta de la categoría."
      >
        <input
          id="short_description"
          name="short_description"
          defaultValue={category?.short_description}
          className={inputClass}
        />
      </Field>

      <Field
        label="Introducción"
        htmlFor="intro"
        hint="El párrafo que se ve arriba de todo en la página de la categoría."
      >
        <textarea
          id="intro"
          name="intro"
          rows={4}
          defaultValue={category?.intro}
          className={inputClass}
        />
      </Field>

      <Field label="Foto de portada">
        <FileUpload name="hero_image" kind="image" defaultValue={category?.hero_image} />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Características"
          htmlFor="features"
          hint="Una por renglón. Se muestran como lista con tildes. Opcional."
        >
          <textarea
            id="features"
            name="features"
            rows={5}
            defaultValue={category?.features.join("\n")}
            className={inputClass}
          />
        </Field>
        <Field
          label="Etiquetas"
          htmlFor="chips"
          hint="Una por renglón. Se muestran como etiquetas sueltas. Opcional."
        >
          <textarea
            id="chips"
            name="chips"
            rows={5}
            defaultValue={category?.chips.join("\n")}
            className={inputClass}
          />
        </Field>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium text-brand-950">
        <input
          type="checkbox"
          name="published"
          defaultChecked={category?.published ?? true}
          className="h-4 w-4 accent-brand-700"
        />
        Visible en la web
      </label>

      {state?.error ? <Notice tone="error">{state.error}</Notice> : null}
      {state?.saved ? <Notice tone="success">Cambios guardados. Ya se ven en la web.</Notice> : null}

      <div>
        <SubmitButton>{isNew ? "Crear categoría" : "Guardar cambios"}</SubmitButton>
      </div>
    </form>
  );
}
