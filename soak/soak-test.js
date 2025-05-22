import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 30,
  duration: '30m',
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}