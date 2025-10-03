import { test, expect } from "@playwright/test";
import { addMonths, addWeeks, addYears, format } from "date-fns";

/*
test("example test", async ({ page }) => {
  await page.goto("/");

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const weekday = nextWeek.toLocaleDateString("en-US", { weekday: "long" });
  const day = nextWeek.getDate();
  const month = nextWeek.toLocaleDateString("en-US", { month: "long" });
  const year = nextWeek.getFullYear();
  const aria = `Choose ${weekday}, ${day} ${month} ${year}`;

  await page.click(".react-datepicker__input-container");
  await page.getByRole("option", { name: aria }).click();
});
*/
