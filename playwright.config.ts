import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

console.log('Sauce creds loaded:', {
  region: process.env.SAUCE_REGION,
  user: process.env.SAUCE_USERNAME ? 'OK' : 'MISSING',
  key: process.env.SAUCE_ACCESS_KEY ? 'OK' : 'MISSING',
});

const isCI = !!process.env.CI;
const SAUCE_REGION = process.env.SAUCE_REGION || 'us-west-1';
const SAUCE_USERNAME = process.env.SAUCE_USERNAME!;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY!;
const sauceWs = `wss://ondemand.${SAUCE_REGION}.saucelabs.com/playwright?username=${encodeURIComponent(SAUCE_USERNAME)}&accessKey=${encodeURIComponent(SAUCE_ACCESS_KEY)}`;

export default defineConfig({
  testDir: "./src/test/e2e",
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
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    serviceWorkers: "block",
  },

  projects: [
    // Desktop
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: 'sauce-chrome', workers:1, use: {browserName: 'chromium', connectOptions: { wsEndpoint: sauceWs,timeout: 180_000,},
        trace: 'off',
        video: 'off',
        screenshot: 'only-on-failure',
      }
    },

    // Mobile emulation
    { name: "Mobile Chrome", use: { ...devices["Pixel 7"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
  ],
});
