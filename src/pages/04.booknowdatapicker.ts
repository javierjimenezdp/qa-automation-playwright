import { expect, Locator, Page } from "@playwright/test";

export class Booknowdatapicker {
  readonly page: Page;
  readonly booking: Locator;
  readonly selectdatecheckin: Locator;
  readonly selectdatecheckout: Locator;
  readonly checkavaialibility: Locator;
  readonly firstcardimage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.booking = page.locator("#root-container #booking");
    this.selectdatecheckin = page
      .locator(
        "#root-container #booking .container form .col-md-6 .form-control",
      )
      .nth(0);
    this.selectdatecheckout = page
      .locator(
        "#root-container #booking .container form .col-md-6 .form-control",
      )
      .nth(1);
    this.checkavaialibility = page.locator(
      "#root-container #booking .container form .col-8.mt-4 .btn-primary",
    );
    this.firstcardimage = page
      .locator("#rooms .container .row.g-4 .col-lg-4 img")
      .first();
  }

  async bookingpage() {
    await this.booking.scrollIntoViewIfNeeded();
    await expect(this.booking).toBeVisible();
  }

  async booknowdatecheckin(page: Page) {
    const inputs = this.selectdatecheckin;
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const day = nextWeek.getDate();
    const month = nextWeek.toLocaleDateString("en-US", { month: "long" });
    const year = nextWeek.getFullYear();

    await inputs.click();

    const header = this.page.locator(".react-datepicker__current-month");
    for (let i = 0; i < 12; i++) {
      const current = (await header.textContent())?.trim();
      if (current === `${month} ${year}`) break;
      await this.page.locator(".react-datepicker__navigation--next").click();
    }

    const daySelector = `.react-datepicker .react-datepicker__day:not(.react-datepicker__day--outside-month).react-datepicker__day--${String(day).padStart(3, "0")}`;
    await this.page.waitForSelector(".react-datepicker__month");
    await this.page.locator(daySelector).click();
  }

  async booknowdatecheckout(page: Page) {
    const inputs = this.selectdatecheckout;
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 15);

    const day = nextWeek.getDate();
    const month = nextWeek.toLocaleDateString("en-US", { month: "long" });
    const year = nextWeek.getFullYear();

    await inputs.click();

    const header = this.page.locator(".react-datepicker__current-month");
    for (let i = 0; i < 12; i++) {
      const current = (await header.textContent())?.trim();
      if (current === `${month} ${year}`) break;
      await this.page.locator(".react-datepicker__navigation--next").click();
    }

    const daySelector = `.react-datepicker .react-datepicker__day:not(.react-datepicker__day--outside-month).react-datepicker__day--${String(day).padStart(3, "0")}`;
    await this.page.waitForSelector(".react-datepicker__month");
    await this.page.locator(daySelector).click();
  }

  async checkavaialibilityclick() {
    await this.checkavaialibility.scrollIntoViewIfNeeded();
    await expect(this.checkavaialibility).toBeVisible();
    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.checkavaialibility.click(),
    ]);
    await this.page.waitForTimeout(3500);
  }
  async waitFirstCardReady() {
    await expect(this.firstcardimage).toBeVisible({ timeout: 10_000 });
    await expect(this.firstcardimage).toHaveAttribute("src", /.+/, {
      timeout: 10_000,
    });
  }
}
