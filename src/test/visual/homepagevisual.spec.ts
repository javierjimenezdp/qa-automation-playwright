import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/01.homepage";

test.describe.only("Homepage Visual Tests", () => {
    let homepage: Homepage; 

    test.beforeEach(async ({ page }) => {
        homepage = new Homepage(page);
        await homepage.visit();
    });

    test("Container Visual Test", async (page) => {
        await homepage.containersnapshot();
    });
    test("Card Body Visual Test", async () => {
        await homepage.cardbodysnapshot();
    }); 
    test("Rooms Section Visual Test", async () => {
        await homepage.roomssnapshot();
    });
    test("Location Section Visual Test", async () => {
        await homepage.locationsnapshot();
    });     
    test("Contact Section Visual Test", async () => {
        await homepage.contactsnapshot();
    });
})