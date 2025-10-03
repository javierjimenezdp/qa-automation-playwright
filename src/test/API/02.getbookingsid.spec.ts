import { test, expect } from "@playwright/test";

test.describe("API Booker GET ALL ID", () => {
  const baseURL = process.env.API_BOOKER_URL;

  test("GET - GetBookingIds", async ({ request }) => {
    const response = await request.get(`${baseURL}/booking`);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });
});
