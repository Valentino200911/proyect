import * as userController from "../controllers/userController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"

const router = Router()

router.use(adminOnly)

router.get("/get/:id", userController.getUserByIdController) 

router.get("/get", userController.getAllUsersController)

// No es necesaria una ruta aparte de creación de usuario

router.patch("/patch/:id", userController.updateUserController)

router.delete("/delete/:id", userController.deleteUserController)

export default router