import { expect, Expect, Locator, Page } from "@playwright/test";

export class Booknow {
    readonly page: Page;
    readonly bottonnow: Locator;

    readonly ourrooms: Locator;
    readonly availability: Locator;
    readonly firstoption: Locator;
    readonly photo: Locator;
    readonly description: Locator
    readonly tvservice: Locator;
    readonly wifiservice: Locator;
    readonly safeservice: Locator;
    //readonly costservice: Locator;

    readonly bottonbooknow: Locator;
    readonly photo2slide: Locator;
    readonly description2slide: Locator;
    readonly tvservice2slide: Locator;
    readonly wifiservice2slide: Locator;
    readonly safeservice2slide: Locator
    readonly costservice2slide: Locator;
    readonly similarrooms2slide: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.bottonnow = page.getByRole('link', { name: 'Book Now', exact: true })

        this.ourrooms = page.locator('#rooms')
        this.availability = page.locator('#rooms div')

        this.firstoption = page.locator('#rooms div').filter({ hasText: 'SingleAenean porttitor mauris' }).nth(3)
        this.photo = page.locator('img.card-img-top[src="/images/room1.jpg"]')
        this.description = page.getByText('Aenean porttitor mauris sit')
        this.tvservice = page.getByText('TV').first()
        this.wifiservice = page.getByText('WiFi').first()
        this.safeservice = page.getByText('Safe').first()
        //this.costservice = page.getByRole()

        this.bottonbooknow = page.locator("a.btn.btn-primary").nth(1)
        this.photo2slide = page.locator('img.hero-image[src="/images/room1.jpg"]')
        this.description2slide = page.getByText('Aenean porttitor mauris sit')
        this.tvservice2slide = page.locator('div').filter({ hasText: /^TV$/ }).nth(1)
        this.wifiservice2slide = page.locator('div').filter({ hasText: /^WiFi$/ }).nth(1)
        this.safeservice2slide = page.locator('div').filter({ hasText: /^Safe$/ }).nth(1)
        this.costservice2slide = page.getByText('£100')
        this.similarrooms2slide = page.locator('section')

    }

    async gotorroms() {
        await this.bottonnow.click();
        await this.ourrooms.scrollIntoViewIfNeeded();
        await expect( this.ourrooms).toBeVisible();
        await expect(this.ourrooms).toHaveText(/Our Rooms/);
    }

    async viewservices() {  
        await this.firstoption.scrollIntoViewIfNeeded();
        await expect(this.firstoption).toBeVisible();
        await expect(this.photo).toBeVisible();
        await expect(this.description).toBeVisible();
        await expect(this.tvservice).toBeVisible();
        await expect(this.wifiservice).toBeVisible();
        await expect(this.safeservice).toBeVisible();
        //await expect(this.costservice).toBeVisible();
    }

    async bookroomfirstslide_values(){
        const firstSrc = await this.page.locator('img.card-img-top[src="/images/room1.jpg"]').getAttribute('src');expect(firstSrc).toBeTruthy();
        const firstDescription = await this.page.getByText('Aenean porttitor mauris sit').textContent();expect(firstDescription).toBeTruthy();
        const firstTv = await this.page.getByText('TV').first().textContent();expect(firstTv).toBeTruthy();
        const firstWifi = await this.page.getByText('WiFi').first().textContent();expect(firstWifi).toBeTruthy();
        const firstSafe = await this.page.getByText('Safe').first().textContent();expect(firstSafe).toBeTruthy();
        const firstCost = await this.page.getByText('£100').textContent();expect(firstCost).toBeTruthy();
            return {
                src: firstSrc,
                description: firstDescription,
                tv: firstTv,
                wifi: firstWifi,
                safe: firstSafe,
                cost: firstCost,
            }
        }
        
    async clickfirstroom(){
        await this.bottonbooknow.click();
    }

    async bookroomsecondslide_values(){
        await this.photo2slide.scrollIntoViewIfNeeded();
        const secondSrc = await this.page.locator('img.hero-image[src="/images/room1.jpg"]').getAttribute('src');expect(secondSrc).toBeTruthy();
        const secondDescription = await this.page.getByText('Aenean porttitor mauris sit').textContent();expect(secondDescription).toBeTruthy();
        const secondTv = await this.page.getByText('TV').first().textContent();expect(secondTv).toBeTruthy();
        const secondWifi = await this.page.getByText('WiFi').first().textContent();expect(secondWifi).toBeTruthy();
        const secondSafe = await this.page.getByText('Safe').first().textContent();expect(secondSafe).toBeTruthy();
        const secondCost = await this.page.getByText('£100').textContent();expect(secondCost).toBeTruthy();
            return {
                src: secondSrc,
                description: secondDescription,
                tv: secondTv,
                wifi: secondWifi,
                safe: secondSafe,
                cost: secondCost,
            }
        }
}
