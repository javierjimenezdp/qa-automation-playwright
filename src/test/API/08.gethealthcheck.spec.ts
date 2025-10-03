import { test, expect } from "@playwright/test";

test.describe("API Booker GET HealthCheck", () => {
  const baseURL = process.env.API_BOOKER_URL;

  test("GET - HealthCheck", async ({ request }) => {
    const response = await request.get(`${baseURL}/ping`);
    expect(response.status()).toBe(201);
  });
});
