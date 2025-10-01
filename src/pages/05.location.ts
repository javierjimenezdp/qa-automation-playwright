import { expect, Locator, Page } from "@playwright/test";
import { normalizeText } from "../utils/textutils";


export class Location {
    readonly page: Page;
    readonly locationsection: Locator;
    readonly maplocation: Locator;
    readonly contactinformationcard: Locator;
    readonly contactaddress: Locator;
    readonly contactphone: Locator;
    readonly contactemail: Locator;
    readonly contactgethere: Locator;

    constructor(page: Page) {
        this.page = page;   
        this.locationsection = page.locator('#root-container #location')
        this.maplocation = page.locator('#root-container #location .container .row.g-4 .col-lg-6').filter({has: page.locator('.pigeon-overlays')}).first()
        this.contactinformationcard = page.locator('#root-container #location .container .col-lg-6 .h-100 .card-body').nth(1);
        this.contactaddress = page.locator('#root-container #location .container .col-lg-6 .h-100 .card-body .mb-0').nth(0); 
        this.contactphone = page.locator('#root-container #location .container .col-lg-6 .h-100 .card-body .mb-0').nth(1)
        this.contactemail = page.locator('#root-container #location .container .col-lg-6 .h-100 .card-body .mb-0').nth(2)
        this.contactgethere = page.locator('#root-container #location .container .col-lg-6 .h-100 .card-body p').nth(3)
    }

    async locationpagesection() {
        await expect(this.locationsection).toBeVisible();
        const screenlocation = await this.locationsection.screenshot()
        await expect(screenlocation).toMatchSnapshot('locationsection.png')

        await expect(this.maplocation).toBeVisible();
        const screenmap = await this.locationsection.screenshot()
        await expect(screenmap).toMatchSnapshot('maplocation.png')

        await expect(this.contactinformationcard).toBeVisible();   
        const screencontactinfo = await this.locationsection.screenshot()
        await expect(screencontactinfo).toMatchSnapshot('contactinformationcard.png')
    }

    async contactinformationtext() {
        await expect(this.contactaddress).toBeVisible();
        const addres = await this.contactaddress.textContent();
        const addresutils = normalizeText(addres)
        console.log('Address:', addresutils);
        expect(addresutils).toContain('Shady Meadows B&B, Shadows valley, Newingtonfordburyshire, Dilbery, N1 1AA');

        await expect(this.contactphone).toBeVisible();
        const phone = await this.contactphone.textContent();
        const phoneutils = normalizeText(phone)
        console.log('Phone:', phoneutils);
        expect(phoneutils).toContain('012345678901');

        await expect(this.contactemail).toBeVisible();
        const email = await this.contactemail.textContent();
        const emailutils = normalizeText(email)
        console.log('Email:', emailutils);
        expect(emailutils).toContain('fake@fakeemail.com')

        await expect(this.contactgethere).toBeVisible();
        const gettinghere = await this.contactgethere.textContent();
        const gettinhereutils = normalizeText(gettinghere)
        console.log('Getting Here:', gettinhereutils);
        expect(gettinhereutils).toContain('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.');
    }

}