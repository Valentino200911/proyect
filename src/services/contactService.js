import { POPULATE_CONTACT } from "../utils/constants/generalConstants.js";
import { ErrorApp } from "../utils/ErrorApp.js";
import Contact from "../models/contactModel.js";
import { verifyUserService } from "./userService.js";

// CRUD general

// Validación del elemento

    export const verifyContactsService = async (contactId) => {
        
        const exist = await Contact.exists({_id: contactId})

        if (!exist) {
            
            throw new ErrorApp(`The Contact "${contactId}" does not exist`, 404);
            
        }

    }

// getAllContactsService 

    export const getAllContactsService = async (userId = null) => {
        
        const filter = {}

        if (userId !== null) {
            
            filter.user = userId

        }
 
        const contacts = await Contact.find(filter, {createdAt: 0, updatedAt: 0, __v: 0}).populate(POPULATE_CONTACT).sort( {name: 1} ) // {} es un project a voluntad

        return contacts
    }


// getContactByIdService

    export const getContactByIdService = async (contactId, userId = null) => {
        
        const filter = {_id: contactId }

        if (userId !== null) {
            
            filter.user = userId

        }

        const contact = await Contact.findOne(filter, { __v: 0}).populate(POPULATE_CONTACT) // {} es un project a voluntad

        if (!contact) {
            
            throw new ErrorApp("The contact does not exist or you do not have access to it", 403);

        }

        return contact
    }

// createContactService
    
    export const createContactService = async (userId, data) => {

        data.user = userId

        const user = await verifyUserService

        if (!user) {
            
            throw new ErrorApp("The user does not exist", 404);
        
        }

        const contact = await Contact.create(data)

        return contact.populate(POPULATE_CONTACT)

    }

// updateContactService

    export const updateContactService = async (contactId, data) => {
        
        const contact = await Contact.findByIdAndUpdate({_id: contactId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    ).populate(POPULATE_CONTACT)

    return contact

    }

// deleteContactService

        export const deleteContactService = async (contactId) => {
        
        const contact = await Contact.findByIdAndDelete({_id: contactId}).populate(POPULATE_CONTACT)

        return contact
    }