"use client";

import { useActionState } from "react";
import { signIn } from "../actions";
import { Field, Notice, SubmitButton, inputClass, buttonClass } from "./ui";

export default function LoginForm({ notice }: { notice?: string }) {
  const [state, action] = useActionState(signIn, undefined);
  const error = state?.error ?? notice;

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </Field>
      <Field label="Contraseña" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </Field>

      {error ? <Notice tone="error">{error}</Notice> : null}

      <SubmitButton pendingLabel="Ingresando…" className={`${buttonClass.primary} w-full`}>
        Ingresar
      </SubmitButton>
    </form>
  );
}
