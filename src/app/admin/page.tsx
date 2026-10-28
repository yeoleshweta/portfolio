import { redirect } from "next/navigation";
import { requireAdmin, AdminAccessError } from "@/lib/admin/auth";
import { analyticsDatabase } from "@/lib/analytics/server";
import AdminDashboard from "@/components/admin/AdminDashboard";
export default async function AdminPage() {
  let email: string | undefined;
  try {
    email = (await requireAdmin()).email;
  } catch (error) {
    if (error instanceof AdminAccessError)
      redirect(`/admin/login${error.status === 403 ? "?error=access" : ""}`);
    throw error;
  }
  return (
    <AdminDashboard
      email={email ?? ""}
      configured={Boolean(analyticsDatabase())}
      collectionEnabled={process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true"}
    />
  );
}
