
import * as authController from "../controllers/authController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"


const router = Router()

router.post("/register", authController.registerController)

router.post("/login", authController.loginController)

router.get("/profile", allowed, authController.getProfileController)

router.patch("/profile", allowed, authController.updateProfileController)

export default router