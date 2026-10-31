
import * as naturalElementController from "../controllers/naturalElementController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"
import { uploadImages } from "../middlewares/uploadImages.js"

const router = Router()

router.get("/", allowed, naturalElementController.getAllNaturalElementsController)

router.get("/:id", allowed, naturalElementController.getNaturalElementByIdController)

router.post("/", adminOnly, uploadImages, naturalElementController.createNaturalElementController)

router.patch("/:id", adminOnly, uploadImages, naturalElementController.updateNaturalElementController)

router.delete("/:id", adminOnly, naturalElementController.deleteNaturalElementController)

export default router