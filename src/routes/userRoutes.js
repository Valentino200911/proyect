import * as userController from "../controllers/userController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"

const router = Router()

router.use(adminOnly)

router.get("/get/:id", userController.getUserByIdController) 

router.get("/get", userController.getAllUsersController)

// router.post("/post", userController.createUserController) registerService ya cumple esa función

router.patch("/patch/:id", userController.updateUserController)

router.delete("/delete/:id", userController.deleteUserController)

export default router