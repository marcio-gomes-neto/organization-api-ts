import app from "../src/index";
import request from "supertest";
import mongoose from "mongoose";

describe("Organization Services", () => {
    
    it("get localhost:3010/", async () => {
        const result = await request(app).get('/');
        expect(result.body.msg).toBe("organizationAPI")
        expect(result.status).toBe(200)
    });

    afterAll(() => { 
        mongoose.connection.close()
    })
})