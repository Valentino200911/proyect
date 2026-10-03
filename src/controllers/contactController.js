import * as contactService from "../services/contactService.js";

// getAllContactsController

    export const getAllContactsController = async (req, res) => {
        
        const contact = await contactService.getAllContactsService(req.query)

        res.status(200).json(contact)

    }


// getContactByIdController

    export const getContactByIdController = async (req, res) => {
        
        const contact = await contactService.getContactByIdService(req.params.id)
    
        if (!contact) {
            
            res.status(404).json({error: "The Contact required by the controller with GET does not exist"})
        }
    
        res.status(200).json(contact)
    }

// createContactController

    export const createContactController = async (req, res) => {
        
        const contact = await contactService.createContactService(req.body)
    
        res.status(201).json(contact)
    }

// updateContactController

    export const updateContactController = async (req, res) => {
        
        const contact = await contactService.updateContactService(req.params.id, req.body)
    
        if (!contact) {
            
            res.status(404).json({error: "The Contact required by the controller with UPDATE does not exist"})
        }
    
        res.status(200).json(contact)
    }

// deleteContactController

    export const deleteContactController = async (req, res) => {
        
        const contact = await contactService.deleteContactService(req.params.id)
    
        if (!contact) {
            
            res.status(404).json({error: "The Contact required by the controller with DELETE does not exist"})
        }
    
        res.status(200).json(contact)
    }

