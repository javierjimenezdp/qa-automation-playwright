import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./src/test/visual",

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [["html", { open: "never" }], ["list"]]
    : [["html", { open: "never" }]],

  expect: {
    timeout: 5_000,
  },

  use: {
    baseURL: process.env.BASE_URL || "https://automationintesting.online",
    headless: true,
    actionTimeout: 0,
    navigationTimeout: 30_000,
    trace: "on-first-retry",
    video: "off",
    screenshot: "off",
  },

  projects: [
    // Desktop
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },

    // Mobile emulation
    { name: "Mobile Chrome", use: { ...devices["Pixel 7"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
  ],
});
