import Link from "next/link";
import { signIn } from "../actions";
import { authConfigured } from "@/lib/supabase/server";
import styles from "@/components/admin/admin.module.css";
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className={styles.login}>
      <Link href="/" className={styles.back}>
        Back to portfolio
      </Link>
      <section className={styles.loginCard}>
        <p className={styles.wordmark}>
          Shweta Sharma<span> / private</span>
        </p>
        <h1>
          Your portfolio,
          <br />
          in perspective.
        </h1>
        <p className={styles.muted}>
          Sign in to see visits, reading patterns, and the actions that follow.
        </p>
        {!authConfigured() ? (
          <p className={styles.notice} role="status">
            Administration is not connected yet. Complete the Supabase setup to
            enable sign-in.
          </p>
        ) : (
          <form action={signIn} className={styles.loginForm}>
            <label>
              Email
              <input
                type="email"
                name="email"
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <p role="alert" className={styles.error}>
                Unable to sign in. Check your credentials and admin access.
              </p>
            )}
            <button className={styles.primary} type="submit">
              Sign in
            </button>
            <p className={styles.small}>
              Access is limited to approved administrators.
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
