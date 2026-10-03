import { handleError } from "../../middlewares/handleError.js";
import mongoose from "mongoose";
import { ErrorApp } from "../../utils/ErrorApp.js";
import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";

// Validación del Usuario

    export const verifyUserService = async (userId) => {
        
        const exist = await User.exists({_id: userId})

        if (!exist) {
            
            throw new ErrorApp(`The user "${userId}" does not exist`, 404);
            
        }

    }

// CRUD General

    // getAllUsersService

    export const getAllUsersService = async () => {

        return await User.find({}, {}).sort({name: 1}) // El segundo {} es un project, el primero es un filter

    }

    // getUserByIdService

    export const getUserByIdService = async (userId) => {
        
        return await User.findById({_id: userId}, {}) // El segundo {} es un project

    }

    // createUserService

    export const createUserService = async (data) => {
        
        return await User.create(data)
    }

    // updateUserService  

    export const updateUserService = async (userId, data) => {
    
        return await User.findByIdAndUpdate({_id: userId}, data, {

        returnDocument: "after",

        runValidators: true,

        }
    )

    }

    // deleteUserService -- Uno no podría eliminar el usuario si ha hecho una registración o un contacto para mantener la integridad de la DB (gap)


    export const deleteUserService = async (userId) => {
        
        const contacts = await Contact.countDocuments({ user: { _id: userId }})

        const reservations = await Reservation.countDocuments({ user: { _id: userId }})

        if (contacts && reservations > 0) {
            
            throw new ErrorApp(`The user cannot be deleted becuase it has registered ${contacts} contacts and ${reservations} reservations`, 409)

        }

        return await User.findByIdAndDelete({_id: userId})
    }


// Obtención por otros métodos

    // searchUserByEmailService

    export const searchUserByEmailService = async (email = "") => {

        await User.findOne( { email: email.toLowerCase().trim() }).select("+password")
    }

    // publicDataOfUser (Sin contraseña)

    export const publicDataOfUser = async (user) => ({
        
        _id: user._id,
        name: user.name,
        surname: user.surname,
        birthYear: user.birthYear,
        email: user.email,
        role: user.role
    })