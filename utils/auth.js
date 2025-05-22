import http from 'k6/http';

export function getAuthToken(username = 'testuser', password = 'testpass') {
  const res = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify({
    username,
    password,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  return res.json('access');
}