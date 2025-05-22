import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: '1m',
};

export default function () {
  const url = 'https://test-api.k6.io/auth/token/login/';
  const payload = JSON.stringify({
    username: 'testuser',
    password: 'testpass',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);
  check(res, {
    'login succeeded': (r) => r.status === 200 && r.json('access') !== '',
  });
}