import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { Booknow } from "../pages/booknow";

test.describe("Book Now Page", () => {
    let booknowPage: Booknow;
    let homepage: Homepage;

    test.beforeEach(async ({ page }) => {
        booknowPage = new Booknow(page);
        homepage = new Homepage(page);
        await homepage.visit();
        await booknowPage.gotorroms();
    });

    test("Save first room values", async () => {
        const firstValues = await booknowPage.viewandgetservicesfirstslide();
        await booknowPage.clickfirstroom();
        const secondValues = await booknowPage.viewandgetservicessecondslide();
        expect(secondValues.src).toBe(firstValues.src);
        expect(secondValues.description).toBe(firstValues.description);
        expect(secondValues.tv).toBe(firstValues.tv);
        expect(secondValues.wifi).toBe(firstValues.wifi);
        expect(secondValues.safe).toBe(firstValues.safe);
        expect(secondValues.cost).toBe(firstValues.cost);
    });
})
