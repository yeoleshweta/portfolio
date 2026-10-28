import { requireAdmin, adminError } from "@/lib/admin/auth";
import { parseFilters } from "@/lib/admin/filters";
import {
  cachedGoogleAnalytics,
  gaConfigured,
} from "@/lib/admin/google-analytics";
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const headers = { "Cache-Control": "private, no-store" };
    if (!gaConfigured())
      return Response.json(
        {
          configured: false,
          tagConfigured: Boolean(process.env.NEXT_PUBLIC_GA_ID),
          message:
            "The tracking tag collects events, but report access needs a numeric GA4 property ID and a service account with Viewer access.",
        },
        { headers },
      );
    let filters;
    try {
      filters = parseFilters(new URL(request.url).searchParams);
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 400, headers },
      );
    }
    const inclusiveTo = new Date(Date.parse(filters.to) - 86400000)
      .toISOString()
      .slice(0, 10);
    try {
      return Response.json(
        await cachedGoogleAnalytics(filters.from.slice(0, 10), inclusiveTo),
        { headers },
      );
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 502, headers },
      );
    }
  } catch (error) {
    return adminError(error);
  }
}
