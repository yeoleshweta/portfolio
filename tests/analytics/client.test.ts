import type { AnalyticsBatch } from "../../src/lib/analytics/contract";
import { expect, test, vi } from "vitest";
import {
  AnalyticsCollector,
  type CollectorEnvironment,
} from "../../src/lib/analytics/client";
function setup() {
  let now = 1000000;
  let consent = true;
  let path = "/";
  let fail = false;
  const data = new Map<string, string>();
  const send = vi.fn(
    async (_batch: AnalyticsBatch, _signal: AbortSignal) => !fail,
  );
  const env: CollectorEnvironment = {
    enabled: true,
    storage: {
      getItem: (k) => data.get(k) ?? null,
      setItem: (k, v) => {
        data.set(k, v);
      },
      removeItem: (k) => {
        data.delete(k);
      },
    },
    now: () => now,
    uuid: () => crypto.randomUUID(),
    consented: () => consent,
    path: () => path,
    referrer: () => "",
    campaign: () => ({}),
    send,
  };
  return {
    collector: new AnalyticsCollector(env),
    env,
    send,
    data,
    setTime: (n: number) => {
      now = n;
    },
    deny: () => {
      consent = false;
    },
    path: (s: string) => {
      path = s;
    },
    fail: () => {
      fail = true;
    },
    recover: () => {
      fail = false;
    },
  };
}
test("does not identify or send visitors before consent; revocation clears pending data", async () => {
  const s = setup();
  s.deny();
  s.collector.collect("page_view", {});
  await s.collector.flush();
  expect(s.data.size).toBe(0);
  expect(s.send).not.toHaveBeenCalled();
  const x = setup();
  x.collector.collect("page_view", {});
  x.deny();
  await x.collector.flush();
  expect(x.data.size).toBe(0);
  expect(x.send).not.toHaveBeenCalled();
});
test("separates persistent browser identity from visits after thirty idle minutes", async () => {
  const s = setup();
  s.collector.collect("page_view", {});
  await s.collector.flush();
  s.setTime(1000000 + 31 * 60000);
  s.collector.collect("page_view", {});
  await s.collector.flush();
  const first = s.send.mock.calls[0][0];
  const next = s.send.mock.calls[1][0];
  expect(first.browserId).toBe(next.browserId);
  expect(first.visitId).not.toBe(next.visitId);
});
test("failed retries retain event IDs, and route changes retain each event path", async () => {
  const s = setup();
  s.fail();
  s.collector.collect("page_view", {});
  await s.collector.flush();
  s.path("/work/abim");
  s.collector.collect("case_study_view", { project_slug: "abim" });
  s.recover();
  await s.collector.flush();
  expect(s.send.mock.calls[0][0].events[0].id).toBe(
    s.send.mock.calls[1][0].events[0].id,
  );
  expect(s.send.mock.calls[1][0].events.map((e) => e.path)).toEqual([
    "/",
    "/work/abim",
  ]);
});
test("blocked storage falls back to in-memory identity without breaking collection", async () => {
  const s = setup();
  s.env.storage = {
    getItem: () => {
      throw Error("blocked");
    },
    setItem: () => {
      throw Error("blocked");
    },
    removeItem: () => {
      throw Error("blocked");
    },
  };
  s.collector.collect("page_view", {});
  await s.collector.flush();
  expect(s.send).toHaveBeenCalledTimes(1);
});
test("admin routes and internal exclusion never generate traffic", async () => {
  const s = setup();
  s.path("/admin");
  s.collector.collect("page_view", {});
  await s.collector.flush();
  expect(s.send).not.toHaveBeenCalled();
  s.path("/");
  s.data.set("sw_analytics_excluded", "true");
  s.collector.collect("page_view", {});
  await s.collector.flush();
  expect(s.send).not.toHaveBeenCalled();
});
test("an old visit queue cannot revive after consent is withdrawn during an in-flight request", async () => {
  const s = setup();
  let resolve!: (ok: boolean) => void;
  s.env.send = () =>
    new Promise((r) => {
      resolve = r;
    });
  s.collector.collect("page_view", {});
  const pending = s.collector.flush();
  s.deny();
  s.collector.reset();
  resolve(false);
  await pending;
  s.recover();
  await s.collector.flush();
  expect(s.data.size).toBe(0);
});
