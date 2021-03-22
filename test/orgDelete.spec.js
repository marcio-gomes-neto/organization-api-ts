import 'regenerator-runtime/runtime';
import 'core-js/stable';
import app from '../src/app';
import request from 'supertest';

test('should not find any organization', () => {
    return request(app)
        .delete(`/organization/delete`)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('Organization not found!');
        })
})

test('should not find any organization', () => {
    return request(app)
        .delete(`/organization/delete?id=0`)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('Organization not found!');
        })
})

test.skip('should find and destroy organization id=30', () => {
    return request(app)
        .delete(`/organization/delete?id=31`)
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Organization Deleted!');
            expect(res.body.deletedId).toBe("31");
        })
})

test('should not find organization id=30', () => {
    return request(app)
        .get(`/organization/search?id=30`)
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.err).toBe('Organization not found!')
        })
})
