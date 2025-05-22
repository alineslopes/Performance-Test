import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const uniqueUsername = `user_${uuidv4().substring(0, 8)}`;
  const payload = JSON.stringify({
    username: uniqueUsername,
    email: `${uniqueUsername}@example.com`,
    password: 'Test1234!',
  });

  const res = http.post('https://test-api.k6.io/user/register/', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'user registered': (r) => r.status === 201,
  });
}