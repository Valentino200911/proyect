import * as contactService from "../services/contactService.js";

// getAllContactsController

    export const getAllContactsController = async (req, res) => {
        
        const role = req.user.role

        if (role === "admin") {
            
            const allContacts = await contactService.getAllContactsService()

            res.status(200).json(allContacts)

        } else {

            const allUserContacts = await contactService.getAllContactsService(req.user.id)

            res.status(200).json(allUserContacts)
        }
    }


// getContactByIdController

    export const getContactByIdController = async (req, res) => {
        
        const role = req.user.role

        if (role === "admin") {
            
            const specificContact = await contactService.getContactByIdService(req.params.id)

            res.status(200).json(specificContact)
            
        } else {

            const mySpecificContect = await contactService.getContactByIdService(req.params.id, req.user.id)

            res.status(200).json(mySpecificContect)
            
        }

    }

// createContactController

    export const createContactController = async (req, res) => {
        
        const contact = await contactService.createContactService(req.user.id, req.body)
    
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

