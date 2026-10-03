import * as cottageController from "../controllers/cottageController.js";
import { Router } from "express"
// import { ROLES } from "../../utils/constants/generalConstants.js"

const router = Router()

// router.use( verifyToken, allowRoles(ROLES.ADMIN))

router.get("/get/:id", cottageController.getCottageByIdController)

router.get("/get", cottageController.getAllCottagesController)

router.post("/post", cottageController.createCottageController)

router.patch("/patch/:id", cottageController.updateCottageController)

router.delete("/delete/:id", cottageController.deleteCottageController)

export default router