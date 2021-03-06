import express from 'express';
import BootstrapApp from './interfaces/bootstrap-app';
import mongoose from "mongoose"

export default class App {

    private app;

    constructor(initApp:BootstrapApp){
        
        this.app = initApp.app;
        this.initializeMiddlewares(initApp.middlewares);
        this.initializeControllers(initApp.controllers);
    }

    start(port:number){
        this.app.listen(port, () => {
          console.log("Server On");
        })
    }

    initializeControllers(controllers:any) {
       controllers.forEach((controller:any) => {
           this.app.use(controller.routerPath,controller.route())
       });
        
    }

    initializeMiddlewares(middlewares:any) {
        middlewares.forEach((middleware:any) => {
            this.app.use(middleware);
        });
         
     }

    async initDatabase(): Promise<void> {

        mongoose
          .connect("mongodb+srv://admin:admin@cursojs.awfzm.mongodb.net/agendaDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => {
            return console.log(`Successfully connected to mongodbsrv`);
          })
          .catch(error => {
            console.log("Error connecting to database: ", error);
            return process.exit(1);
          });
    
      
    }

    // routes(){
    //     this.app.use('/', homeRoute);
    //     this.app.use('/organization', orgRoute);
    //     this.app.use('/users', orgUsersRoute)

    // }
}