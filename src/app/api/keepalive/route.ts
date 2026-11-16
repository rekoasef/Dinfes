import { createPublicClient } from "@/lib/supabase/server";

/**
 * Supabase pauses free projects after a week without database activity. The
 * public site reads from cache, so it would never wake the database by
 * itself: Vercel Cron calls this once a day (see vercel.json) and it runs a
 * real query.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("No autorizado", { status: 401 });
  }

  const { count, error } = await createPublicClient()
    .from("categories")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("[keepalive] Supabase no respondió:", error.message);
    return Response.json({ ok: false, error: error.message }, { status: 502 });
  }

  return Response.json({ ok: true, categories: count, at: new Date().toISOString() });
}
