import * as userController from "../controllers/userController.js"
import { Router } from "express"
// import { ROLES } from "../../utils/constants/generalConstants.js"

const router = Router()

// router.use( verifyToken, allowRoles(ROLES.ADMIN))

router.get("/get/:id", userController.getUserByIdController)

router.get("/get", userController.getAllUsersController)

router.post("/post", userController.createUserController)

router.patch("/patch/:id", userController.updateUserController)

router.delete("/delete/:id", userController.deleteUserController)

export default router