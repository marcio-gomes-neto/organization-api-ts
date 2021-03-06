import express from "express";
import App from "./app";
import HomeController from "./controllers/HomeController";
import OrgController from "./controllers/OrgController";
import BootstrapApp from "./interfaces/bootstrap-app";

const app = express();
const bootstrapApp:BootstrapApp = {app: app, middlewares: [express.urlencoded({ extended: true }), express.json()], controllers: [new HomeController(), new OrgController()] };

const server = new App(bootstrapApp);

Promise.resolve().then(() => {
    server.initDatabase();
    
}).then(() => {
    server.start(3010);

}).catch((err) => {
    console.log(err);

});

export default app;