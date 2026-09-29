
import mongoose from "mongoose";
import { ErrorApp } from "../../utils/ErrorApp.js";
import User from "../models/userModel.js";

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

        return await User.find().sort({name: 1})

    }

    // getUserByIdService

    export const getUserByIdService = async (userId) => {
        
        return await User.findById({_id: userId})

    }

    // createUserService

    export const createUserService = async (data) => {
        
        return await User.create(data)
    }

    // updateUserService  

    export const updateUserService = async (userId, data) => {
    
        return await User.findByIdAndUpdate({_id: userId}, data)

    }

    // deleteUserService

    export const deleteUserService = async (userId) => {
        
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