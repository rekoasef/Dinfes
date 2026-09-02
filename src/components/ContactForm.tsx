"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { site } from "@/lib/data/site";
import type { ContactResponse } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_BASE =
  "rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:ring-2 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500";

/**
 * Sends the consulta to /api/contacto. It used to hand off to `mailto:`, which
 * did nothing at all on a machine without a mail client configured — and said
 * it had worked regardless.
 */
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const id = useId();

  const sending = status === "sending";

  function fieldProps(name: keyof typeof LABELS) {
    const invalid = Boolean(fields[name]);
    return {
      name,
      disabled: sending,
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `${id}-${name}-error` : undefined,
      className: `${FIELD_BASE} ${invalid ? "border-red-500" : "border-slate-300 focus:border-brand-500"}`,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    setFields({});

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = (await response.json()) as ContactResponse;

      if (result.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else {
        // The values stay in the inputs so nothing has to be retyped.
        setStatus("error");
        setError(result.error);
        setFields(result.fields ?? {});
      }
    } catch {
      setStatus("error");
      setError(`No pudimos conectarnos. Revisá tu conexión, o escribinos a ${site.email}.`);
    }

    statusRef.current?.focus();
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-brand-200 bg-brand-50 p-6">
        <h3 className="font-display text-lg font-bold text-brand-950">Consulta enviada</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          Recibimos tu mensaje y te respondemos a la brevedad. Si es urgente, llamanos al{" "}
          <a href={site.phoneHref} className="font-semibold text-accent-700 underline">
            {site.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="w-fit text-sm font-semibold text-brand-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
          {LABELS.name}
          <input required type="text" autoComplete="name" {...fieldProps("name")} />
          <FieldError id={`${id}-name-error`} message={fields.name} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
          {LABELS.phone}
          <input type="tel" autoComplete="tel" {...fieldProps("phone")} />
          <FieldError id={`${id}-phone-error`} message={fields.phone} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
        {LABELS.email}
        <input required type="email" autoComplete="email" {...fieldProps("email")} />
        <FieldError id={`${id}-email-error`} message={fields.email} />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-brand-900">
        {LABELS.message}
        <MessageField id={id} invalid={fields.message} sending={sending} />
        <FieldError id={`${id}-message-error`} message={fields.message} />
      </label>

      {/* Honeypot: off-screen and skipped by the keyboard, so only bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          No completar este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? (
            <>
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand-950/30 border-t-brand-950"
              />
              Enviando…
            </>
          ) : (
            "Enviar consulta"
          )}
        </button>

        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`text-sm outline-none ${status === "error" ? "text-red-700" : "sr-only"}`}
        >
          {status === "error" ? error : ""}
        </p>
      </div>
    </form>
  );
}

const LABELS = {
  name: "Nombre y apellido",
  phone: "Teléfono",
  email: "Email",
  message: "Mensaje",
} as const;

/** Split out because the textarea needs `resize-none` on top of the shared field classes. */
function MessageField({
  id,
  invalid,
  sending,
}: {
  id: string;
  invalid?: string;
  sending: boolean;
}) {
  return (
    <textarea
      required
      rows={5}
      name="message"
      disabled={sending}
      aria-invalid={invalid ? true : undefined}
      aria-describedby={invalid ? `${id}-message-error` : undefined}
      className={`resize-none ${FIELD_BASE} ${
        invalid ? "border-red-500" : "border-slate-300 focus:border-brand-500"
      }`}
    />
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="text-xs font-normal text-red-700">
      {message}
    </span>
  );
}
