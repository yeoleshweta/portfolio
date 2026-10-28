import { expect, test } from "vitest";
import { VisibleTime } from "../../src/lib/analytics/engagement";
test("protected gate time is excluded; final content time survives departure before the next timer", () => {
  const time = new VisibleTime(0, true, false);
  expect(time.checkpoint(10000, true)).toBe(0);
  time.activate(12000, true);
  expect(time.checkpoint(18000, true)).toBe(6);
  expect(time.checkpoint(21000, false)).toBe(3);
  expect(time.checkpoint(50000, false)).toBe(0);
});
test("consent changes reset the time baseline and hidden tabs never accumulate time", () => {
  const time = new VisibleTime(0, true, true);
  time.reset(10000, true);
  expect(time.checkpoint(13000, false)).toBe(3);
  expect(time.checkpoint(20000, true)).toBe(0);
  expect(time.checkpoint(25000, true)).toBe(5);
});
