
import * as userService from "../services/userService.js"

// getAllUsersController

export const getAllUsersController = async (req, res) => {
    
        const users = await userService.getAllUsersService(req.query)

        res.status(200).json(users)

}

// getUserByIdController

export const getUserByIdController = async (req, res) => {
    
    const user = await userService.getUserByIdService(req.params.id)

    res.status(200).json(user)

}

// createUserController

export const createUserController =  async (req, res) => {
    
    const user = await userService.createUserService(req.body)

    res.status(201).json(user)

}

// updateUserController 

export const updateUserController = async (req, res) => {
    
    const user = await userService.updateUserService(req.params.id, req.user.id, req.body)

    res.status(200).json(user)

}

// deleteUserController

export const deleteUserController = async (req, res) => {
    
    const user = await userService.deleteUserService(req.params.id)

    res.status(200).json(user)

}
