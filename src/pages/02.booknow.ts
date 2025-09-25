import { expect, Locator, Page } from "@playwright/test";

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
    readonly costservice: Locator;

    readonly bottonbooknow: Locator;
    readonly photo2slide: Locator;
    readonly description2slide: Locator;
    readonly tvservice2slide: Locator;
    readonly wifiservice2slide: Locator;
    readonly safeservice2slide: Locator
    readonly costservice2slide: Locator;
    readonly similarrooms2slide: Locator;
    readonly selectdate: Locator;
    readonly reservenow: Locator;
    readonly formreserve: Locator;
    readonly firstnameinput: Locator;
    readonly lastnameinput: Locator;
    readonly emailinput: Locator;
    readonly phoneinput: Locator;
    readonly reservenowinput: Locator;
    readonly cancelinput: Locator;
    readonly successmessage: Locator;
    readonly errormessagegeneral: Locator;
    readonly errrormessagespecific: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.bottonnow = page.locator('#root-container .hero.py-5 .py-5 .row.py-5 .btn-lg').nth(0)

        this.ourrooms = page.locator('#rooms')
        this.availability = page.locator('#rooms div')

        this.firstoption = page.locator('#rooms .container .row.g-4 .col-lg-4').first()
        this.photo = page.locator('#rooms .row.g-4 .col-md-6 .room-image .card-img-top').first()
        this.description = page.locator('#rooms .row.g-4 .col-lg-4 .room-card .card-body .card-text').first()
        this.tvservice = page.locator('#rooms .row.g-4 .col-md-6.col-lg-4 .card-body .card-text .text-dark').nth(0)
        this.wifiservice = page.locator('#rooms .row.g-4 .col-md-6.col-lg-4 .card-body .card-text .text-dark').nth(1)
        this.safeservice = page.locator('#rooms .row.g-4 .col-md-6.col-lg-4 .card-body .card-text .text-dark').nth(2)
        this.costservice = page.locator('#rooms .row.g-4 .col-md-6.col-lg-4 .card-footer .fs-5').first()

        this.bottonbooknow = page.locator("a.btn.btn-primary").nth(1)

        this.photo2slide = page.locator('#root-container .my-5 .mb-lg-0 .mb-4 .g-2 .col-12 .hero-image')
        this.description2slide = page.locator('#root-container .my-5 .mb-lg-0 .mb-4 p')
        this.tvservice2slide = page.locator('#root-container .my-5 .mb-lg-0 .mb-4 .flex-wrap .col-md-4 span').nth(0)
        this.wifiservice2slide = page.locator('#root-container .my-5 .mb-lg-0 .mb-4 .flex-wrap .col-md-4 span').nth(1)
        this.safeservice2slide = page.locator('#root-container .my-5 .mb-lg-0 .mb-4 .flex-wrap .col-md-4 span').nth(2)
        this.costservice2slide = page.locator('#root-container .my-5 .row .col-lg-4 .mb-4 .me-2')
        this.similarrooms2slide = page.locator('#root-container .bg-light.py-5')

        this.selectdate = page.locator('#root-container .my-5 .booking-card .card-body form .rbc-calendar .rbc-month-view')  
        this.reservenow = page.locator('form #doReservation')    
        this.formreserve = page.locator('form')
        this.firstnameinput = page.locator('form .room-booking-form [name="firstname"]')
        this.lastnameinput = page.locator('form .mb-3 [name="lastname"]')
        this.emailinput = page.locator('form .mb-3 [name="email"]')
        this.phoneinput = page.locator('form .mb-3 [name="phone"]')
        this.reservenowinput = page.locator('#root-container .my-5 .row .col-lg-4 .booking-card .card-body form .w-100.mb-3').nth(0)
        this.cancelinput = page.locator('#root-container .my-5 .row .col-lg-4 .booking-card .card-body form .w-100.mb-3').nth(1)
        this.successmessage = page.locator('body div').nth(1)
        this.errormessagegeneral = page.locator('#root-container .my-5 .row .col-lg-4 form .alert-danger')        
        this.errrormessagespecific = page.locator('.row .col-lg-4 .card-body form .alert-danger') 

    }

    async gotorroms() {
        await this.bottonnow.click();
        await this.ourrooms.scrollIntoViewIfNeeded();
        await expect( this.ourrooms).toBeVisible();
        await expect(this.ourrooms).toHaveText(/Our Rooms/);
    }

    async viewandgetservicesfirstslide() {  
        await expect(this.firstoption).toBeVisible();
        await expect(this.photo).toHaveAttribute('src', { timeout: 10000 });
        await expect(this.photo).toBeVisible();
        const srcphoto = await this.photo.getAttribute('src'); expect(srcphoto).toBeTruthy();
        console.log("Photo source is: " + srcphoto);

        await expect(this.description).toBeVisible();
        const textdescription = await this.description.textContent(); expect(textdescription).toBeTruthy();
        console.log("Description text is: " + textdescription);

        await expect(this.tvservice).toBeVisible();
        const texttv = await this.tvservice.textContent(); expect(texttv).toBeTruthy();
        console.log("TV service text is: " + texttv);
        const clean_tv = (texttv ?? '').trim().toLowerCase();

        await expect(this.wifiservice).toBeVisible();
        const textwifi = await this.wifiservice.textContent(); expect(textwifi).toBeTruthy();
        console.log("WiFi service text is: " + textwifi);
        const clean_wifi = (textwifi ?? '').trim().toLowerCase();
        
        await expect(this.safeservice).toBeVisible();
        const textsafe = await this.safeservice.textContent(); expect(textsafe).toBeTruthy();
        console.log("Safe service text is: " + textsafe);
        const clean_safe = (textsafe ?? '').trim().toLowerCase();

        const textcost = await this.costservice.textContent();expect(textcost).toBeTruthy();
        console.log("Cost service text is: " + textcost);
        const clean = (textcost ?? '').trim(); 
        const digits = clean.replace(/[^\d]/g, '');
        const price = Number(digits);

        return {
            src: srcphoto,
            description: textdescription,
            tv: clean_tv, 
            wifi: clean_wifi,
            safe: clean_safe,
            cost: price,
        }
    }
        
    async clickfirstroom(){
        await this.bottonbooknow.click();
    }

    async viewandgetservicessecondslide(){
        await this.photo2slide.scrollIntoViewIfNeeded();
        await expect(this.photo2slide).toBeVisible();
        await expect(this.photo2slide).toHaveAttribute('src', { timeout: 10000 });
        const srcphoto2 = await this.photo2slide.getAttribute('src'); expect(srcphoto2).toBeTruthy();
        console.log("Photo source 2nd slide is: " + srcphoto2);

        await expect(this.description2slide).toBeVisible();
        const textdescription2 = await this.description2slide.textContent(); expect(textdescription2).toBeTruthy();
        console.log("Description text 2nd slide is: " + textdescription2);  

        await expect(this.tvservice2slide).toBeVisible();
        const texttv2 = await this.tvservice2slide.textContent(); expect(texttv2).toBeTruthy();
        console.log("TV service text 2nd slide is: " + texttv2);
        const clean_tv2 = (texttv2 ?? '').trim().toLowerCase();

        await expect(this.wifiservice2slide).toBeVisible();
        const textwifi2 = await this.wifiservice2slide.textContent(); expect(textwifi2).toBeTruthy();
        console.log("WiFi service text 2nd slide is: " + textwifi2);
        const clean_wifi2 = (textwifi2 ?? '').trim().toLowerCase();

        await expect(this.safeservice2slide).toBeVisible();
        const textsafe2 = await this.safeservice2slide.textContent(); expect(textsafe2).toBeTruthy();
        console.log("Safe service text 2nd slide is: " + textsafe2);
        const clean_safe2 = (textsafe2 ?? '').trim().toLowerCase();

        const textcost2 = await this.costservice2slide.textContent();expect(textcost2).toBeTruthy();
        console.log("Cost service text 2nd slide is: " + textcost2);
        const clean2 = (textcost2 ?? '').trim();    
        const digits2 = clean2.replace(/[^\d]/g, '');
        const price2 = Number(digits2); 

        await expect(this.similarrooms2slide).toBeVisible();

        return {
            src: srcphoto2,
            description: textdescription2,
            tv: clean_tv2, 
            wifi: clean_wifi2,
            safe: clean_safe2,
            cost: price2,       

        }
    }

    async reservearoomcancel(firstname: string, lastname: string, email: string, phone: string, page: Page) {
        await this.selectdate.scrollIntoViewIfNeeded();
        await expect(this.selectdate).toBeVisible();
        const calendar = page.locator('#root-container .my-5 .col-lg-4 form .mb-4 .rbc-calendar .rbc-month-view');
        const selectevent = calendar.locator('.rbc-event-content[title="Selected"]')
        await expect(selectevent).toBeVisible();
        await expect(selectevent).toHaveCount(1);

        await this.reservenow.scrollIntoViewIfNeeded();
        await this.reservenow.click();
        
        await expect(this.formreserve).toBeVisible();
        await this.firstnameinput.fill(firstname);
        await this.lastnameinput.fill(lastname);
        await this.emailinput.fill(email);
        await this.phoneinput.fill(phone);

        await this.cancelinput.click();
        await expect(this.selectdate).toBeVisible();
    }

    async reserveroomerrorspecific(firstname: string, lastname: string, email: string, phone: string, page:Page) {
        await this.selectdate.scrollIntoViewIfNeeded();
        await expect(this.selectdate).toBeVisible();
        const calendar = page.locator('#root-container .my-5 .col-lg-4 form .mb-4 .rbc-calendar .rbc-month-view');
        const selectevent = calendar.locator('.rbc-event-content[title="Selected"]')
        await expect(selectevent).toBeVisible();
        await expect(selectevent).toHaveCount(1);

        await this.reservenow.scrollIntoViewIfNeeded();
        await this.reservenow.click();
        
        await expect(this.formreserve).toBeVisible();
        await this.firstnameinput.fill(firstname);
        await this.lastnameinput.fill(lastname);
        await this.emailinput.fill(email);
        await this.phoneinput.fill(phone);

        await this.reservenowinput.click();
        await this.errrormessagespecific.scrollIntoViewIfNeeded();
        await expect(this.errrormessagespecific).toBeVisible();
        const errortext = await this.errrormessagespecific.textContent(); expect(errortext).toBeTruthy();
        console.log("Error message text is: " + errortext);
    }

        async reserveroomerrorgeneral(firstname: string, lastname: string, email: string, phone: string, page:Page) {
        await this.selectdate.scrollIntoViewIfNeeded();
        await expect(this.selectdate).toBeVisible();
        const calendar = page.locator('#root-container .my-5 .col-lg-4 form .mb-4 .rbc-calendar .rbc-month-view');
        const selectevent = calendar.locator('.rbc-event-content[title="Selected"]')
        await expect(selectevent).toBeVisible();
        await expect(selectevent).toHaveCount(1);

        await this.reservenow.scrollIntoViewIfNeeded();
        await this.reservenow.click();
        
        await expect(this.formreserve).toBeVisible();
        await this.firstnameinput.fill(firstname);
        await this.lastnameinput.fill(lastname);
        await this.emailinput.fill(email);
        await this.phoneinput.fill(phone);

        await this.reservenowinput.click();
        await this.errormessagegeneral.scrollIntoViewIfNeeded();
        await expect(this.errormessagegeneral).toBeVisible();
        const errortext = await this.errormessagegeneral.textContent(); expect(errortext).toBeTruthy();
        console.log("Error message text is: " + errortext);
    }



    async reservearoomsuccess(firstname: string, lastname: string, email: string, phone: string, page:Page) {
        await this.selectdate.scrollIntoViewIfNeeded();
        await expect(this.selectdate).toBeVisible();
        const calendar = page.locator('#root-container .my-5 .booking-card .card-body form .rbc-calendar .rbc-month-view');
        const selectevent = calendar.locator('.rbc-event-content[title="Selected"]')
        await expect(selectevent).toBeVisible();
        await expect(selectevent).toHaveCount(1);

        await this.reservenow.scrollIntoViewIfNeeded();
        await this.reservenow.click();
        
        await expect(this.formreserve).toBeVisible();
        await this.firstnameinput.fill(firstname);
        await this.lastnameinput.fill(lastname);
        await this.emailinput.fill(email);
        await this.phoneinput.fill(phone);

        await this.reservenowinput.click();
        await expect(this.successmessage).toBeVisible();
        const successmsg = await this.successmessage.textContent(); expect(successmsg).toBeTruthy();
        console.log("Success message text is: " + successmsg);
    }  
}