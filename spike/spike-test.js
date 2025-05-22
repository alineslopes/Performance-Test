import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}