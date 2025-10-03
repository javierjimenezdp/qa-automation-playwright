import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Define the number of iterations for the test
    iterations: 10,
};

export default function () {
http.get(process.env.API_BOOKER_URL);
    sleep(1);
}
// This script performs a smoke test by sending 10 GET requests to the specified API endpoint.