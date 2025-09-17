import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("/");
  const title = page.locator("h1");
  await expect(title).toHaveText("Welcome to Shady Meadows B&B");
});
