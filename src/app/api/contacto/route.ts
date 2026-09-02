import { NextResponse } from "next/server";
import { site } from "@/lib/data/site";
import { CONTACT_LIMITS as LIMITS, type ContactResponse } from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * The form used to hand the message off to `mailto:`, which silently does
 * nothing on a machine without a configured mail client — the common case in
 * an office that reads mail through a browser. The consulta was lost and the
 * visitor was told it had been sent. This actually delivers it.
 *
 * Delivery goes through Resend's HTTP API over `fetch`, so there is no SDK to
 * install and the handler runs on any runtime. To move to the company's own
 * SMTP instead, `deliver()` is the only function that has to change.
 *
 * Required env:
 *   RESEND_API_KEY   API key from resend.com
 *   CONTACT_FROM     verified sender, e.g. "DINFES web <web@dinfes.com.ar>"
 * Optional:
 *   CONTACT_TO       recipient; defaults to the address in site.ts
 */

type Payload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website: string;
};


function readField(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

/** Field-level messages say what to do, not just what is wrong. */
function validate(payload: Payload): Record<string, string> {
  const fields: Record<string, string> = {};

  if (!payload.name) fields.name = "Escribí tu nombre.";
  else if (payload.name.length > LIMITS.name) fields.name = "El nombre es demasiado largo.";

  if (!payload.email) fields.email = "Necesitamos un email para responderte.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email))
    fields.email = "Revisá el email: falta el @ o el dominio.";
  else if (payload.email.length > LIMITS.email) fields.email = "El email es demasiado largo.";

  if (payload.phone.length > LIMITS.phone) fields.phone = "El teléfono es demasiado largo.";

  if (!payload.message) fields.message = "Contanos qué necesitás.";
  else if (payload.message.length < 10) fields.message = "Agregá un poco más de detalle.";
  else if (payload.message.length > LIMITS.message)
    fields.message = `El mensaje supera los ${LIMITS.message} caracteres.`;

  return fields;
}

/** Header injection guard: a newline in the subject would let a sender forge headers. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function deliver(payload: Payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO ?? site.email;

  if (!apiKey || !from) {
    throw new Error("MAIL_NOT_CONFIGURED");
  }

  const lines = [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Teléfono: ${payload.phone}` : null,
    "",
    payload.message,
  ].filter((line): line is string => line !== null);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Consulta desde la web — ${singleLine(payload.name)}`,
      text: lines.join("\n"),
      html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
        lines.join("\n")
      )}</pre>`,
    }),
  });

  if (!response.ok) {
    throw new Error(`RESEND_${response.status}: ${await response.text()}`);
  }
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "No pudimos leer el formulario." }, { status: 400 });
  }

  const payload: Payload = {
    name: readField(body, "name"),
    email: readField(body, "email"),
    phone: readField(body, "phone"),
    message: readField(body, "message"),
    website: readField(body, "website"),
  };

  // A filled honeypot is a bot. Answer as if it worked so it stops retrying.
  if (payload.website) return NextResponse.json({ ok: true });

  const fields = validate(payload);
  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Revisá los campos marcados.", fields },
      { status: 422 }
    );
  }

  try {
    await deliver(payload);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error("[contacto] delivery failed:", reason);

    // Either way the visitor gets a way through, never a dead end.
    const message =
      reason === "MAIL_NOT_CONFIGURED"
        ? `El envío web todavía no está configurado. Escribinos a ${site.email} o llamanos al ${site.phone}.`
        : `No pudimos enviar la consulta. Probá de nuevo, o escribinos a ${site.email}.`;

    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
