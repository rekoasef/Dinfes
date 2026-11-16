import type { Metadata } from "next";
import Logo from "@/components/Logo";
import LoginForm from "../_components/LoginForm";

export const metadata: Metadata = { title: "Ingresar" };

const notices: Record<string, string> = {
  "sin-permiso": "Esta cuenta no tiene permiso para editar la web.",
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { error } = await searchParams;
  const notice = typeof error === "string" ? notices[error] : undefined;

  return (
    <main className="flex flex-1 items-center justify-center bg-brand-950 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
          <h1 className="font-display text-xl font-bold text-brand-950">Panel de administración</h1>
          <p className="mt-1 mb-6 text-sm text-slate-500">
            Ingresá para editar productos y categorías.
          </p>
          <LoginForm notice={notice} />
        </div>
      </div>
    </main>
  );
}
