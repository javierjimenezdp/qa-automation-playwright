import { test, expect } from "@playwright/test";
import { addMonths, addWeeks, addYears, format } from "date-fns";

test.describe("Example Test Suite", () => {
  test("checkIn", async ({ page }) => {
    await page.goto("/");
    const inputs = page.locator(".react-datepicker__input-container input");

    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const weekday = nextWeek.toLocaleDateString("en-US", { weekday: "long" });
    const day = nextWeek.getDate();
    const month = nextWeek.toLocaleDateString("en-US", { month: "long" });
    const year = nextWeek.getFullYear();
    const aria = `Choose ${weekday}, ${day} ${month} ${year}`;

    await inputs.nth(0).click();
    await page.getByRole("option", { name: aria }).click();
  });

  test("checkOut", async ({ page }) => {
    await page.goto("/");
    const inputs = page.locator(".react-datepicker__input-container input");

    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 15);

    const weekday = nextWeek.toLocaleDateString("en-US", { weekday: "long" });
    const day = nextWeek.getDate();
    const month = nextWeek.toLocaleDateString("en-US", { month: "long" });
    const year = nextWeek.getFullYear();
    const aria = `Choose ${weekday}, ${day} ${month} ${year}`;

    await inputs.nth(1).click();
    await page.getByRole("option", { name: aria }).click();
  });
});
