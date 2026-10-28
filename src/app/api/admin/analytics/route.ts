import { requireAdmin, adminError } from "@/lib/admin/auth";
import { parseFilters, toCsv } from "@/lib/admin/filters";
import { analyticsDatabase } from "@/lib/analytics/server";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const query = new URL(request.url).searchParams;
    let filters;
    try {
      filters = parseFilters(query);
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 400 },
      );
    }
    const db = analyticsDatabase();
    if (!db) throw Error("Unconfigured");
    const common = {
      p_from: filters.from,
      p_to: filters.to,
      p_bots: filters.bots,
      p_internal: filters.internal,
    };
    const view = query.get("view") ?? "report";
    if (view === "report") {
      const duration = Date.parse(filters.to) - Date.parse(filters.from);
      const [current, previous] = await Promise.all([
        db.rpc("analytics_report", common),
        db.rpc("analytics_report", {
          ...common,
          p_from: new Date(Date.parse(filters.from) - duration).toISOString(),
          p_to: filters.from,
        }),
      ]);
      if (current.error || previous.error) throw Error("Reporting failed");
      return Response.json(
        {
          ...current.data,
          previousTotals: previous.data.totals,
          updatedAt: new Date().toISOString(),
        },
        { headers: { "Cache-Control": "private, no-store" } },
      );
    }
    if (!["activity", "export"].includes(view))
      return Response.json({ error: "Unknown view" }, { status: 400 });
    const args = {
      ...common,
      p_offset: view === "export" ? 0 : filters.offset,
      p_limit: view === "export" ? 5000 : Math.min(filters.limit, 100),
      p_search: filters.search,
    };
    const result =
      filters.kind === "visits"
        ? await db.rpc("analytics_visits_page", args)
        : await db.rpc("analytics_activity", {
            ...args,
            p_kind: filters.kind,
            p_visit: filters.visit,
          });
    if (result.error) throw Error("Activity failed");
    if (view === "export")
      return new Response(toCsv(result.data.rows), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="portfolio-${filters.kind}-${filters.from.slice(0, 10)}.csv"`,
          "Cache-Control": "private, no-store",
          "X-Export-Total": String(result.data.total),
          "X-Export-Truncated": String(result.data.total > 5000),
        },
      });
    return Response.json(result.data, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return adminError(error);
  }
}
