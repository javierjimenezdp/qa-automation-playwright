import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/01.homepage";
import {Sendmessage} from "../../pages/06.sendmessage";
import { NavBar } from "../../pages/components/navbar";

test.describe("Locations Sectons", () => {
    let homepage: Homepage;
    let sendmessage: Sendmessage;
    let navbar: NavBar;

    test.beforeEach(async ({page}) => {
        homepage = new Homepage(page)
        sendmessage = new Sendmessage(page)
        navbar = new NavBar(page)

        await homepage.visit()
        console.log('toggler count:', await navbar.navbartoggler.count());
        console.log('toggler visible:', await navbar.navbartoggler.isVisible());
        console.log('collapse hidden:', await navbar.collapse.isHidden());
        await page.screenshot({ path: 'pre-toggle.png' });
        
    })

    test ("Send us message clean", async ({page}) => {
        await navbar.clickontabtext('Contact');
        await sendmessage.messagesectionclean();
    })
    test ("Send us message Wrong", async ({page}) => {
        await navbar.clickontabtext('Contact');
        await sendmessage.messagesectionwrong();
    })
    test ("Send us message Sucessfully", async ({page}) => {
        await navbar.clickontabtext('Contact');
        await sendmessage.messagesectionsucesfully();
    })
});