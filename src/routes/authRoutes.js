import { verifyToken } from "../../middlewares/verifyToken.js"
import * as authController from "../controllers/authController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"

const router = Router()

router.post("/register", authController.registerController)

router.post("/login", authController.loginController)

router.get("/profile", allowed, authController.profileController)

export default router