import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  iterations: 10,
};

export default function () {
  const url = __ENV.API_BOOKER_URL || "https://restful-booker.herokuapp.com";
  http.get(url);
  sleep(1);
}