import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { Booknownav } from "../pages/booknownavbar";
import { NavBar } from "../pages/components/navbar";

test.describe("Book Now Page NavBar", () => {
    let booknowPage: Booknownav;
    let homepage: Homepage;
    let navbar: NavBar;

    test.beforeEach(async ({ page }) => {
        booknowPage = new Booknownav(page);
        homepage = new Homepage(page);
        navbar = new NavBar(page);
        console.log('toggler count:', await navbar.navbartoggler.count());
        console.log('toggler visible:', await navbar.navbartoggler.isVisible());
        console.log('collapse hidden:', await navbar.collapse.isHidden());
        await page.screenshot({ path: 'pre-toggle.png' });
        await homepage.visit();
    });

        test("Cancel reservation NavBar", async ( {page} ) => {
            await navbar.clickontabtext("Rooms");
            await booknowPage.clickfirstroom();
            await booknowPage.reservearoomcancel(" ", " ", " ", " ", page);
        });
        test("Error reservation NavBar", async ( {page} ) => {
            await navbar.clickontabtext("Rooms");
            await booknowPage.clickfirstroom();
            await booknowPage.reserveroomerror("Javier", "Testing", "javier@testing.com", "3108948596", page);
        });
        test("Success reservation NavBar", async ( {page} ) => {
            await navbar.clickontabtext("Rooms");
            await booknowPage.clickfirstroom();
            await booknowPage.reservearoomsuccess("Javier", "Testing", "javier@testing.com", "31089485962", page);
        });

});
