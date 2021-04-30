import OrgServices from "../src/services/orgServices";
import app from "../src/index";
import request from "supertest";
import mongoose from "mongoose";
import Organization from "../src/interfaces/organization-interface";
import { convertTypeAcquisitionFromJson, isTemplateLiteralToken } from "typescript";

describe("Organization Services", () => {
    let testOrg:Organization; 

    it.skip("get all orgs", async () => {
        const result = await request(app).get('/organization');
        expect(result.body.orgs.length).toBeGreaterThanOrEqual(0);
        expect(result.status).toBe(200)
    });

    it("create new org", async () => {
        const cnpj = `${Date.now()}000`
        const result = await request(app)
            .post('/organization')
            .send({cnpj:cnpj, rsocial:"marcioOrganization", email:"mail@mail.com"})
        expect(result.body.data.cnpj).toBe(cnpj);
        expect(result.status).toBe(201)
        testOrg = result.body.data;
    });

    it.skip("should not create new org with same cnpj", async () => {
        const cnpj = testOrg.cnpj;
        const result = await request(app)
            .post('/organization')
            .send({cnpj:cnpj, rsocial:"marcioorg", email:"mail@mail.com"})
        expect(result.body.err).toBe("CNPJ already in use!");
        expect(result.status).toBe(400)
    });

    it.skip("search testOrg by cnpj", async () => {
        const result = await request(app)
            .get(`/organization/search/cnpj/${testOrg.cnpj}`)
        expect(result.body.data).toStrictEqual(testOrg);
        expect(result.status).toBe(200)
    });

    it.skip("search testOrg by rsocial", async () => {
        const result = await request(app)
            .get(`/organization/search/name/${testOrg.rsocial}`)
        expect(result.body.data.length).toBeGreaterThanOrEqual(0);
        expect(result.status).toBe(200)
    });

    it.skip("search testOrg by id", async () => {
        const result = await request(app)
            .get(`/organization/search/id/${testOrg._id}`)
        expect(result.body.data._id).toBe(testOrg._id);
        expect(result.status).toBe(200)
    });

    it.skip("should find by id and update", async () => {
        const result = await request(app)
            .put(`/organization/update/${testOrg._id}`)
            .send({contato:"33034445"})
        expect(result.body.data.contato).toBe("33034445");
        expect(result.status).toBe(200)
    });

    describe('delete tests', () => {
            it.skip("should delete created organization", async () => {
            const result = await request(app)
                .delete(`/organization/delete/${testOrg._id}`)
            expect(result.body.data).toStrictEqual(testOrg) 
            expect(result.status).toBe(200) 
            })
            
            it.skip("should not delete with invalid id", async () => {
                const result = await request(app)
                    .delete(`/organization/delete/${testOrg._id}`)
                expect(result.body.err).toStrictEqual("Organization Not Found") 
                expect(result.status).toBe(404) 
            })

            it.skip("should not find testOrg by id", async () => {
                const result = await request(app)
                    .get(`/organization/search/id/${testOrg._id}`)
                expect(result.body.err).toBe("No Organization Found");
                expect(result.status).toBe(404)
            });
        
            it.skip("should not find by id and update", async () => {
                const result = await request(app)
                    .put(`/organization/update/${testOrg._id}`)
                    .send({contato:"33034445"})
                expect(result.body.err).toBe("Organization Not Found");
                expect(result.status).toBe(404)
            });
    })

    it.skip("should find by id and dont update cnpj", async () => {
        const result = await request(app)
            .put(`/organization/update/${testOrg._id}`)
            .send({cnpj:"12312", contato:"33034445"})
        expect(result.body.err).toBe("Cannot change Organization CNPJ");
        expect(result.status).toBe(400)
    });

    describe('invalid values test', () => {
            it('should not create organization with invalid cnpj', async () => {
                const result = await request(app)
                    .post('/organization')
                    .send({cnpj:"000", rsocial:"marcioOrganization", email:"mail@mail.com"})
                expect(result.body.errors.length).toBeGreaterThanOrEqual(1);
                expect(result.status).toBe(400)
            })

            it('should not create organization with invalid email', async () => {
                const result = await request(app)
                    .post('/organization')
                    .send({cnpj:"12345678912465789", rsocial:"marcioOrganization", email:"mail"})
                expect(result.body.errors.length).toBeGreaterThanOrEqual(1);
                expect(result.status).toBe(400)
            })

            it('should not create organization with empty email', async () => {
                const result = await request(app)
                    .post('/organization')
                    .send({cnpj:"12345678912465789", rsocial:"marcioOrganization", email:""})
                expect(result.body.errors.length).toBeGreaterThanOrEqual(1);
                expect(result.status).toBe(400)
            })

            it('should not create organization with invalid rsocial', async () => {
                const result = await request(app)
                    .post('/organization')
                    .send({cnpj:"12345678912465789", rsocial:"", email:"mail@mail.com"})
                expect(result.body.errors.length).toBeGreaterThanOrEqual(1);
                expect(result.status).toBe(400)
            })
    })

    afterAll(() => { 
        mongoose.connection.close()
    })
})