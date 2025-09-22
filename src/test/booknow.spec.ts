import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { Booknow } from "../pages/booknow";

test.describe.only("Book Now Page", () => {
    let booknowPage: Booknow;
    let homepage: Homepage;

    test.beforeEach(async ({ page }) => {
        booknowPage = new Booknow(page);
        homepage = new Homepage(page);
        await homepage.visit();
        await booknowPage.gotorroms();
    });

    test("Save first room values", async () => {
        const firstValues = await booknowPage.bookroomfirstslide_values();
        await booknowPage.clickfirstroom();
        const secondValues = await booknowPage.bookroomsecondslide_values();

    });
})
