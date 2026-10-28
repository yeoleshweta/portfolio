import { authClient } from "@/lib/supabase/server";
import { isAllowedAdmin } from "./filters";
export class AdminAccessError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function requireAdmin() {
  const client = await authClient();
  if (!client)
    throw new AdminAccessError(503, "Administration is not connected yet.");
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user) throw new AdminAccessError(401, "Sign in to continue.");
  if (!isAllowedAdmin(user, process.env.ADMIN_EMAILS ?? ""))
    throw new AdminAccessError(403, "This account does not have admin access.");
  return user;
}
export function adminError(error: unknown) {
  return Response.json(
    {
      error:
        error instanceof AdminAccessError
          ? error.message
          : "Analytics is temporarily unavailable.",
    },
    {
      status: error instanceof AdminAccessError ? error.status : 503,
      headers: { "Cache-Control": "private, no-store" },
    },
  );
}
