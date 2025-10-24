import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/01.homepage";
import { Booknow } from "../../pages/02.booknow";

test.describe("Book Now Page", () => {
  let booknowpage: Booknow;
  let homepage: Homepage;

  test.beforeEach(async ({ page }) => {
    booknowpage = new Booknow(page);
    homepage = new Homepage(page);
    await homepage.visit();
    await booknowpage.gotorroms();
  });

  test("Save first room values", async ({ page }) => {
    const firstValues = await booknowpage.viewandgetservicesfirstslide();
    await booknowpage.clickfirstroom();
    const secondValues = await booknowpage.viewandgetservicessecondslide();
    expect(secondValues.src).toBe(firstValues.src);
    expect(secondValues.description).toBe(firstValues.description);
    expect(secondValues.tv).toBe(firstValues.tv);
    expect(secondValues.wifi).toBe(firstValues.wifi);
    expect(secondValues.safe).toBe(firstValues.safe);
    expect(secondValues.cost).toBe(firstValues.cost);
  });

  test("Cancel reservation", async ({ page }) => {
    await booknowpage.clickfirstroom();
    await booknowpage.reservearoomcancel(" ", " ", " ", " ", page);
  });

  test("Error reservation general", async ({ page }) => {
    await booknowpage.clickfirstroom();
    await booknowpage.reserveroomerrorgeneral("", "", "", "", page);
  });

  test("Error reservation specific", async ({ page }) => {
    await booknowpage.clickfirstroom();
    await booknowpage.reserveroomerrorspecific(
      "Javier",
      "Testing",
      "javier@testing.com",
      "3108948596",
      page,
    );
  });
  test("Success reservation", async ({ page }) => {
    await booknowpage.clickfirstroom();
    await booknowpage.reservearoomsuccess(
      "Javier",
      "Testing",
      "javier@testing.com",
      "31089485962",
      page,
    );
  });
});
