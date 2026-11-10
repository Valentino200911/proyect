import { ErrorApp } from "../utils/ErrorApp.js";
import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import { POPULATE_CONTACT, ROLES } from "../utils/exporter.js";

// CRUD general

// Validación del elemento

    export const verifyContactsService = async (contactId) => {
        
        const exist = await Contact.exists({_id: contactId})

        if (!exist) {
            
            throw new ErrorApp(`The Contact "${contactId}" does not exist`, 404);
            
        }

    }

// getAllContactsService 

    export const getAllContactsService = async (requesterUserId, {userId, reasonOfContact} = {}) => {
        
        const requesterUser = await User.findById({_id: requesterUserId})

        if (!requesterUser) {
            
            throw new ErrorApp("The user making this request does not exist", 404);
            
        }

        if (requesterUser.role === ROLES.ADMIN) {

            const filter = {}

            if (userId) {
                
                const user = await User.findById({_id: userId})

                if (!user) {
                    
                    throw new ErrorApp(`The user with the id ${userId} does not exist`, 404);
                    
                }

                filter.user = userId

            } 

            if (reasonOfContact) {
                
                filter.reasonOfContact = reasonOfContact

            }
            
            const contacts = await Contact.find(filter, { updatedAt: 0, __v: 0}).populate(POPULATE_CONTACT).sort( {createdAt: -1} ) // {} es un project a voluntad

            return contacts
        }
        
        if (requesterUser.role === ROLES.USER) {

            const filter = {user: requesterUserId}
            
            if (userId) {
                
                throw new ErrorApp("You can only see your own contacts", 403);
                
            }
            
            if (reasonOfContact) {
                
                filter.reasonOfContact = reasonOfContact

            }
        
            const contacts = await Contact.find(filter, { __v: 0}).populate(POPULATE_CONTACT).sort( {createdAt: -1} ) // {} es un project a voluntad
            
            return contacts
            
        }

    }


// getContactByIdService

    export const getContactByIdService = async (contactId, userId) => {
        
        const user = await User.findById({_id: userId})

        if (!user) {
            
            throw new ErrorApp("The user does not exist", 404);
            
        }

        const filter = {_id: contactId}
        
        filter.user = userId

        if (user.role === ROLES.ADMIN) {
            
            const contact = await Contact.findById({_id: contactId}, { updatedAt: 0, __v: 0}).populate(POPULATE_CONTACT) // {} es un project a voluntad

            return contact
        }
        
        if (user.role === ROLES.USER) {
            
            const contact = await Contact.findOne(filter, { updatedAt: 0, __v: 0}).populate(POPULATE_CONTACT) // {} es un project a voluntad

            return contact
            
        }
    }

// createContactService
    
    export const createContactService = async (userId, data) => {

        data.user = userId

        const user = await User.findById({_id: userId})

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

        if (!contact) {
            
            throw new ErrorApp(`The contact with the _id ${contactId} does not exist`, 404);
        
        }


        return contact

    }

// deleteContactService

    export const deleteContactService = async (contactId) => {
        
        const contact = await Contact.findByIdAndDelete({_id: contactId})

        if (!contact) {
            
            throw new ErrorApp(`The contact with the _id ${contactId} does not exist`, 404);
        
        }

        return contact.populate(POPULATE_CONTACT)
    }