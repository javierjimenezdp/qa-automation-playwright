import { test, expect } from "@playwright/test";
import { Homepage } from "../../pages/01.homepage";
import { Location } from "../../pages/05.location";
import { NavBar } from "../../pages/components/navbar";

test.describe("Locations Sectons", () => {
  let homepage: Homepage;
  let location: Location;
  let navbar: NavBar;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    location = new Location(page);
    navbar = new NavBar(page);
    console.log("toggler count:", await navbar.navbartoggler.count());
    console.log("toggler visible:", await navbar.navbartoggler.isVisible());
    console.log("collapse hidden:", await navbar.collapse.isHidden());
    await page.screenshot({ path: "pre-toggle.png" });
    await homepage.visit();
  });

  test("Our Location", async ({ page }) => {
    await navbar.clickontabtext("Location");
    await location.locationpagesection();
    await location.contactinformationtext();
  });
});
