import { ErrorApp } from "../../utils/ErrorApp.js"
import * as userService from "../services/userService.js"

// getAllUsersController

export const getAllUsersController = async (req, res) => {
    
    try {

        const users = await userService.getAllUsersService()

        res.status(200).json(users)

    } catch (error) {
        
        res.status(500).json({ error: error.message });

        console.log("It was not possible to GET all users");
        
    }

}

// getUserByIdController

export const getUserByIdController = async (req, res) => {
    
    const user = await userService.getUserByIdService(req.params.id)

    if (!user) {
        
        return res.status(404).json({error: "The user required by the controller with GET does not exist"})
        
    } else {

        res.status(200).json(user)

    }

}

// createUserController

export const createUserController =  async (req, res) => {
    
    const user = await userService.createUserService(req.body)

    res.status(201).json(user)

}

// updateUserController 

export const updateUserController = async (req, res) => {
    
    const user = await userService.updateUserService(req.params.id, req.body)

    if (!user) {
        
        return res.status(404).json({error: "The user required by the controller with UPDATE does not exist"})
        
    } else {

        res.status(200).json(user)

    }

}

// deleteUserController

export const deleteUserController = async (req, res) => {
    
    const user = await userService.deleteUserService(req.params.id)

    if (!user) {
        
        return res.status(404).json({error: "The user required by the controller with DELETE does not exist"})
        
    } else {

        res.status(200).json(user)

    }

}
