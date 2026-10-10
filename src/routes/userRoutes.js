import * as userController from "../controllers/userController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"

const router = Router()

router.get("/get/:id", allowed, userController.getUserByIdController) 

router.get("/get", adminOnly, userController.getAllUsersController)

router.post("/post", adminOnly, userController.createUserController)

router.patch("/patch/:id", adminOnly, userController.updateUserController)

router.delete("/delete/:id", adminOnly, userController.deleteUserController)

export default router