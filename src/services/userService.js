import User from "../models/userModel.js";
import { ErrorApp } from "../models/ErrorApp.js";

// Validación del Usuario

    export const verifyUserService = async (userId) => {
        
        const exists = await User.exists({_id: userId})

        if (!exists) {
            
            throw new ErrorApp(`The user "${userId}" does not exist`, 404);
            
        }

    }

// CRUD General

    // getAllUsersService

    export const getAllUsersService = async () => {

        await User.sort({name: 1})

    }

    // getUserByIdService

    export const getUserByIdService = async (userId) => {
        
        await User.findById(userId)

    }

    // createUserService

    export const createUserService = async (data) => {
        
        await User.create(data)
    }

    // updateUserService  

    export const updateUserService = async (userId) => {
        
        await User.findByIdAndUpdate(userId)
    }

    // deleteUserService

    export const deleteUserService = async (userId) => {
        
        await User.findByIdAndDelete(userId)
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