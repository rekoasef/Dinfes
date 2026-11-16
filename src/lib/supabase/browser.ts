import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./env";

/** Used by the admin to upload files straight to Storage with the signed-in session. */
export function createBrowserSupabase() {
  return createBrowserClient(supabaseUrl(), supabaseKey());
}
