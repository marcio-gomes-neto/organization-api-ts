import express from 'express';
import './database';
import homeRoute from './routes/homeRoute';
import orgRoute from './routes/orgRoute';
import orgUsersRoute from './routes/orgUsersRoute';

class App {
    constructor(){
        this.app = express();
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/', homeRoute);
        this.app.use('/organization', orgRoute);
        this.app.use('/users', orgUsersRoute)

    }
}

export default new App().app;

