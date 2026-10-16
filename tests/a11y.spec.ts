import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/",
  "/experience",
  "/work/abim",
  "/work/burton",
  "/work/crypto-secure",
  "/work/design-thinking",
  "/work/dorothy-perkins",
  "/work/evans",
  "/work/fuel-design-system",
  "/work/gesturepro",
  "/work/healthcare-bias",
  "/work/john-deere",
  "/work/miss-selfridge",
  "/work/my-ai-friends",
  "/work/personalization",
  "/work/stories-by-children",
  "/work/team-contract",
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of ROUTES) {
  test(`axe: ${route} has no serious or critical violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
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
