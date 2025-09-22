/*

import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";

test.describe("Homepage", () => {
    let homepage: Homepage;

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        await homepage.visit();
    });

    test("should display the main container", async () => {
        await expect(homepage.container).toBeVisible();
    });

    test("should display the booking card", async () => {
        await expect(homepage.cardbody).toBeVisible();
    });

    test("should display the rooms section", async () => {
        await expect(homepage.rooms).toBeVisible();
    });

    test("should display the location section", async () => {
        await expect(homepage.location).toBeVisible();
    });

    test("should display the contact section", async () => {
        await expect(homepage.contact).toBeVisible();
    }); 

})

*/