"use client";
import Link from "next/link";
import styles from "@/components/admin/admin.module.css";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className={styles.login}>
      <section className={styles.loginCard}>
        <h1>Unable to load administration.</h1>
        <p>Try again, or return once the connection is restored.</p>
        <button className={styles.primary} onClick={reset}>
          Try again
        </button>
        <Link href="/">Back to portfolio</Link>
      </section>
    </main>
  );
}
