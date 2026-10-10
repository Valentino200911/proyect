import { ErrorApp } from "../../utils/ErrorApp.js";
import Contact from "../models/contactModel.js";

// CRUD general

// Validación del elemento

    export const verifyContactsService = async (contactId) => {
        
        const exist = await Contact.exists({_id: contactId})

        if (!exist) {
            
            throw new ErrorApp(`The Contact "${contactId}" does not exist`, 404);
            
        }

    }

// getAllContactsService

    export const getAllContactsService = async () => {
        
        return await Contact.find({}, {createdAt: 0, updatedAt: 0, __v: 0}).sort( {name: 1} ) // {} es un project a voluntad

    }


// getContactByIdService

    export const getContactByIdService = async (contactId) => {
        
        return await Contact.findById({_id: contactId}, {createdAt: 0, updatedAt: 0, __v: 0}) // {} es un project a voluntad

    }

// createContactService
    
    export const createContactService = async (data) => {
        
        return await Contact.create(data)

    }

// updateContactService

    export const updateContactService = async (contactId, data) => {
        
        return await Contact.findByIdAndUpdate({_id: contactId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

// deleteContactService

        export const deleteContactService = async (contactId) => {
        
        return await Contact.findByIdAndDelete({_id: contactId})

    }