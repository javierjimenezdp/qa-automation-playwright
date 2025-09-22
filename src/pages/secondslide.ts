import { expect, Expect, Locator, Page } from "@playwright/test";

export class Secondslide {
    readonly page: Page
    readonly bookroom2slide: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bookroom2slide = page.locator('a.btn.btn-primary', { hasText: 'Book now' });
    }   
    async gotosecondslide(){
        await this.bookroom2slide.click();
    }
}