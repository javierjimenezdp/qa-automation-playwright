import { test, expect } from "@playwright/test";

test.describe("API Booker TOKEN", () => {
    const baseURL = process.env.API_BOOKER_URL

    test("POST - AuthCreateToken", async ({ request }) => {
        const response = await request.post(`${baseURL}/auth`, {
            data: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        });
        const responseBody = JSON.parse(await response.text());
        const token = responseBody.token;
        console.log(token);
    });

});