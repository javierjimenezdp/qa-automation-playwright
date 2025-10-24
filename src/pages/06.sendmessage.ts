import {
  expect,
  Locator,
  LocatorScreenshotOptions,
  Page,
} from "@playwright/test";
import { normalizeText } from "../utils/textutils";

export class Sendmessage {
  readonly page: Page;
  readonly nameinput: Locator;
  readonly emailinput: Locator;
  readonly phoneinput: Locator;
  readonly subjectinput: Locator;
  readonly messageinput: Locator;
  readonly grongsubmited: Locator;
  readonly succesfullysubmited: Locator;
  readonly submitbutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameinput = page
      .locator(
        "#root-container #contact .container .col-lg-8 .card.shadow .form-control",
      )
      .nth(0);
    this.emailinput = page
      .locator(
        "#root-container #contact .container .col-lg-8 .card.shadow .form-control",
      )
      .nth(1);
    this.phoneinput = page
      .locator(
        "#root-container #contact .container .col-lg-8 .card.shadow .form-control",
      )
      .nth(2);
    this.subjectinput = page
      .locator(
        "#root-container #contact .container .col-lg-8 .card.shadow .form-control",
      )
      .nth(3);
    this.messageinput = page
      .locator(
        "#root-container #contact .container .col-lg-8 .card.shadow .form-control",
      )
      .nth(4);
    this.grongsubmited = page.locator(
      "#root-container #contact .container .col-lg-8 .card.shadow .alert.alert-danger",
    );
    this.succesfullysubmited = page.locator(
      "#root-container #contact .container .col-lg-8 .card.shadow .card-body.p-4",
    );
    this.submitbutton = page.locator(
      "#root-container #contact .container .col-lg-8 .card.shadow .btn.btn-primary",
    );
  }

  async messagesectionclean() {
    const nameinputstring = "Javier";

    await expect(this.nameinput).toBeVisible();
    await this.nameinput.fill("");

    await expect(this.emailinput).toBeVisible();
    await this.emailinput.fill("");

    await expect(this.phoneinput).toBeVisible();
    await this.phoneinput.fill("");

    await expect(this.subjectinput).toBeVisible();
    await this.subjectinput.fill("");

    await expect(this.messageinput).toBeVisible();
    await this.messageinput.fill("");

    await this.submitbutton.click();
    await this.grongsubmited.scrollIntoViewIfNeeded();
    await expect(this.grongsubmited).toBeVisible({ timeout: 5000 });
  }

  async messagesectionwrong() {
    const nameinputstring = "Javier";

    await expect(this.nameinput).toBeVisible();
    await this.nameinput.fill(nameinputstring);

    await expect(this.emailinput).toBeVisible();
    await this.emailinput.fill("Testing");

    await expect(this.phoneinput).toBeVisible();
    await this.phoneinput.fill("javier@testing.com");

    await expect(this.subjectinput).toBeVisible();
    await this.subjectinput.fill("Test succesfully");

    await expect(this.messageinput).toBeVisible();
    await this.messageinput.fill(
      "Test to each input on the message section to verify it each one of them meet the validations",
    );

    await this.submitbutton.click();
    await this.grongsubmited.scrollIntoViewIfNeeded();
    await expect(this.grongsubmited).toBeVisible({ timeout: 5000 });
  }

  async messagesectionsucesfully() {
    const lastnames = [
      "Perez",
      "Gomez",
      "Lopez",
      "Martinez",
      "Rodriguez",
      "Castro",
      "Diaz",
    ];
    const randomlastname =
      lastnames[Math.floor(Math.random() * lastnames.length)];
    const nameinputstring = "Javier";

    const randomnumber = Date.now();
    const emailvalue = `javier${randomnumber}@gmail.com`;

    const phoneValue = `3${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const subjectValue = `Subject test with ${randomlastname}`;
    const messageValue = `Message test with at least 30 characters using ${randomlastname} validation run.`;

    await expect(this.nameinput).toBeVisible();
    await this.nameinput.fill(`${nameinputstring} ${randomlastname}`);

    await expect(this.emailinput).toBeVisible();
    await this.emailinput.fill(emailvalue);

    await expect(this.phoneinput).toBeVisible();
    await this.phoneinput.fill(phoneValue);

    await expect(this.subjectinput).toBeVisible();
    await this.subjectinput.fill(subjectValue);

    await expect(this.messageinput).toBeVisible();
    await this.messageinput.fill(messageValue);

    await this.submitbutton.click({ timeout: 5000 });

    await this.succesfullysubmited.scrollIntoViewIfNeeded({ timeout: 5000 });
    await expect(this.succesfullysubmited).toBeVisible({ timeout: 5000 });
    const messagesuccesfully = await this.succesfullysubmited.textContent();
    const messagesuccesfullyutils = normalizeText(messagesuccesfully);
    console.log("Message Succesfully:", messagesuccesfullyutils);
    expect(messagesuccesfullyutils).toContain(
      `${nameinputstring} ${randomlastname}`,
    );
  }
}
