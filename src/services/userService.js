import { handleError } from "../../middlewares/handleError.js";
import mongoose from "mongoose";
import { ErrorApp } from "../../utils/ErrorApp.js";
import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";
// import Reservation from "../models/reservationModel";

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

        return await User.find({}, {__v: 0}).sort({name: 1}) // El segundo {} es un project, el primero es un filter
        // No se escribe createdAt: 0 ni upadatedAt: 0 debido a que uno al  hacer la consulta debería poder ver cuando fue creado un usuario
    }

    // getUserByIdService

    export const getUserByIdService = async (userId) => {
        
        return await User.findById({_id: userId}, {__v: 0}) // El segundo {} es un project

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

        // const reservations = await Reservation.countDocuments({ userId: { _id: userId }})

        if (contacts > 0) // es (contacts && reservations > 0) 
        {
            
            throw new ErrorApp(`The user cannot be deleted becuase it has registered ${contacts} contacts`, 409) // and ${reservations} reservations`, 409)

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
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role
    })