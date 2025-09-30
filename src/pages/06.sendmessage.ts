import { expect, Locator, Page } from "@playwright/test";

export class Location {
    readonly page: Page;
    readonly location: Locator;
    readonly selectlocation: Locator;
    readonly firstcardimage: Locator;

    constructor(page: Page) {
        this.page = page;   
        this.location = page.locator('#root-container #location')
        this.selectlocation = page.locator('#root-container #location .container form .col-md-6 .form-select')
        this.firstcardimage = page.locator('#rooms .container .row.g-4 .col-lg-4 img').first();
    }
    async locationpage() {
        await this.location.scrollIntoViewIfNeeded();
        await expect(this.location).toBeVisible();
    }}