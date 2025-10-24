import { expect, Locator, Page } from "@playwright/test";

export class NavBar {
  readonly page!: Page;
  readonly rooms!: Locator;
  readonly booking!: Locator;
  readonly amenities!: Locator;
  readonly location!: Locator;
  readonly contact!: Locator;
  readonly admin!: Locator;
  readonly collapse!: Locator;
  readonly navbartoggler!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rooms = page
      .locator("#root-container .navbar-light #navbarNav .nav-item .nav-link")
      .nth(0);
    this.booking = page
      .locator("#root-container .navbar-light #navbarNav .nav-item .nav-link")
      .nth(1);
    this.amenities = page
      .locator("#root-container .navbar-light #navbarNav .nav-item .nav-link")
      .nth(2);
    this.location = page
      .locator("#root-container .navbar-light #navbarNav .nav-item .nav-link")
      .nth(3);
    this.contact = page
      .locator("#root-container .navbar-light #navbarNav .nav-item .nav-link")
      .nth(4);
    this.admin = page
      .locator("#root-container .navbar-light #navbarNav .nav-item .nav-link")
      .nth(5);
    this.collapse = page.locator("#navbarNav");
    this.navbartoggler = page.locator(
      '[data-bs-toggle="collapse"][data-bs-target="#navbarNav"], button[aria-controls="navbarNav"]',
    );
  }

  async hamburguermenu() {
    await this.collapse.waitFor({ state: "attached" });
    await this.page.waitForTimeout(50);

    const count = await this.navbartoggler.count();
    if (count === 0) {
      console.log(
        "[DEBUG] No encontré el toggler con atributos. HTML del nav:",
      );
      console.log(await this.page.locator("nav.navbar").first().innerHTML());
      return;
    }

    if (await this.navbartoggler.isVisible()) {
      try {
        await this.navbartoggler.scrollIntoViewIfNeeded();
        await this.navbartoggler.click();
      } catch {
        await this.navbartoggler.evaluate((btn: HTMLElement) => btn.click());
      }
      await expect(this.collapse).toBeVisible();
      await this.page.waitForTimeout(150);
    } else {
      console.log(
        "[DEBUG] Toggler no visible (prob. viewport desktop o algo lo tapa).",
      );
    }
  }
  async clickontabtext(tabname: string) {
    await this.hamburguermenu();
    switch (tabname) {
      case "Rooms":
        await expect(this.rooms).toBeVisible();
        await this.rooms.click();
        break;
      case "Booking":
        await expect(this.booking).toBeVisible();
        await this.booking.click();
        break;
      case "Amenities":
        await expect(this.amenities).toBeVisible();
        await this.amenities.click();
        break;
      case "Location":
        await expect(this.location).toBeVisible();
        await this.location.click();
        break;
      case "Contact":
        await expect(this.contact).toBeVisible();
        await this.contact.click();
        break;
      case "Admin":
        await expect(this.admin).toBeVisible();
        await this.admin.click();
        break;
    }
  }
}
