// init context: importing modules
import http from 'k6/http';
import { sleep } from 'k6'; //sleep lo usamos solo si quieres simular respiritos entre pasos
import { check } from 'k6'; //check te permite afirmar “status 200”, “tiene id”, etc.
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


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
    check(createtoken, { // Check es como el “expect” de Playwright o el “assert” de Pytest || createtoken: es el objeto que devuelve http.post, http.get, etc.
      'login status 200': (r) => r.status === 200, // r: es la condición que debe cumplirse.
      'token present': (r) => r.json('token') !== '', // Léame el JSON de esta respuesta y deme el valor que tenga el campo 'token' || Asegúrese de que el token no sea una cadena vacía. 
    });

  const token = createtoken.json('token'); // Extrae el token de la respuesta JSON
  console.log(`Token obtenido: ${token}`); // Muestra el token en la consola de k6

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
  console.log(`Response body: ${createbooking.body}`); // Muestra el cuerpo de la respuesta en la consola de k6

  check(createbooking, {
      'login status 200': (r) => r.status === 200,
      'bookingid present': (r) => r.json('bookingid') !== '', 
    });

  const bookingidnew = createbooking.json('bookingid'); 
  console.log(`Bookingid obtenido: ${bookingidnew}`); 


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
  console.log(`Response body: ${updatebooking.body}`); // Muestra el cuerpo de la respuesta en la consola de k6

  check(updatebooking, {
    'update status 200': (r) => r.status === 200,
    'firstname updated': (r) => r.json('firstname') === updatebooking.json('firstname'),
    'lastname updated': (r) => r.json('lastname') === updatebooking.json('lastname'),
  });


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
  console.log(`Response body: ${putbooking.body}`); // Muestra el cuerpo de la respuesta en la consola de k6

  check(putbooking, {
    'put status 200': (r) => r.status === 200,
    'firstname updated': (r) => r.json('firstname') === 'James',
    'lastname updated': (r) => r.json('lastname') === 'Smith',
  });


  sleep(1); // Simula un tiempo de espera entre acciones (opcional)


  //DELETE - Elimina el booking creado
  const urldelete = `${baseurl}/booking/${bookingidnew}`;
  const tokendelete = data.token; // Obtén el token del objeto data pasado desde setup()
  const jsondeleteheaders = {
    'Accept': 'application/json',
    'Cookie': `token=${tokendelete}`, // Usa el token obtenido en setup()
  };

  const deletebooking = http.del(urldelete, null, { headers: jsondeleteheaders });
  check(deletebooking, {
    'delete status 201': (r) => r.status === 201,
  });


  console.log(`Status code: ${deletebooking.status}`); // Muestra el código de estado en la consola de k6
  console.log(`Response body: ${deletebooking.body}`); // Muestra el cuerpo de la respuesta en la consola de k6


  sleep(1); // Simula un tiempo de espera entre acciones (opcional)


  //GET - Ping - HealthCheck
  const urlgetping = `${baseurl}/ping`;
  const getping = http.get(urlgetping);
  check(getping, {
    'ping status 201': (r) => r.status === 201,
  });
  console.log(`Status code: ${getping.status}`);

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