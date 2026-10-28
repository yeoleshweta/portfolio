import { expect, test } from "vitest";
import {
  isAllowedAdmin,
  parseFilters,
  toCsv,
} from "../../src/lib/admin/filters";
test("requires a verified allowlisted admin, including direct API access", () => {
  expect(isAllowedAdmin(null, "owner@example.com")).toBe(false);
  expect(
    isAllowedAdmin({ email: "owner@example.com" }, "owner@example.com"),
  ).toBe(false);
  expect(
    isAllowedAdmin(
      { email: "other@example.com", email_confirmed_at: "2026-01-01" },
      "owner@example.com",
    ),
  ).toBe(false);
  expect(
    isAllowedAdmin(
      { email: "OWNER@example.com", email_confirmed_at: "2026-01-01" },
      " owner@example.com ",
    ),
  ).toBe(true);
  expect(
    isAllowedAdmin(
      { email: "owner@example.com", email_confirmed_at: "2026-01-01" },
      "",
    ),
  ).toBe(false);
});
test("date filters use inclusive UTC days and reject invalid or excessive ranges", () => {
  const f = parseFilters(
    new URLSearchParams(
      "from=2026-10-01&to=2026-10-27&bots=true&internal=false",
    ),
  );
  expect(f.from).toBe("2026-10-01T00:00:00.000Z");
  expect(f.to).toBe("2026-10-28T00:00:00.000Z");
  expect(f.bots).toBe(true);
  expect(f.internal).toBe(false);
  for (const query of [
    "from=2026-02-30",
    "from=2026-10-28&to=2026-10-01",
    "from=2020-01-01&to=2026-10-27",
    "offset=-1",
    "limit=5001",
    "visit=not-a-uuid",
  ])
    expect(() => parseFilters(new URLSearchParams(query))).toThrow();
});
test("CSV escapes quotes, preserves newlines and neutralizes spreadsheet formulas", () => {
  const csv = toCsv([
    { name: '=HYPERLINK("bad")', path: "test,here", detail: "two\nlines" },
    { name: " @SUM(1)", path: "normal", detail: 'quote"' },
  ]);
  expect(csv).toContain('"\'=HYPERLINK(""bad"")"');
  expect(csv).toContain('"test,here"');
  expect(csv).toContain('"two\nlines"');
  expect(csv).toContain('"\' @SUM(1)"');
});
