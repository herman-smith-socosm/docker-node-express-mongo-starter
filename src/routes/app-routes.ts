import {Request, Response, NextFunction} from "express";
import { ContactsRepository } from "../repositories/contacts-repository";

export class AppRoutes { 
    
    private contactsRepository: ContactsRepository = new ContactsRepository();

    public establishRoutes(app): void {                   

        app.route('/')
        .get((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({
                service: process.env.SERVICE_TAG,
                status: 'UP',
                method: 'GET'
            })
        })
        .post((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({
                service: process.env.SERVICE_TAG,
                status: 'UP',
                method: 'POST'
            })
        })

        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`route: ${req.originalUrl}`);
            console.log(`method: ${req.method}`);
            next();
        }, this.contactsRepository.getContacts)        
        .post(this.contactsRepository.addNewContact);

        // Contact Detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.contactsRepository.getContactWithID)
        .put(this.contactsRepository.updateContact)
        .delete(this.contactsRepository.deleteContact)
    }
}