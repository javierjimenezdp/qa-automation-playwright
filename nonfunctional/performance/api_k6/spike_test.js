// init context: importing modules
import http from 'k6/http';
import { sleep } from 'k6'; //sleep lo usamos solo si quieres simular respiritos entre pasos
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


// init context: define k6 options
export const options = {
  scenarios: {
    stress_e2e_booking: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 50,
      stages: [
        { duration: '1m', target: 5 },   // warmup
        { duration: '3m', target: 10 },
        { duration: '5m', target: 15 },
        { duration: '8m', target: 20 },
        { duration: '1m', target: 25 },
      ],
      exec: 'default',
      tags: { test_type: 'stress', flow: 'e2e_booking' },
    },
  },
  thresholds: {
    checks: ['rate>0.95'],              // toleras algo de error
    http_req_failed: ['rate<0.05'],     // hasta 5% errores
    http_req_duration: ['p(95)<2000'],  // p95 puede subir
  },
};

// 1. init code - La idea: en setup() obtienes el token una sola vez y devuelves todo lo que vas a reutilizar en default().
export function setup() {
  // A) Variables de entorno
  const baseurl = __ENV.API_BOOKER_BAT_URL;
  const username = __ENV.API_BOOKER_BAT_USERNAME;
  const password = __ENV.API_BOOKER_BAT_PASSWORD;

    if (!baseurl || !username || !password) {
    throw new Error('Faltan variables de entorno: API_BOOKER_BAT_URL, API_BOOKER_BAT_USERNAME, API_BOOKER_BAT_PASSWORD');
  }

  // B) Headers JSON comunes
  const jsonheaders = {
    'Content-Type': 'application/json',
  };

  // C) Login y obtención del token
  const createtoken = http.post(`${baseurl}/auth`, // Llama al endpoint con verbo POST y crea una URL de manera dinámica
    JSON.stringify({ username: username, password: password }), // Cuerpo de la petición, convierte tu objeto JS a texto plano JSON (el formato que espera la API)
    { headers: jsonheaders } // Envia encabezados (headers), aquí el Content-Type 
  );
  const token = createtoken.json('token'); // Extrae el token de la respuesta JSON

    return {
    token,
    baseurl
  };

}
// 2. setup code
export default function (data) {

  //Post - Crea un booking
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
  const bookingidnew = createbooking.json('bookingid'); 
  sleep(1); // Simula un tiempo de espera entre acciones (opcional)


  // PATCH - Actualiza el nombre del booking creado
  const baseurlpatch =`${baseurl}/booking/${bookingidnew}`;
  const tokenpatch = data.token; // Obtén el token del objeto data pasado desde setup()
  const jsonpatchheaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${tokenpatch}`, // Usa el token obtenido en setup()
  };
  const payloadpatch = JSON.stringify({
    firstname: `smoke_${Date.now()}`, // Actualiza el nombre con un valor único
    lastname: 'Fernandez', // Actualiza el apellido
  });

  const updatebooking = http.patch(baseurlpatch, payloadpatch, { headers: jsonpatchheaders });
  sleep(1); // Simula un tiempo de espera entre acciones (opcional)


  //PUT - Actualiza todo el booking creado
  const baseurlput =`${baseurl}/booking/${bookingidnew}`;
  const tokenput = data.token; // Obtén el token del objeto data pasado desde setup()
  const payloadput = JSON.stringify({
      "firstname" : "James",
      "lastname" : "Smith",
      "totalprice" : 111,
      "depositpaid" : true,
      "bookingdates" : {
          "checkin" : "2018-01-01",
          "checkout" : "2019-01-01"
      },
      "additionalneeds" : "Breakfast"
  });
  const jsonputheaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${tokenput}`, // Usa el token obtenido en setup()
  };

  const putbooking = http.put(baseurlput, payloadput, { headers: jsonputheaders });
  sleep(1); // Simula un tiempo de espera entre acciones (opcional)


  //DELETE - Elimina el booking creado
  const urldelete = `${baseurl}/booking/${bookingidnew}`;
  const tokendelete = data.token; // Obtén el token del objeto data pasado desde setup()
  const jsondeleteheaders = {
    'Accept': 'application/json',
    'Cookie': `token=${tokendelete}`, // Usa el token obtenido en setup()
  };

  const deletebooking = http.del(urldelete, null, { headers: jsondeleteheaders });
  sleep(1); // Simula un tiempo de espera entre acciones (opcional)


  //GET - Ping - HealthCheck
  const urlgetping = `${baseurl}/ping`;
  const getping = http.get(urlgetping);
  sleep(1); // Simula un tiempo de espera entre acciones (opcional)
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'summary.json': JSON.stringify(data, null, 2),
    'summary.html': htmlReport(data),
  };
}

export function teardown() {
  console.log('Teardown: prueba finalizada.');
}