"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/data/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = `Consulta desde la web — ${name}`;
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
          Nombre y apellido
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
          Teléfono
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
        Email
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
        Mensaje
        <textarea
          required
          name="message"
          rows={5}
          className="resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <button
        type="submit"
        className="w-fit rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
      >
        Enviar consulta
      </button>
      {sent ? (
        <p className="text-sm text-brand-700">
          Se abrió tu cliente de email con la consulta cargada. Si no se abrió automáticamente,
          escribinos a{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
