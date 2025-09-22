import { Expect, Locator, Page } from "@playwright/test";

export class Homepage {
    readonly page: Page;
    readonly container: Locator;
    readonly cardbody: Locator;
    readonly rooms: Locator;
    readonly location: Locator;
    readonly contact: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.container = page.locator('section').filter({ hasText: 'Welcome to Shady Meadows B&' })
        this.cardbody = page.locator('#booking')
        this.rooms = page.locator('#rooms')
        this.location = page.locator('#location')
        this.contact = page.locator('#contact')
    }
    async visit() {
        await this.page.goto('/');
    }
}

