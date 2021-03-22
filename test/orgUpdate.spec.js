import 'regenerator-runtime/runtime';
import 'core-js/stable';
import app from '../src/app';
import request from 'supertest';

test('should not find any organization', () => {
    return request(app)
        .put(`/organization/update`)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('Organization not found!');
        })
})

test('should not find any organization', () => {
    return request(app)
        .put(`/organization/update?id=0`)
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('Organization not found!');
        })
})

test('should find organization with id=1 and update', () => {
    return request(app)
        .put(`/organization/update?id=1`)
        .send({rsocial: `marcio's org`, endereco: 'rua abcdefg', cidade:'Bh'})
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.msg).toBe('Organization updated with success!');
        })
})
test('should find updated organization', () => {
    return request(app)
        .get(`/organization/search?id=1`)
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.rsocial).toBe(`marcio's org`);
        })
})
