

import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";
import Reservation from "../models/reservationModel.js";
import { ErrorApp } from "../utils/ErrorApp.js";
import { addDays, daysInEighteenYears, parseToLocalDate, parseToNumber, ROLES } from "../utils/constants/generalConstants.js";

// Validación del Usuario

    export const verifyUserService = async (userId) => {
        
        const exist = await User.exists({_id: userId})

        if (!exist) {
            
            throw new ErrorApp(`The user "${userId}" does not exist`, 404);
            
        }

    }

// CRUD General

    // getAllUsersService

    export const getAllUsersService = async ({email, role, phoneNumber} = {}) => {

        const filter = {}

        if (email) {

            filter.email = email

        }

        if (phoneNumber) {

            filter.phoneNumber = phoneNumber

        }

        if (role) {

            filter.role = role

        }

        const users = await User.find(filter, {__v: 0}).sort({name: 1}) // El segundo {} es un project, el primero es un filter
        // No se escribe createdAt: 0 ni upadatedAt: 0 debido a que uno al  hacer la consulta debería poder ver cuando fue creado un usuario

        return users
    }

    // getUserByIdService

    export const getUserByIdService = async (userId) => {
        
        const user = await User.findById({_id: userId}, {__v: 0}) // El segundo {} es un project

        if (!user) {
            
            throw new ErrorApp(`The user "${userId}" does not exist`, 404);

        }

        return user

    }

    // createUserService

    export const createUserService = async (data) => {
        
        if (data.birthDate) {
            
            const today = new Date()

            const eighteenYearsAgo = addDays(today, parseToNumber(daysInEighteenYears) * -1) // Resta

            // Por razones de simplicidad de código, no se tienen en cuenta los años bisiestos y los cambios en las fechas que estos tienen 
            
            const parsedBirthDate = parseToLocalDate(data.birthDate )

            console.log(eighteenYearsAgo);

            if ((today - parsedBirthDate) < (today - eighteenYearsAgo)) {
                
                throw new ErrorApp("You must be at least 18 years old", 400);
                

            } else {

                data.birthDate 

            }
            
        }

        const user = await User.create(data)

        return user
    }

    /*
    Este updateUserService tiene dos flujos diferenciados, porque cuando userId !== null, se está modificando a un tercero, por ende se inicia con el flujo de validación por rol, pero si userId === null el usuario puede modificarse sólo a sí mismo
    
    */

    export const updateUserService = async (userId, modifierId, {name, surname, birthDate, phoneNumber, email, password, role} = {}) => {
    
        // modifierId --> id del usuario que modifica. 

        // userId --> id del usuario a modificar
        
        const modifierUser = await User.findById({_id: modifierId})

        if (!modifierUser) {
            
            throw new ErrorApp(`The modifier user "${modifierId}" does not exist`, 404);

        }


        if (!userId || userId === null) {

                const user = modifierUser

                if (role || email || password) {
                
                throw new ErrorApp("You cannot modify your role, your email or your password", 403);

            }
            if (name) {
                
                user.name = name

            }
            if (surname) {
                
                user.surname = surname

            }
            if (birthDate) {

                const today = new Date()

                const eighteenYearsAgo = addDays(today, parseToNumber(daysInEighteenYears) * -1)
                
                const parsedBirthDate = parseToLocalDate(birthDate)

                if ((today - parsedBirthDate) < (today - eighteenYearsAgo)) {
                    
                    throw new ErrorApp("You must be at least 18 years old", 400);
                    

                } else {

                    user.birthDate = parsedBirthDate

                }
                
            }
            if (phoneNumber) {

                const anotherUser = await User.findOne({phoneNumber: phoneNumber})

                if (anotherUser && !(anotherUser._id.equals(user._id))) {
                    
                    throw new ErrorApp(`There is already an user with the phone number: ${phoneNumber}`, 400);
                    

                } else {

                    user.phoneNumber = phoneNumber

                }
            
            }
            await user.save()

            return user

        }

        const user = await User.findById({_id: userId})

        if (!user) {
            
            throw new ErrorApp(`The user "${userId}" does not exist`, 404);

        }

        
        /*
        CONDICIONES
        
        ADMIN
            - Puede modificar sólo el rol del usuario
            - Cualquier otra modificación induce al error
            
        USER
            - Puede modificar todo, salvo su rol
        */

        if (modifierUser.role === ROLES.ADMIN) {
            
            if (!role || name || surname || birthDate || phoneNumber || email || password) {
                
                throw new ErrorApp("You can only modify the user's role", 400);

            }

            if (user.role === ROLES.ADMIN && role) {
                
                throw new ErrorApp("The user is an admin, you cannot modify that role", 409);

            }

            if (user.role !== ROLES.ADMIN && role === ROLES.ADMIN) {
                
                user.role = ROLES.ADMIN

            }

            await user.save()

            return user
        }

    if (modifierUser.role === ROLES.USER) {
        
        if (!(modifierUser._id.equals(user._id))) {
                
            throw new ErrorApp("You can only modify your own user", 403);

        }
        if (role || email || password) {
            
            throw new ErrorApp("You cannot modify your role, your email or your password", 403);

        }
        if (name) {
            
            user.name = name

        }
        if (surname) {
            
            user.surname = surname

        }
        if (birthDate) {

            const today = new Date()

            const eighteenYearsAgo = addDays(today, parseToNumber(daysInEighteenYears) * -1)
            
            const parsedBirthDate = parseToLocalDate(birthDate)

            if ((today - parsedBirthDate) < (today - eighteenYearsAgo)) {
                
                throw new ErrorApp("You must be at least 18 years old", 400);
                

            } else {

                user.birthDate = parsedBirthDate

            }
            
        }
        if (phoneNumber) {

            const anotherUser = await User.findOne({phoneNumber: phoneNumber})

            if (anotherUser && !(anotherUser._id.equals(user._id))) {
                
                throw new ErrorApp(`There is already an user with the phone number: ${phoneNumber}`, 400);
                

            } else {

                user.phoneNumber = phoneNumber

            }
        
        }
        await user.save()

        return user
    }

    }

    // deleteUserService -- Uno no podría eliminar el usuario si ha hecho una registración o un contacto para mantener la integridad de la DB 


    export const deleteUserService = async (userId) => {
        
        const foundUser = await getUserByIdService(userId)

        if (foundUser.role === ROLES.ADMIN ) {
            
            throw new ErrorApp("An admin cannot delete itself or other admins", 409);
        
        }

        const contacts = await Contact.countDocuments({ user: { _id: userId }})

        const reservations = await Reservation.countDocuments({ user: { _id: userId }})

        if (contacts > 0 || reservations > 0) 
        {
            
            throw new ErrorApp(`The user cannot be deleted becuase it has registered ${contacts} contacts and ${reservations} reservations`, 409)

        }

        const user = await User.findByIdAndDelete({_id: userId})

        if (!user) {
            
            throw new ErrorApp("The user does not exist", 404);
        
        }


        return user
    }


// Obtención por otros métodos

    // searchUserByEmailService

    export const searchUserByEmailService = async (email = "") => {

        const parsedEmail = email.toLowerCase().trim()

        const user = await User.findOne({email: parsedEmail}).select("+password")
        
        return user
    }

    // publicDataOfUser (Sin contraseña)

    export const publicDataOfUser = async (user) => (

        {
        
        _id: user._id,
        name: user.name,
        surname: user.surname,
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role
    }


)