import http from 'k6/http';
import { check } from 'k6';

export let options = { vus: 5, duration: '30s' };

export default function () {
  const login = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
    username: 'testuser',
    password: 'testpass',
  }), { headers: { 'Content-Type': 'application/json' } });

  const token = login.json('access');

  // Cria post
  const createRes = http.post('https://test-api.k6.io/my/crocodiles/', JSON.stringify({
    name: 'DeleteMe',
    sex: 'F',
    date_of_birth: '2018-08-08',
  }), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const id = createRes.json('id');

  // Deleta post
  const deleteRes = http.del(`https://test-api.k6.io/my/crocodiles/${id}/`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(deleteRes, {
    'post deleted': (r) => r.status === 204,
  });
}