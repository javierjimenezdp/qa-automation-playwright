import { test, expect } from "@playwright/test";

test.describe("API Booker GET SPECIFIC ID", () => {
    const baseURL = process.env.API_BOOKER_URL

    test("GET - GetBookingById", async ({ request }) => {
        const randomid = `${Math.floor(Math.random() * 20)}` 
        console.log(randomid);
        const response = await request.get(`${baseURL}/booking/${randomid}`);
        const responseBody = JSON.parse(await response.text());
        console.log(responseBody);
    });
});