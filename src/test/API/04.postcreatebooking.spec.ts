import { test, expect } from "@playwright/test";

test.describe("API Booker CREATE BOOKING", () => {
  const baseURL = process.env.API_BOOKER_URL;

  test("POST - CreateBooking and PUT - UpdateBooking", async ({ request }) => {
    //POST - CreateBooking
    const response = await request.post(`${baseURL}/booking`, {
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
    const responseBody = JSON.parse(await response.text());
    const bookingdid = responseBody.bookingid;
    console.log(bookingdid);
  });
});
