// init context: importing modules
import http from 'k6/http';
import { sleep } from 'k6'; //sleep lo usamos solo si quieres simular respiritos entre pasos
import { check } from 'k6'; //check te permite afirmar “status 200”, “tiene id”, etc.

// init context: define k6 options
export const options = {
  vus: 1,           // 1 usuario
  iterations: 1,          // lo hace durante 45 segundos seguidos.
  thresholds: {
    checks: ['rate>0.99'], // significa que al menos el 99 % de los checks (validaciones) deben pasar; si no, la prueba falla.
    http_req_duration: ['p(95)<800'], // significa que el 95 % de las peticiones HTTP deben responder en menos de 800 ms.
  },
};

// 1. init code - La idea: en setup() obtienes el token una sola vez y devuelves todo lo que vas a reutilizar en default().
export function setup() {
  // 1) Variables de entorno
  const baseurl = __ENV.API_BOOKER_BAT_URL;
  const username = __ENV.API_BOOKER_BAT_USERNAME;
  const password = __ENV.API_BOOKER_BAT_PASSWORD;

    if (!baseurl || !username || !password) {
    throw new Error('Faltan variables de entorno: API_BOOKER_BAT_URL, API_BOOKER_BAT_USERNAME, API_BOOKER_BAT_PASSWORD');
  }

  // 2) Headers JSON comunes
  const jsonheaders = {
    'Content-Type': 'application/json',
  };

  // 3) Login y obtención del token
  const createtoken = http.post(`${baseurl}/auth`, // Llama al endpoint con verbo POST y crea una URL de manera dinámica
    JSON.stringify({ username: username, password: password }), // Cuerpo de la petición, convierte tu objeto JS a texto plano JSON (el formato que espera la API)
    { headers: jsonheaders } // Envia encabezados (headers), aquí el Content-Type 
  );
    check(createtoken, { // Check es como el “expect” de Playwright o el “assert” de Pytest || createtoken: es el objeto que devuelve http.post, http.get, etc.
      'login status 200': (r) => r.status === 200, // r: es la condición que debe cumplirse.
      'token present': (r) => r.json('token') !== '', // Léame el JSON de esta respuesta y deme el valor que tenga el campo 'token' || Asegúrese de que el token no sea una cadena vacía. 
    });

  const token = createtoken.json('token'); // Extrae el token de la respuesta JSON
  console.log(`Token obtenido: ${token}`); // Muestra el token en la consola de k6

    return {
    token
  };

}
// 2. setup code
export default function (data) {
    const baseurl = __ENV.API_BOOKER_BAT_URL;
    const baseurlpost =`${baseurl}/booking`;
    const jsonpostheaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    };
    const payload = JSON.stringify({
    firstname: `smoke_${Date.now()}`,
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Breakfast',
  });

  const createbooking = http.post(baseurlpost, payload, { headers: jsonpostheaders });
  console.log(`Response body: ${createbooking.body}`); // Muestra el cuerpo de la respuesta en la consola de k6

    check(createbooking, {
      'login status 200': (r) => r.status === 200,
      'bookingid present': (r) => r.json('bookingid') !== '', 
    });

  const bookingidnew = createbooking.json('bookingid'); 
  console.log(`Bookingid obtenido: ${bookingidnew}`); 

}
// 3. VU code
export function teardown(data) {

}