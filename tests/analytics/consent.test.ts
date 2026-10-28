import { afterEach, expect, test, vi } from "vitest";
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
});
test("cross-tab revocation updates GA consent, disables GA, and notifies route tracking", async () => {
  vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST0000");
  const data = new Map<string, string>([["sw_consent_v1", "granted"]]);
  const events = new EventTarget();
  const gtag = vi.fn();
  const win = {
    location: { pathname: "/" },
    localStorage: {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => data.set(k, v),
      removeItem: (k: string) => data.delete(k),
    },
    gtag,
    dispatchEvent: events.dispatchEvent.bind(events),
  } as Record<string, unknown>;
  vi.stubGlobal("window", win);
  const analytics = await import("../../src/lib/analytics");
  const listener = vi.fn();
  events.addEventListener(analytics.CONSENT_EVENT, listener);
  data.set("sw_consent_v1", "denied");
  analytics.syncConsentFromStorage();
  expect(win["ga-disable-G-TEST0000"]).toBe(true);
  expect(gtag).toHaveBeenCalledWith(
    "consent",
    "update",
    expect.objectContaining({ analytics_storage: "denied" }),
  );
  expect(listener).toHaveBeenCalledTimes(1);
  data.set("sw_consent_v1", "granted");
  analytics.syncConsentFromStorage();
  expect(win["ga-disable-G-TEST0000"]).toBe(false);
  expect(listener).toHaveBeenCalledTimes(2);
  analytics.setConsent("granted");
  expect(listener).toHaveBeenCalledTimes(2);
});

test("clearing persisted consent does not retain a stale in-memory grant", async () => {
  const data = new Map<string, string>();
  const events = new EventTarget();
  vi.stubGlobal("window", {
    location: { pathname: "/" },
    localStorage: {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => data.set(k, v),
      removeItem: (k: string) => data.delete(k),
    },
    dispatchEvent: events.dispatchEvent.bind(events),
  });
  const analytics = await import("../../src/lib/analytics");
  analytics.setConsent("granted");
  data.clear();
  expect(analytics.readConsent()).toBeNull();
  analytics.syncConsentFromStorage();
  expect(analytics.readConsent()).not.toBe("granted");
});
