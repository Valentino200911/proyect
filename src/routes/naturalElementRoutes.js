
import * as naturalElementController from "../controllers/naturalElementController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"
import { uploadImages } from "../middlewares/uploadImages.js"

const router = Router()

router.get("/get/:id", allowed, naturalElementController.getNaturalElementByIdController)

router.get("/get", allowed, naturalElementController.getAllNaturalElementsController)

router.post("/post", adminOnly, uploadImages, naturalElementController.createNaturalElementController)

router.patch("/patch/:id", adminOnly, uploadImages, naturalElementController.updateNaturalElementController)

router.delete("/delete/:id", adminOnly, naturalElementController.deleteNaturalElementController)

export default router