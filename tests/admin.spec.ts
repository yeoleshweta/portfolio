import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function login(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel("Email", { exact: true }).fill("admin@example.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill("local-test-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Overview", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/Updated .*Refreshes/)).toBeVisible();
}
test("private APIs deny anonymous reads and login stays separate from public presentation", async ({
  page,
  request,
}) => {
  const r = await request.get("/api/admin/analytics");
  expect(r.status()).toBe(401);
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(
    page.getByRole("heading", { name: /Your portfolio/ }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /View résumé/ })).toHaveCount(0);
  const violations = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    violations.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});
test("real SQL reports, visitor timelines, filters and exports work through authenticated routes", async ({
  page,
}) => {
  await login(page);
  await page.screenshot({
    path: "test-results/admin-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Case studies", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "What people spend time with" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Abim", exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Audience", exact: true }).click();
  await expect(page.getByText("Browser 11111111")).toBeVisible();
  await page
    .getByRole("button", { name: /Open journey/ })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText("Research", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV" }).click();
  expect((await download).suggestedFilename()).toContain("visits");
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("checkbox", { name: "Exclude this browser" }).check();
  expect(
    await page.evaluate(() => localStorage.getItem("sw_analytics_excluded")),
  ).toBe("true");
  await page.getByRole("button", { name: "Overview", exact: true }).click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: "test-results/admin-mobile.png",
    animations: "disabled",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/admin\/login/);
  expect((await page.request.get("/api/admin/analytics")).status()).toBe(401);
});
test("consent controls collection and resume viewing is distinct from downloads", async ({
  page,
}) => {
  const batches: { events: { name: string; path: string }[] }[] = [];
  await page.route("**/api/analytics", async (route) => {
    batches.push(route.request().postDataJSON());
    await route.continue();
  });
  await page.goto("/resume?from=hero");
  await expect(
    page.getByRole("region", { name: "Analytics cookie notice" }),
  ).toBeVisible();
  expect(batches.length).toBe(0);
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect
    .poll(
      () =>
        batches
          .flatMap((b) => b.events)
          .some((e) => e.name === "resume_viewed"),
      { timeout: 15000 },
    )
    .toBe(true);
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download PDF", exact: true }).click();
  expect((await download).suggestedFilename()).toBe("Shweta_Sharma_Resume.pdf");
  await expect
    .poll(
      () =>
        batches
          .flatMap((b) => b.events)
          .some((e) => e.name === "resume_downloaded"),
      { timeout: 15000 },
    )
    .toBe(true);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.evaluate(() =>
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
    }),
  );
  await page.getByRole("button", { name: "Share résumé", exact: true }).click();
  await expect(
    page.getByText("Résumé link copied.", { exact: true }),
  ).toBeVisible();
  await expect
    .poll(
      () =>
        batches
          .flatMap((b) => b.events)
          .some((e) => e.name === "resume_shared"),
      { timeout: 15000 },
    )
    .toBe(true);
  await page.getByRole("button", { name: "Privacy settings" }).click();
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("sw_analytics_browser")),
  ).toBeNull();
  const count = batches.length;
  await page.reload();
  await page.waitForTimeout(6000);
  expect(batches.length).toBe(count);
  await login(page);
  await expect(
    page.getByRole("heading", { name: "Overview", exact: true }),
  ).toBeVisible();
  const report = await page.request.get("/api/admin/analytics");
  expect(report.ok()).toBe(true);
  const data = await report.json();
  expect(data.totals.resumeDownloads).toBeGreaterThanOrEqual(1);
});

test("consent grants and revocation synchronize across open tabs", async ({
  page,
  context,
}) => {
  await page.goto("/resume");
  const second = await context.newPage();
  const batches: { events: { name: string }[] }[] = [];
  await second.route("**/api/analytics", async (route) => {
    batches.push(route.request().postDataJSON());
    await route.continue();
  });
  await second.goto("/resume");
  await expect(
    second.getByRole("region", { name: "Analytics cookie notice" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect
    .poll(
      () =>
        batches.flatMap((b) => b.events).some((e) => e.name === "page_view"),
      { timeout: 15000 },
    )
    .toBe(true);
  await page.getByRole("button", { name: "Privacy settings" }).click();
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  await expect
    .poll(() =>
      second.evaluate(() => localStorage.getItem("sw_analytics_browser")),
    )
    .toBeNull();
  const count = batches.length;
  await second.waitForTimeout(6000);
  expect(batches.length).toBe(count);
  await second.close();
});

test("dark mode persists and chart metrics remain accessible", async ({
  page,
}) => {
  await login(page);
  await page.getByLabel("Admin appearance").selectOption("dark");
  await expect(page.locator("[data-admin-root]")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await page
    .getByLabel("Chart metric", { exact: true })
    .selectOption("resumeShares");
  await page.getByRole("button", { name: "Bars", exact: true }).click();
  await expect(page.getByRole("img", { name: /Résumé shares:/ })).toBeVisible();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await page.screenshot({
    path: "test-results/admin-dark.png",
    fullPage: true,
  });
  await page.reload();
  await expect(page.locator("[data-admin-root]")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/admin-dark-mobile.png" });
});

test("Resend settings persist and the GA tag alone does not expose reports", async ({
  page,
}) => {
  await login(page);
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Email thresholds", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Visitor threshold", { exact: true }),
  ).toHaveValue("25");
  await page.getByLabel("Visitor threshold", { exact: true }).fill("50");
  await page.getByLabel("Résumé view threshold", { exact: true }).fill("15");
  await page.getByRole("checkbox", { name: "Enable threshold emails" }).check();
  await page.getByRole("button", { name: "Save email settings" }).click();
  await expect(
    page.getByText("Alert settings saved.", { exact: true }),
  ).toBeVisible();
  const saved = await (await page.request.get("/api/admin/alerts")).json();
  expect(saved.settings).toMatchObject({
    enabled: true,
    visitors: 50,
    resumeViews: 15,
  });
  expect(saved.emailConfigured).toBe(false);
  expect(saved.deliveryEnabled).toBe(false);
  await page
    .getByRole("checkbox", { name: "Enable threshold emails" })
    .uncheck();
  await page.getByRole("button", { name: "Save email settings" }).click();
  await expect(
    page.getByText("Alert settings saved.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Google Analytics", exact: true })
    .click();
  await expect(
    page.getByText(/The tracking tag collects events, but report access needs/),
  ).toBeVisible();
});

test("Resume section shows report totals, focused charts and filtered visitor activity", async ({ page }) => {
  await login(page);
  const nav = page.getByRole("navigation", { name: "Admin sections" });
  await nav.getByRole("button", { name: "Resume", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Resume", exact: true })).toBeVisible();
  await expect(nav.getByRole("button", { name: "Resume", exact: true })).toHaveAttribute("aria-current", "page");
  const report = await (await page.request.get("/api/admin/analytics")).json();
  const metrics = page.getByRole("region", { name: "Resume metrics" });
  for (const [label, key] of [["Résumé views", "resumeViews"], ["Download clicks", "resumeDownloads"], ["Résumé shares", "resumeShares"]] as const) {
    await expect(metrics.locator("article").filter({ has: page.getByText(label, { exact: true }) }).locator("strong")).toHaveText(report.totals[key].toLocaleString());
  }
  await expect(page.getByLabel("Chart metric")).toHaveValue("resumeViews");
  await expect(page.getByLabel("Chart metric").locator("option")).toHaveCount(3);
  await page.getByLabel("Chart metric").selectOption("resumeShares");
  await expect(page.getByRole("heading", { name: "Résumé interest" })).toBeVisible();
  await page.getByLabel("Admin appearance").selectOption("dark");
  await page.screenshot({ path: "test-results/admin-resume-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/admin-resume-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "View résumé activity", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Activity", exact: true })).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Show", exact: true })).toHaveValue("resumes");
});

test("tabs reset scroll and every report table can page independently", async ({ page }) => {
  await page.route("**/api/admin/analytics?**", async (route) => {
    if (new URL(route.request().url()).searchParams.has("view")) return route.continue();
    const response = await route.fetch();
    const data = await response.json();
    data.placements = Array.from({length: 24}, (_, i) => ({label: `Placement ${i + 1}`, views: 2, downloads: 1, shares: 0}));
    data.cases = Array.from({length: 24}, (_, i) => ({path: `/work/study-${i + 1}`, views: 2, readers: 1, completed: 0, active_seconds: 30}));
    data.sections = Array.from({length: 24}, (_, i) => ({path: "/work/abim", label: `Section ${i + 1}`, section_id: `section-${i}`, visits: 1}));
    await route.fulfill({response, json: data});
  });
  const gaRows = Array.from({length: 24}, (_, i) => ({dimensions: {date: `202610${String(i + 1).padStart(2,"0")}`, country: `Country ${i + 1}`, sessionSourceMedium: `Source ${i + 1}`, deviceCategory: "desktop", browser: `Browser ${i + 1}`, eventName: `event_${i + 1}`}, metrics: {activeUsers: 2, screenPageViews: 3, sessions: 4, engagementRate: 0.5, eventCount: 5}}));
  await page.route("**/api/admin/google-analytics?**", (route) => route.fulfill({json: {configured: true, fetchedAt: new Date().toISOString(), timezone: "UTC", totals: {}, daily: gaRows, countries: gaRows, sources: gaRows, events: gaRows, devices: gaRows, activeUsers30m: 0, warnings: [], thresholded: false, sampled: false, otherRowLoss: false}}));
  await page.route("**/api/admin/alerts", async (route) => {
    const response = await route.fetch();
    const data = await response.json();
    data.deliveries = Array.from({length: 20}, (_, i) => ({id: String(i), kind: "visitors", status: "sent", observed_count: 25, threshold: 25, created_at: new Date().toISOString(), detail: "Synthetic fixture"}));
    await route.fulfill({response, json: data});
  });
  await login(page);
  const nav = page.getByRole("navigation", {name: "Admin sections"});
  await nav.getByRole("button", {name: "Resume", exact: true}).click();
  const placements = page.getByRole("navigation", {name: "Résumé placements pagination"});
  await expect(placements.getByText("1–10 of 24", {exact: true})).toBeVisible();
  await placements.getByRole("button", {name: "Next", exact: true}).click();
  await expect(placements.getByText("11–20 of 24", {exact: true})).toBeVisible();
  await expect(page.getByRole("rowheader", {name: "Placement 11", exact: true})).toBeVisible();
  await placements.getByLabel("Résumé placements rows per page").selectOption("25");
  await expect(placements.getByText("1–24 of 24", {exact: true})).toBeVisible();
  await expect(placements.getByRole("button", {name: "Next", exact: true})).toBeDisabled();
  await page.getByText("View chart data", {exact: true}).click();
  const chart = page.getByRole("navigation", {name: "Résumé views chart data pagination"});
  await chart.getByRole("button", {name: "Next", exact: true}).click();
  await expect(chart.getByText(/Page 2 of/)).toBeVisible();
  await page.getByLabel("Chart metric").selectOption("resumeDownloads");
  await page.getByLabel("Chart metric").selectOption("resumeViews");
  await expect(chart.getByText(/Page 1 of/)).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 600));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await nav.getByRole("button", {name: "Case studies", exact: true}).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  for (const label of ["Case studies", "Case study sections"]) {
    const pager = page.getByRole("navigation", {name: `${label} pagination`});
    await pager.getByRole("button", {name: "Next", exact: true}).click();
    await expect(pager.getByText("11–20 of 24", {exact: true})).toBeVisible();
  }
  await page.getByRole("button", {name: "7 days", exact: true}).click();
  await expect(page.getByRole("navigation", {name: "Case studies pagination"}).getByText("1–10 of 24", {exact: true})).toBeVisible();
  await page.getByRole("button", {name: "30 days", exact: true}).click();
  await expect(page.getByRole("navigation", {name: "Case studies pagination"}).getByText("1–10 of 24", {exact: true})).toBeVisible();
  await nav.getByRole("button", {name: "Google Analytics", exact: true}).click();
  for (const label of ["Daily traffic", "Top countries", "Top sources", "Devices and browsers", "Top events"]) {
    const pager = page.getByRole("navigation", {name: `${label} pagination`});
    await pager.getByRole("button", {name: "Next", exact: true}).click();
    await expect(pager.getByText("11–20 of 24", {exact: true})).toBeVisible();
  }
  await nav.getByRole("button", {name: "Settings", exact: true}).click();
  const deliveries = page.getByRole("navigation", {name: "Email deliveries pagination"});
  await deliveries.getByRole("button", {name: "Next", exact: true}).click();
  await expect(deliveries.getByText("11–20 of 20", {exact: true})).toBeVisible();
  await page.setViewportSize({width: 390, height: 844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({path: "test-results/admin-pagination-mobile.png", fullPage: true});
});
