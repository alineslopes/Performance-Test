import http from 'k6/http';
import { check } from 'k6';

export let options = { vus: 5, duration: '30s' };

export default function () {
  const login = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
    username: 'testuser',
    password: 'testpass',
  }), { headers: { 'Content-Type': 'application/json' } });

  const token = login.json('access');

  const res = http.patch('https://test-api.k6.io/auth/users/me/', JSON.stringify({
    first_name: 'QA',
    last_name: 'Tester',
  }), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  check(res, {
    'profile updated': (r) => r.status === 200 && r.json('first_name') === 'QA',
  });
}