import express from "express";
import mongoose from "mongoose";
import {routes} from "./routes";

class App{
    public express: express.Application
    
    constructor(){
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    public middleware() {
        this.express.use(express.json())
    }

    public async database(){
        try {
            mongoose.connect('mongodb://127.0.0.1:27017/planeta-hulk');
            console.log('Conectado com a base de dados')
        } catch (error) {
            console.log("Erro ao conectar com a base de dados:", error)
        }
    }

    public routes() {
        this.express.use(routes)

    }
}

export default new App().express