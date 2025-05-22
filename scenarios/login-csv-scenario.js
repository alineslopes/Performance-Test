// scenarios/login-csv-scenario.js
import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export let options = {
  vus: 5,
  duration: '1m',
};

// Carregar e parsear os dados CSV
const csvData = new SharedArray('Users data', function () {
  return papaparse.parse(open('../data/users.csv'), { header: true }).data;
});

export default function () {
  // Escolhe um usuário aleatório do CSV
  const user = csvData[Math.floor(Math.random() * csvData.length)];

  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post('https://test-api.k6.io/auth/token/login/', payload, { headers });

  check(res, {
    'login status 200': (r) => r.status === 200,
    'access token returned': (r) => r.json('access') !== '',
  });
}