/** Shared contract between the contact form and its route handler. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fields?: Record<string, string> };

export const CONTACT_LIMITS = { name: 120, email: 160, phone: 40, message: 4000 } as const;
