import 'regenerator-runtime/runtime';
import 'core-js/stable';
import app from '../src/app';
import request from 'supertest';

test('should not find any user', () => {
    return request(app)
        .delete(`/users/delete`)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('User not found!');
        })
})

test.skip('should delete one user', () => {
    return request(app)
        .delete(`/users/delete?id=2`)
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('User Deleted!');
        })
})

test('should not find user id=1', () => {
    return request(app)
        .get(`/users/search?t=user&id=2`)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('User not found!');
        })
})
