import { expect, test, vi } from "vitest";
import { shareResume } from "../../src/lib/analytics/resume-share";
test("native sharing and clipboard success are distinguished from cancellation", async () => {
  const share = vi.fn(async () => {}),
    copy = vi.fn(async () => {});
  expect(
    await shareResume("https://example.test/resume", { share, copy }),
  ).toBe("shared");
  expect(copy).not.toHaveBeenCalled();
  expect(await shareResume("https://example.test/resume", { copy })).toBe(
    "copied",
  );
  expect(
    await shareResume("https://example.test/resume", {
      share: async () => {
        throw new DOMException("Cancelled", "AbortError");
      },
    }),
  ).toBe("cancelled");
  await expect(
    shareResume("https://example.test/resume", {}),
  ).rejects.toThrow();
});
