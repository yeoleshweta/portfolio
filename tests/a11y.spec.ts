import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/",
  "/experience",
  "/work/abim",
  "/work/burton",
  "/work/control-panel",
  "/work/crypto-secure",
  "/work/pm-ux-study",
  "/work/dorothy-perkins",
  "/work/evans",
  "/work/fuel-design-system",
  "/work/gesturepro",
  "/work/healthcare-bias",
  "/work/john-deere-sus",
  "/work/miss-selfridge",
  "/work/my-ai-friends",
  "/work/personalization",
  "/work/poshmera",
  "/work/stories-by-children",
  "/work/team-contract",
  "/work/urbanfit",
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of ROUTES) {
  test(`axe: ${route} has no serious or critical violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Team Contract sits behind a password gate. Unlock it so axe scans the case study, not the form.
    if (route === "/work/team-contract") {
      await page.addInitScript(() => {
        window.localStorage.setItem("team_contract_access", "deere2026");
      });
    }
    await page.goto(route, { waitUntil: "load" });
    await page.waitForTimeout(1500);

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    const summary = blocking.map(
      (v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.length} nodes)`,
    );
    expect(summary, summary.join("\n")).toEqual([]);
  });
}

// The password gate itself, scanned without unlocking, so it stays covered.
test("axe: /work/team-contract password gate has no serious or critical violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work/team-contract", { waitUntil: "load" });

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );
  const summary = blocking.map(
    (v) => `${v.impact} ${v.id}: ${v.help} (${v.nodes.length} nodes)`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
});
