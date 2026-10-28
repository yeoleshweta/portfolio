import { requireAdmin, adminError } from "@/lib/admin/auth";
import { analyticsDatabase, sameOrigin } from "@/lib/analytics/server";
export async function POST(request: Request) {
  try {
    await requireAdmin();
    if (!sameOrigin(request)) return new Response(null, { status: 403 });
    const body = await request.json();
    if (
      typeof body.isInternal !== "boolean" ||
      typeof body.visitId !== "string" ||
      !/^[a-f0-9-]{36}$/i.test(body.visitId)
    )
      return new Response(null, { status: 400 });
    const db = analyticsDatabase();
    if (!db) throw Error("Unconfigured");
    const { error } = await db
      .from("analytics_visits")
      .update({ is_internal: body.isInternal })
      .eq("id", body.visitId);
    if (error) throw error;
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return adminError(error);
  }
}
