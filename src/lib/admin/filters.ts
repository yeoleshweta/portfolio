export function isAllowedAdmin(
  user: { email?: string; email_confirmed_at?: string } | null,
  allowlist: string,
) {
  return Boolean(
    user?.email &&
      user.email_confirmed_at &&
      allowlist
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
        .includes(user.email.toLowerCase()),
  );
}
export function parseFilters(query: URLSearchParams) {
  const today = new Date().toISOString().slice(0, 10);
  const date = (key: string, fallback: string) => {
    const raw = query.get(key) ?? fallback;
    const parsed = new Date(`${raw}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(raw) ||
      !Number.isFinite(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== raw
    )
      throw Error("Use valid dates");
    return parsed;
  };
  const start = date(
    "from",
    new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10),
  );
  const end = date("to", today);
  end.setUTCDate(end.getUTCDate() + 1);
  if (end <= start || end.getTime() - start.getTime() > 400 * 86400000)
    throw Error("Choose a range of 1–400 days");
  const integer = (key: string, fallback: number, min: number, max: number) => {
    const n = Number(query.get(key) ?? fallback);
    if (!Number.isInteger(n) || n < min || n > max)
      throw Error("Invalid pagination");
    return n;
  };
  const visit = query.get("visit") || null;
  if (
    visit &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      visit,
    )
  )
    throw Error("Invalid visit");
  const kind = query.get("kind") ?? "events";
  if (!["events", "resumes", "contacts", "cases", "visits"].includes(kind))
    throw Error("Invalid activity filter");
  return {
    from: start.toISOString(),
    to: end.toISOString(),
    bots: query.get("bots") === "true",
    internal: query.get("internal") === "true",
    kind,
    offset: integer("offset", 0, 0, 1000000),
    limit: integer("limit", 50, 1, 5000),
    search: (query.get("search") ?? "").slice(0, 100),
    visit,
  };
}
/** Adapted from AdminDashboard CSV export with spreadsheet formula protection. */
export function toCsv(rows: Record<string, unknown>[]) {
  const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const cell = (value: unknown) => {
    let text =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : String(value ?? "");
    if (/^[\s]*[=+\-@]/.test(text) || /^[\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  return [
    columns.map(cell).join(","),
    ...rows.map((row) => columns.map((col) => cell(row[col])).join(",")),
  ].join("\r\n");
}
