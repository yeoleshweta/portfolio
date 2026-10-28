import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "node:crypto";

/** Server-only module: never import from a client component. */
export function analyticsDatabase() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export function sourceKey(request: Request) {
  const source =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return createHmac(
    "sha256",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "local-disabled",
  )
    .update(`${new Date().toISOString().slice(0, 10)}:${source}`)
    .digest("hex");
}
export function sameOrigin(request: Request) {
  const expected = new URL(process.env.SITE_URL ?? request.url).origin;
  return request.headers.get("origin") === expected;
}
export function secretMatches(
  actual: string | null,
  expected: string | undefined,
) {
  if (!actual || !expected || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
