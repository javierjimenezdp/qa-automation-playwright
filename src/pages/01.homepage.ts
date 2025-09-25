import { expect, Locator, Page } from "@playwright/test";

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

    async containersnapshot() {
    await expect(this.container).toBeVisible();
    await expect(await this.container.screenshot()).toMatchSnapshot('homepage.png', { maxDiffPixelRatio: 0.02 });
    }

    async cardbodysnapshot() {
    await expect(this.cardbody).toBeVisible();
    await expect(await this.cardbody.screenshot()).toMatchSnapshot('cardbody.png', { maxDiffPixelRatio: 0.02 });
    }

    async roomssnapshot() {
    await expect(this.rooms).toBeVisible();
    await expect(await this.rooms.screenshot()).toMatchSnapshot('rooms.png', { maxDiffPixelRatio: 0.02 });
    }

    async locationsnapshot() {
    await expect(this.location).toBeVisible();
    await expect(await this.location.screenshot()).toMatchSnapshot('location.png', { maxDiffPixelRatio: 0.02 });
    }

    async contactsnapshot() {
    await expect(this.contact).toBeVisible();
    await expect(await this.contact.screenshot()).toMatchSnapshot('contact.png', { maxDiffPixelRatio: 0.02 });
    }
}

