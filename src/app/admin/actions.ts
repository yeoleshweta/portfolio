"use server";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/supabase/server";
import { isAllowedAdmin } from "@/lib/admin/filters";
export async function signIn(form: FormData) {
  const email = String(form.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(form.get("password") ?? "");
  const client = await authClient();
  if (!client) redirect("/admin/login?error=unconfigured");
  if (
    !email ||
    !password ||
    !process.env.ADMIN_EMAILS?.split(",")
      .map((e) => e.trim().toLowerCase())
      .includes(email)
  )
    redirect("/admin/login?error=credentials");
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error || !isAllowedAdmin(data.user, process.env.ADMIN_EMAILS ?? "")) {
    await client.auth.signOut();
    redirect("/admin/login?error=credentials");
  }
  redirect("/admin");
}
export async function signOut() {
  const client = await authClient();
  await client?.auth.signOut();
  redirect("/admin/login");
}
