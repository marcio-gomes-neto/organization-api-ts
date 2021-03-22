import 'regenerator-runtime/runtime';
import 'core-js/stable';
import app from '../src/app';
import request from 'supertest';

test('app should respond on /',() => {
  return request(app).get('/')
    .then((res) => {
        expect(res.status).toBe(200);
    })
})