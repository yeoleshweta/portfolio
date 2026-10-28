import { after } from "next/server";
import { processAnalyticsAlerts } from "@/lib/admin/alerts";
import { parseBatch } from "@/lib/analytics/contract";
import { classifyUserAgent } from "@/lib/analytics/helpers";
import {
  analyticsDatabase,
  sameOrigin,
  sourceKey,
} from "@/lib/analytics/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!sameOrigin(request)) return new Response(null, { status: 403, headers });
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true")
    return new Response(null, { status: 204, headers });
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return new Response(null, { status: 415, headers });
  const db = analyticsDatabase();
  if (!db) return new Response(null, { status: 503, headers });
  // Read at most 32 KiB, even when Content-Length is absent or forged.
  const reader = request.body?.getReader();
  if (!reader) return new Response(null, { status: 400, headers });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 32768) {
      await reader.cancel();
      return new Response(null, { status: 413, headers });
    }
    chunks.push(value);
  }
  let batch;
  try {
    batch = parseBatch(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  } catch {
    return new Response(null, { status: 400, headers });
  }
  const dimensions = classifyUserAgent(request.headers.get("user-agent") ?? "");
  const { error } = await db.rpc("ingest_analytics", {
    p_batch: batch,
    p_source: sourceKey(request),
    p_dimensions: dimensions,
  });
  if (error)
    return new Response(null, {
      status: error.message.includes("rate limit") ? 429 : 503,
      headers,
    });
  after(async () => {
    await processAnalyticsAlerts();
  });
  return new Response(null, { status: 204, headers });
}
