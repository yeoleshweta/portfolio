import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  expect: { timeout: 15000 },
  testDir: "./tests",
  testMatch: "admin.spec.ts",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3107", trace: "retain-on-failure" },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: [
    {
      command: "node tests/support/supabase.mjs",
      url: "http://127.0.0.1:54329/health",
      reuseExistingServer: false,
      timeout: 30000,
    },
    {
      command: "npm run dev -- --port 3107",
      url: "http://localhost:3107",
      reuseExistingServer: false,
      timeout: 120000,
      env: {
        SUPABASE_URL: "http://127.0.0.1:54329",
        SUPABASE_SERVICE_ROLE_KEY: "test-service-key-only",
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54329",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key-only",
        ADMIN_EMAILS: "admin@example.test",
        NEXT_PUBLIC_ANALYTICS_ENABLED: "true",
        NEXT_PUBLIC_GA_ID: "",
        SITE_URL: "http://localhost:3107",
        RESEND_API_KEY: "",
        RESEND_FROM_EMAIL: "",
        ALERT_DELIVERY_ENABLED: "false",
        GOOGLE_SERVICE_ACCOUNT_JSON: "",
        GA_PROPERTY_ID: "",
        CRON_SECRET: "test-cron-secret-only",
        NEXT_DIST_DIR: ".next-admin-test",
      },
    },
  ],
});
