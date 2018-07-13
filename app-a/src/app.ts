import { Request, Response, NextFunction } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes/app-routes";

export default class App {

    private appRoutes: AppRoutes = new AppRoutes();
    public expressApp: express.Application;

    constructor() {
        this.expressApp = express();
        this.configure();        
    }

    private configure(): void{
        this.middleware();
        this.appRoutes.establishRoutes(this.expressApp)
    }

    private middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.expressApp.use(express.static('public'));
    }
}
