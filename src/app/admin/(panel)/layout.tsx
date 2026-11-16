import Link from "next/link";
import Logo from "@/components/Logo";
import { requireAdmin } from "@/lib/admin/auth";
import { signOut } from "../actions";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const { user } = await requireAdmin();

  return (
    <>
      <header className="bg-brand-950 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin" aria-label="Panel — inicio">
            <Logo compact />
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden text-slate-400 sm:inline">{user.email}</span>
            <Link
              href="/"
              target="_blank"
              className="rounded-lg px-3 py-2 font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Ver la web ↗
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-white/15 px-3 py-2 font-medium text-slate-200 transition-colors hover:border-white/40 hover:text-white"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </>
  );
}
