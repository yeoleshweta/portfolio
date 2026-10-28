import { secretMatches } from "@/lib/analytics/server";
import { processAnalyticsAlerts } from "@/lib/admin/alerts";
export const maxDuration = 60;
export async function GET(request: Request) {
  if (
    !secretMatches(
      request.headers.get("authorization"),
      process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : undefined,
    )
  )
    return new Response(null, { status: 401 });
  const result = await processAnalyticsAlerts();
  return Response.json(result, {
    status: result.state === "unavailable" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
