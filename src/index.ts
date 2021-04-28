import express from "express";
import { promises } from "node:stream";
import App from "./app";
import HomeController from "./controllers/HomeController";
import OrgController from "./controllers/OrgController";
import BootstrapApp from "./interfaces/bootstrap-app";

const bootstrapApp:BootstrapApp = {app: express(), middlewares: [express.urlencoded({ extended: true }), express.json()], controllers: [new HomeController(), new OrgController()] };

const app = new App(bootstrapApp);

Promise.resolve().then(() => {
    app.initDatabase();
    
}).then(() => {
    app.start(3010);

}).catch((err) => {
    console.log(err);

}) ;

