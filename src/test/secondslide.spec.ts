

import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { Booknow } from "../pages/booknow";
import { Secondslide } from "../pages/secondslide";

test.describe("Book Now Page 2do test", () => {
    let booknowPage: Booknow;
    let homepage: Homepage;
    let secondslide: Secondslide;   

    test.beforeEach(async ({ page }) => {
        booknowPage = new Booknow(page);
        homepage = new Homepage(page);
        await homepage.visit();
        await booknowPage.gotorroms();
    });

    test("Book a new room", async () => { 
        await booknowPage.gotorroms();

    })
})

/*

        expect(secondValues.src).toBe(firstValues.src);
        expect(secondValues.description).toBe(firstValues.description);
        expect(secondValues.tv).toBe(firstValues.tv);
        expect(secondValues.wifi).toBe(firstValues.wifi);
        expect(secondValues.safe).toBe(firstValues.safe);
        expect(secondValues.cost).toBe(firstValues.cost);

*/