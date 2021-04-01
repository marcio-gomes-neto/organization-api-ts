import 'regenerator-runtime/runtime';
import 'core-js/stable';
import app from '../src/app';
import request from 'supertest';

test('app should respond on /users', () => {
    return request(app)
    .get(`/users`)
    .then((res) => {
        expect(res.status).toBe(200)

    })
})

test('app should find one user', () => {
    return request(app)
    .get(`/users/search?t=user&id=5`)
    .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.nome).toBe('Márcio')
    })
})

test('should create a new user ', () => {
    return request(app)
        .post('/users')
        .send({nome: 'Márcio', organizationId: 10, email: `${Date.now()}@mail.com`})
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body.msg).toBe('User from Organization marcioorg created!');
        })
})

describe('testing the bad values',() => {

    test('should fail with no name', () => {
        return request(app)
        .post('/users')
        .send({ organizationId: 5, email: 'marcio@mail.com'})
        .then((res) => {
            expect(res.status).toBe(400)
            expect(res.body.err).toBe('A User needs Name, Organization ID and Email!');
        })
    })

    test('should fail with no organizationId ', () => {
        return request(app)
            .post('/users')
            .send({nome: 'Márcio', email: 'marcio@mail.com'})
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body.err).toBe('A User needs Name, Organization ID and Email!');
            })
    })

    test('should fail with no email ', () => {
        return request(app)
            .post('/users')
            .send({nome: 'Márcio', organizationId: 5})
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body.err).toBe('A User needs Name, Organization ID and Email!');
            })
    })

    test('should fail with no email in use ', () => {
        return request(app)
            .post('/users')
            .send({nome: 'Márcio', organizationId: 5, email: 'marcio@mail.com'})
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body.err).toBe('This email is already in use!');
            })
    })

    test('should fail with no organization found ', () => {
        return request(app)
            .post('/users')
            .send({nome: 'Márcio', organizationId: 30, email: '123456789@mail.com'})
            .then((res) => {
                expect(res.status).toBe(400)
                expect(res.body.err).toBe('No organization found with such ID');
            })
    })
})

test('app should search all users from org:id=5', () => {
    return request(app)
    .get(`/users/search?t=org&id=5`)
    .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.msg).toBe('Organization marcioorg have 9 users!')

    })
})

test('should not find any user on org 50', () => {
    return request(app)
    .get(`/users/search?t=org&id=50`)
    .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.msg).toBe("Organization marcioorg have no Users!")

    })
})