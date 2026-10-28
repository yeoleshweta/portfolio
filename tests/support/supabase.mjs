// Local test adapter only. Uses real PostgreSQL RPCs and synthetic Auth accounts.
// Production never imports this file, and uses Supabase Auth for verification.
import http from "node:http";
import fs from "node:fs";
import { PGlite } from "@electric-sql/pglite";
const db = new PGlite();
await db.exec(
  "CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;",
);
for (const file of fs.readdirSync("supabase/migrations").sort())
  await db.exec(fs.readFileSync(`supabase/migrations/${file}`, "utf8"));
const browser = "11111111-1111-4111-8111-111111111111",
  visit = "22222222-2222-4222-8222-222222222222";
await db.query("SELECT public.ingest_analytics($1::jsonb,$2,$3::jsonb)", [
  JSON.stringify({
    browserId: browser,
    visitId: visit,
    path: "/work/abim",
    referrer: "linkedin.com",
    events: [
      { id: crypto.randomUUID(), name: "page_view", path: "/", params: {} },
      {
        id: crypto.randomUUID(),
        name: "case_study_view",
        path: "/work/abim",
        params: { project_slug: "abim" },
      },
      {
        id: crypto.randomUUID(),
        name: "case_study_section_view",
        path: "/work/abim",
        params: { section_label: "Research", section_id: "research" },
      },
      {
        id: crypto.randomUUID(),
        name: "resume_viewed",
        path: "/resume",
        params: { location: "hero" },
      },
    ],
  }),
  "fixture",
  JSON.stringify({
    device: "Desktop",
    browser: "Chrome",
    os: "macOS",
    isBot: false,
  }),
]);
const user = {
  id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  email: "admin@example.test",
  aud: "authenticated",
  role: "authenticated",
  email_confirmed_at: "2026-01-01T00:00:00Z",
  created_at: "2026-01-01T00:00:00Z",
  app_metadata: { provider: "email" },
  user_metadata: {},
};
const token = [
  Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString(
    "base64url",
  ),
  Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: "authenticated",
      aud: "authenticated",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    }),
  ).toString("base64url"),
  "local-test-signature",
].join(".");
const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const url = new URL(req.url, "http://127.0.0.1:54329");
  let text = "";
  for await (const chunk of req) text += chunk;
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    res.writeHead(400).end("{}");
    return;
  }
  if (url.pathname === "/health") {
    res.end('{"ok":true}');
    return;
  }
  if (
    url.pathname === "/auth/v1/token" &&
    body.email === user.email &&
    body.password === "local-test-password"
  ) {
    res.end(
      JSON.stringify({
        access_token: token,
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "local-test-refresh",
        user,
      }),
    );
    return;
  }
  if (
    url.pathname === "/auth/v1/user" &&
    req.headers.authorization === `Bearer ${token}`
  ) {
    res.end(JSON.stringify(user));
    return;
  }
  if (url.pathname === "/auth/v1/logout") {
    res.writeHead(204).end();
    return;
  }
  if (url.pathname.startsWith("/auth/")) {
    res.writeHead(401).end('{"message":"Invalid login credentials"}');
    return;
  }
  if (req.headers.authorization !== "Bearer test-service-key-only") {
    res.writeHead(403).end('{"message":"Forbidden"}');
    return;
  }
  const functions = {
    ingest_analytics: ["p_batch", "p_source", "p_dimensions"],
    analytics_report: ["p_from", "p_to", "p_bots", "p_internal"],
    analytics_activity: [
      "p_from",
      "p_to",
      "p_bots",
      "p_internal",
      "p_kind",
      "p_offset",
      "p_limit",
      "p_search",
      "p_visit",
    ],
    analytics_visits_page: [
      "p_from",
      "p_to",
      "p_bots",
      "p_internal",
      "p_offset",
      "p_limit",
      "p_search",
    ],
    prune_analytics: [],
  };
  const name = url.pathname.split("/").at(-1);
  try {
    if (
      url.pathname.startsWith("/rest/v1/rpc/") &&
      Object.hasOwn(functions, name)
    ) {
      const keys = functions[name];
      const args = keys.map((k) =>
        typeof body[k] === "object" && body[k] !== null
          ? JSON.stringify(body[k])
          : (body[k] ?? null),
      );
      const { rows } = await db.query(
        `SELECT public.${name}(${keys.map((_, i) => "$" + (i + 1)).join(",")}) AS result`,
        args,
      );
      res.end(JSON.stringify(rows[0].result));
      return;
    }
    if (
      url.pathname === "/rest/v1/analytics_visits" &&
      req.method === "PATCH"
    ) {
      const id = url.searchParams.get("id")?.replace(/^eq\./, "");
      await db.query(
        "UPDATE public.analytics_visits SET is_internal=$1 WHERE id=$2",
        [body.is_internal, id],
      );
      res.writeHead(204).end();
      return;
    }
    res.writeHead(404).end("{}");
  } catch (error) {
    res.writeHead(400).end(JSON.stringify({ message: error.message }));
  }
});
server.listen(54329, "127.0.0.1", () =>
  console.log("Local PostgreSQL/Auth test adapter ready"),
);
