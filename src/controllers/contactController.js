import * as contactService from "../services/contactService.js";

// getAllContactsController

    export const getAllContactsController = async (req, res) => {

            const contacts = await contactService.getAllContactsService(req.user.id, req.query)

            res.status(200).json(contacts)

    }

// getContactByIdController

    export const getContactByIdController = async (req, res) => {
        
        const contact = await contactService.getContactByIdService(req.params.id, req.user.id)

        res.status(200).json(contact)

    }

// createContactController

    export const createContactController = async (req, res) => {
        
        const contact = await contactService.createContactService(req.user.id, req.body)
    
        res.status(201).json(contact)
    }

// updateContactController

    export const updateContactController = async (req, res) => {
        
        const contact = await contactService.updateContactService(req.params.id, req.body)
    
        res.status(200).json(contact)

    }

// deleteContactController

    export const deleteContactController = async (req, res) => {
        
        const contact = await contactService.deleteContactService(req.params.id)
    
        res.status(200).json(contact)

    }

