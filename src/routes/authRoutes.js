import { verifyToken } from "../../middlewares/verifyToken.js"
import * as authController from "../controllers/authController.js"
import { Router } from "express"
// import { ROLES } from "../../utils/constants/generalConstants.js"

const router = Router()

// router.use( verifyToken, allowRoles(ROLES.ADMIN))

router.post("/register", authController.registerController)

router.post("/login", authController.loginController)

router.get("/profile", verifyToken, authController.profileController)

export default router