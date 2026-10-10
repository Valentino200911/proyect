
import * as naturalElementController from "../controllers/naturalElementController.js"
import { Router } from "express"
import NaturalElement from "../models/naturalElementModel.js"
import { verifyToken } from "../../middlewares/verifyToken.js"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"

const router = Router()

router.get("/get/:id", allowed, naturalElementController.getNaturalElementByIdController)

router.get("/get", allowed, naturalElementController.getAllNaturalElementsController)

router.post("/post", adminOnly, naturalElementController.createNaturalElementController)

router.patch("/patch/:id", adminOnly, naturalElementController.updateNaturalElementController)

router.delete("/delete/:id", adminOnly, naturalElementController.deleteNaturalElementController)

export default router