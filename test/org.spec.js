import 'regenerator-runtime/runtime';
import 'core-js/stable';
import app from '../src/app';
import request from 'supertest';

test('app should respond on /organization', () => {
    return request(app).get('/organization')
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(1)
        })

})

test('should create a organization', () => {
    const cnpj = Date.now();
    return request(app)
        .post('/organization')
        .send({cnpj: `${cnpj}`, email: 'marcio@email.com', rsocial: "marcioorg"})
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.cnpj).toBe(`${cnpj}`);
        })
})

describe('tests for bad values', () => {
    
    test('should not creat a organization without email', () => {
        return request(app)
            .post('/organization')
            .send({cnpj: `123456789`, rsocial: "marcioorg"})
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body.err).toBe(`Organization needs a CPNJ, Razão Social and Email!`);
            })
    });

    test('should not creat a organization without cnpj', () => {
        return request(app)
            .post('/organization')
            .send({email: 'marcio@email.com', rsocial: "marcioorg"})
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body.err).toBe(`Organization needs a CPNJ, Razão Social and Email!`);
            })
    });

    test('should not creat a organization without rsocial', () => {
        return request(app)
            .post('/organization')
            .send({cnpj: `123456789`, email: 'marcio@email.com'})
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body.err).toBe(`Organization needs a CPNJ, Razão Social and Email!`);
            })
    });

    test('should not create organization with same cnpj', () => {
        return request(app)
                .post('/organization')
                .send({cnpj:'1616023501910', email: 'marcio@email.com', rsocial: "marcioorg"})
                .then((res) => {
                    expect(res.status).toBe(400);
                    expect(res.body.err).toBe(`CNPJ already in use!`);
                })
    });
})


test('should find one organization by ID', () => {
    return request(app)
        .get(`/organization/search?id=10`)
        .then((res) => {
            expect(res.body.id).toBe(10)
        })
})

test('should find one organization by CNPJ', () => {
    return request(app)
        .get(`/organization/search?cnpj=1616023501910`)
        .then((res) => {
            expect(res.body.cnpj).toBe(`1616023501910`)
        })
})

test('should find one organization by rsocial', () => {
     return request(app)
        .get(`/organization/search?rsocial=marcioorg`)
        .then((res) => {
            expect(res.body.rsocial).toBe('marcioorg')
        })
})

test('should not find any organization', () => {
    return request(app)
        .get(`/organization/search?id=0`)
        .then((res) => {
            expect(res.status).toBe(200)
            expect(res.body.err).toBe('Organization not found!');
        })
})
