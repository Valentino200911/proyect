import * as naturalElementController from "../controllers/naturalElementController.js"
import { Router } from "express"
// import { ROLES } from "../../utils/constants/generalConstants.js"

const router = Router()

// router.use( verifyToken, allowRoles(ROLES.ADMIN))

router.get("/get/:id", naturalElementController.getNaturalElementByIdController)

router.get("/get", naturalElementController.getAllNaturalElementsController)

router.post("/post", naturalElementController.createNaturalElementController)

router.patch("/patch/:id", naturalElementController.updateNaturalElementController)

router.put("/put/:id", naturalElementController.updateNaturalElementController)

router.delete("/delete/:id", naturalElementController.deleteNaturalElementController)

export default router