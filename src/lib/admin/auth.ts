import "server-only";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * Gate for every admin page and Server Action. getUser() asks Supabase to
 * confirm the session (unlike reading the cookie alone), then the admins
 * table decides whether this account may edit the site.
 */
export async function requireAdmin() {
  const supabase = await createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) redirect("/admin/login?error=sin-permiso");

  return { supabase, user };
}
