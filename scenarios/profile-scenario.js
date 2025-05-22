import http from 'k6/http';
import { check } from 'k6';

export let options = { vus: 10, duration: '30s' };

export default function () {
  const login = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
    username: 'testuser',
    password: 'testpass',
  }), { headers: { 'Content-Type': 'application/json' } });

  const token = login.json('access');

  const res = http.get('https://test-api.k6.io/auth/users/me/', {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(res, {
    'fetched profile': (r) => r.status === 200 && r.json('username') === 'testuser',
  });
}