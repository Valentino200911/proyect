import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../utils/config.js"
import { createUserService, publicDataOfUser, searchUserByEmailService } from "./userService.js"
import { ErrorApp } from "../../utils/ErrorApp.js"

// Responsabilidad del componente

// 1- Firma del token

    const signToken =  (user) => {

        return jwt.sign(

            // User data
            {id: user._id, role: user.role,},

            // Secreto
            JWT_SECRET,

            // Tiempo de expiración
            {expiresIn: JWT_EXPIRES_IN}

        )

    }

// POST api/auth/register

export const registerService = async ({name, surname, birthDate, phoneNumber, email,  password, role}, {} = {}) => {

    const user = await createUserService({name, surname, birthDate, phoneNumber, email,  password, role})

    if (!user) {
        
        throw new ErrorApp("Error with the register", 400);

    }
    // Práctica usual: Lo comun es recibir un email para confirmar tu cuenta

    return {user: user, token: signToken(user) }

}

export const loginService = async ({email, password} = {}) => {

    if (!email || !password) {
        
        throw new ErrorApp("The email and/or the password are required to login", 400)

    }

    const user = await searchUserByEmailService(email)

    // Validación

    if (!user || !(await user.comparePassword(password))) {
        
        throw new ErrorApp("The email or the password are incorrect", 401);
        
    }

    return {user: user, token: signToken(user)} // De por sí el usuario viene sin la contraseña en authService

}