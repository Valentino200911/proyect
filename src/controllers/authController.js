import * as authService from "../services/authService.js"
import * as userService from "../services/userService.js"

export const registerController = async (req, res) => {

    const data = await authService.registerService(req.body)

    res.status(201).json(data)

}

export const loginController = async (req, res) => {

    const data = await authService.loginService(req.body)

    res.status(200).json(data)

}

// Extra - Acceso a un perfil y verificación de sesión

export const profileController = async (req, res) => {
    
    const user =  await userService.getUserByIdService(req.user.id)

    if (!user) {
        
        return res.status(404).json({ error: "This user does not exist anymore" })
    }

    res.status(200).json(user)

}

