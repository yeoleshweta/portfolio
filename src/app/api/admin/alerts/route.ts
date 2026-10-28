import { requireAdmin, adminError } from "@/lib/admin/auth";
import { analyticsDatabase, sameOrigin } from "@/lib/analytics/server";
import { parseAlertSettings } from "@/lib/admin/alerts-contract";
import { smtpConfigured, emailDeliveryEnabled } from "@/lib/admin/alerts";
export async function GET() {
  try {
    const user = await requireAdmin();
    const db = analyticsDatabase();
    if (!db) throw Error("Unconfigured");
    const { data, error } = await db.rpc("analytics_alert_preferences", {
      p_owner: user.id,
    });
    if (error)
      return Response.json(
        { error: "Email alert storage needs the admin expansion migration." },
        { status: 503 },
      );
    return Response.json(
      {
        ...data,
        email: user.email,
        smtpConfigured: smtpConfigured(),
        deliveryEnabled: emailDeliveryEnabled(),
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return adminError(error);
  }
}
export async function PUT(request: Request) {
  try {
    const user = await requireAdmin();
    if (!sameOrigin(request)) return new Response(null, { status: 403 });
    let settings;
    try {
      settings = parseAlertSettings(await request.json());
    } catch (error) {
      return Response.json(
        { error: (error as Error).message },
        { status: 400 },
      );
    }
    const db = analyticsDatabase();
    if (!db) throw Error("Unconfigured");
    const { error } = await db.rpc("save_analytics_alert_settings", {
      p_owner: user.id,
      p_email: user.email,
      p_enabled: settings.enabled,
      p_period: settings.period,
      p_visitors: settings.visitors,
      p_resume: settings.resumeViews,
    });
    if (error) throw error;
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return adminError(error);
  }
}
