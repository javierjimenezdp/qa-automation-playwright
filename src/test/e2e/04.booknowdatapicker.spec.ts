import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/01.homepage";
import { Booknow } from "../../pages/02.booknow";
import { Booknowdatapicker } from "../../pages/04.booknowdatapicker";
import { addMonths, addWeeks, addYears, format } from "date-fns"; 

test.describe("Booknow Datepicker Functionality", () => {
  let homepage: Homepage;
  let booknowpage: Booknow;
  let booknowdatapicker: Booknowdatapicker;

  test.beforeEach(async ({ page }) => {
      await page.route('**/*', route => {
    const h = { ...route.request().headers(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    route.continue({ headers: h });
  });
    homepage = new Homepage(page);
    booknowpage = new Booknow(page);
    booknowdatapicker = new Booknowdatapicker(page);
    await homepage.visit();
    await booknowdatapicker.bookingpage();
  });

  test("Select Check-in and Check-out Dates Using Datepicker", async ({ page }) => {
    await booknowdatapicker.booknowdatecheckin(page);
    await booknowdatapicker.booknowdatecheckout(page);
    await booknowdatapicker.checkavaialibilityclick();
    await booknowdatapicker.waitFirstCardReady();
    const firstValues = await booknowpage.viewandgetservicesfirstslide();
    await booknowpage.clickfirstroom();
    const secondValues = await booknowpage.viewandgetservicessecondslide();
    expect(secondValues.src).toBe(firstValues.src);
    expect(secondValues.description).toBe(firstValues.description);
    expect(secondValues.tv).toBe(firstValues.tv);
    expect(secondValues.wifi).toBe(firstValues.wifi);
    expect(secondValues.safe).toBe(firstValues.safe);
    expect(secondValues.cost).toBe(firstValues.cost);
    await booknowpage.reservearoomsuccess("Javier", "Testing", "javier@testing.com", "31089485962", page);

  })

});