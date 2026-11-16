import "server-only";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./env";

/**
 * Client acting as the signed-in admin. Reads the session from cookies, so it
 * makes the route dynamic: use it only under /admin and in Server Actions.
 */
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl(), supabaseKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Components cannot write cookies; proxy.ts refreshes the session instead.
        }
      },
    },
  });
}

/**
 * Anonymous client for the public catalogue. No cookies, so pages that use it
 * stay static and only see what Row Level Security allows the public to read.
 */
export function createPublicClient() {
  return createClient(supabaseUrl(), supabaseKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
