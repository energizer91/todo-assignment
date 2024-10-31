import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 virtual users over 30 seconds
    { duration: '1m', target: 50 },   // Hold at 50 users for 1 minute
    { duration: '30s', target: 0 },   // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  const loginPayload = JSON.stringify({
    email: 'foo@bar.com',
    password: '12345678',
  });
  const loginHeaders = { 'Content-Type': 'application/json' };

  const loginRes = http.post('http://localhost:30081/api/users/login', loginPayload, { headers: loginHeaders });

  check(loginRes, {
    'login status is 201': (r) => r.status === 201,
    'received auth token': (r) => r.json('access_token') !== '',
  });

  sleep(1);
}