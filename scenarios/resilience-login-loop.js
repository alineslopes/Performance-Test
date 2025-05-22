import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = { vus: 1, iterations: 20 };

const users = [
  { username: 'aline01', password: 'Test123!' },
  { username: 'aline02', password: 'Test123!' },
  { username: 'aline03', password: 'Test123!' },
];

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  const res = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'login ok': (r) => r.status === 200,
  });

  sleep(1);
}