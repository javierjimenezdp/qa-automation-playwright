import { test, expect } from "@playwright/test";

test.describe("API Booker UPDATE PARTIAL BOOKING", () => {
  const baseURL = process.env.API_BOOKER_URL!;

  test.describe("Create Token and Booking", () => {
    let token: string;
    let bookingdid: number;

    test.beforeAll(async ({ request }) => {
      //1. Get Auth Token
      const authResponse = await request.post(`${baseURL}/auth`, {
        data: {
          username: process.env.API_USERNAME,
          password: process.env.API_PASSWORD,
        },
      });
      const authBody = JSON.parse(await authResponse.text());
      token = authBody.token;
      console.log("TOKEN:", token);

      //2. Create Booking
      const createResponse = await request.post(`${baseURL}/booking`, {
        data: {
          firstname: "Sally",
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: "2013-02-23",
            checkout: "2014-10-23",
          },
          additionalneeds: "Breakfast",
        },
      });
      const responseBody = JSON.parse(await createResponse.text());
      console.log(responseBody);
      bookingdid = responseBody.bookingid;
      console.log("BOOKINGID:", bookingdid);
    });

    test("PATCH - UpdateBooking", async ({ request }) => {
      const updateResponse = await request.patch(
        `${baseURL}/booking/${bookingdid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `token=${token}`,
          },
          data: {
            firstname: "SallyUpdated",
            lastname: "BrownUpdated",
          },
        },
      );
      const updateResponseBody = JSON.parse(await updateResponse.text());
      console.log(updateResponseBody);
    });
  });
});
