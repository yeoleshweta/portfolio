/** Adapted from the reference portfolio convex/analyticsHelpers.ts. */
export function classifyUserAgent(userAgent?: string) {
  const ua = (userAgent ?? "").toLowerCase();
  const isBot =
    /bot|crawler|spider|headless|lighthouse|slurp|bingpreview|facebookexternalhit/.test(
      ua
    );
  const browser = ua.includes("edg/")
    ? "Edge"
    : ua.includes("chrome/")
      ? "Chrome"
      : ua.includes("safari/") && !ua.includes("chrome/")
        ? "Safari"
        : ua.includes("firefox/")
          ? "Firefox"
          : "Other";
  const os = ua.includes("iphone") || ua.includes("ipad")
    ? "iOS"
    : ua.includes("android")
      ? "Android"
      : ua.includes("mac os")
        ? "macOS"
        : ua.includes("windows")
          ? "Windows"
          : ua.includes("linux")
            ? "Linux"
            : "Other";
  const device = /iphone|android.+mobile|mobile/.test(ua)
    ? "Mobile"
    : /ipad|tablet|android/.test(ua)
      ? "Tablet"
      : "Desktop";
  return { browser, os, device, isBot };
}

