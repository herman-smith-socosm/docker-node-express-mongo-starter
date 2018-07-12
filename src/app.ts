import { Request, Response, NextFunction } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.config();        
        this.route();     
    }

    private config(): void{
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.express.use(express.static('public'));
    }

    private route(): void{

        this.express.route('/')
        .get((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({
                tag: process.env.TAG,
                message: 'UP',
                method: 'GET'
            })
        })
        .post((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({
                message: 'POST'
            })
        })

        // Contact 
        this.express.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, this.contactController.getContacts)        

        // POST endpoint
        .post(this.contactController.addNewContact);

        // Contact detail
        this.express.route('/contact/:contactId')
        // get specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)


    }
}

export default new App().express;