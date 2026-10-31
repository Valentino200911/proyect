import * as userController from "../controllers/userController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"

const router = Router()

router.use(adminOnly)

router.get("/", userController.getAllUsersController)

router.get("/:id", userController.getUserByIdController) 

// No es necesaria una ruta aparte de creación de usuario

router.patch("/:id", userController.updateUserController)

router.delete("/:id", userController.deleteUserController)

export default router