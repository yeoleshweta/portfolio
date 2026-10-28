"use client";
import { useEffect, useState } from "react";
import type {
  AlertSettings as Preferences,
  AlertPeriod,
} from "@/lib/admin/alerts-contract";
import styles from "./admin.module.css";
type Delivery = {
  id: string;
  kind: string;
  status: string;
  observed_count: number;
  threshold: number;
  created_at: string;
  detail: string | null;
};
export default function AlertSettings() {
  const [settings, setSettings] = useState<Preferences>({
    enabled: false,
    period: "day",
    visitors: 25,
    resumeViews: 10,
  });
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);
  const [smtp, setSmtp] = useState(false);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/admin/alerts", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw Error(data.error ?? "Unable to load alert settings.");
        setSettings(data.settings);
        setEmail(data.email);
        setSmtp(data.smtpConfigured);
        setDeliveryEnabled(data.deliveryEnabled);
        setDeliveries(data.deliveries);
        setReady(true);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, []);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    try {
      const response = await fetch("/api/admin/alerts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error ?? "Unable to save alerts.");
      setNotice("Alert settings saved.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className={styles.panel}>
      <h2>Email thresholds</h2>
      <p className={styles.muted}>
        Send to your verified admin account when a threshold is reached. Bots
        and internal visits are excluded.
      </p>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className={styles.notice}>
          {notice}
        </p>
      )}
      {ready ? (
        <>
          <p className={styles.small}>
            Delivery to {email}.{" "}
            {smtp
              ? "Google SMTP is configured."
              : "Google SMTP is not configured; settings can be saved, but email will not send yet."}{" "}
            {!deliveryEnabled &&
              "Live delivery is disabled in this environment. Enable it explicitly on production after verifying SMTP."}
          </p>
          <form onSubmit={save} className={styles.alertForm}>
            <label
              className={styles.setting}
              aria-label="Enable threshold emails"
            >
              <span>
                <strong>Enable threshold emails</strong>
                <small>
                  At most one email per metric in each selected UTC window.
                </small>
              </span>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) =>
                  setSettings({ ...settings, enabled: e.target.checked })
                }
              />
            </label>
            <div className={styles.alertFields}>
              <label>
                Visitor threshold
                <input
                  aria-label="Visitor threshold"
                  type="number"
                  min="1"
                  max="1000000"
                  step="1"
                  placeholder="Off"
                  value={settings.visitors ?? ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      visitors:
                        e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Résumé view threshold
                <input
                  aria-label="Résumé view threshold"
                  type="number"
                  min="1"
                  max="1000000"
                  step="1"
                  placeholder="Off"
                  value={settings.resumeViews ?? ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      resumeViews:
                        e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Counting window
                <select
                  value={settings.period}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      period: e.target.value as AlertPeriod,
                    })
                  }
                >
                  <option value="hour">This hour (UTC)</option>
                  <option value="day">Today (UTC)</option>
                  <option value="week">This week, from Monday (UTC)</option>
                </select>
              </label>
            </div>
            <p className={styles.small}>
              Leave a threshold empty to disable it. Evaluation runs after site
              activity and during scheduled checks. Enabling alerts can include
              activity already recorded in the current window.
            </p>
            <button className={styles.primary} disabled={saving} type="submit">
              {saving ? "Saving…" : "Save email settings"}
            </button>
          </form>
          <h3 className={styles.subheading}>Recent deliveries</h3>
          {deliveries.length ? (
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Alert</th>
                    <th scope="col">Count</th>
                    <th scope="col">Status</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((d) => (
                    <tr key={d.id}>
                      <th scope="row">{d.kind.replaceAll("_", " ")}</th>
                      <td>
                        {d.observed_count} / {d.threshold}
                      </td>
                      <td>
                        {d.status}
                        <small>{d.detail}</small>
                      </td>
                      <td>{new Date(d.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.empty}>No threshold emails yet.</p>
          )}
          <p className={styles.small}>
            Sent means SMTP accepted the email. An uncertain delivery may have
            succeeded and is not resent automatically.
          </p>
        </>
      ) : (
        !error && (
          <p role="status" className={styles.empty}>
            Loading email settings…
          </p>
        )
      )}
    </section>
  );
}
