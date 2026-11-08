import * as cottageController from "../controllers/cottageController.js";
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"
import { uploadImages } from "../middlewares/uploadImages.js";

const router = Router()

router.get("/", allowed, cottageController.getAllCottagesController)

router.get("/:id", allowed, cottageController.getCottageByIdController)

router.post("/", adminOnly, uploadImages, cottageController.createCottageController)

router.patch("/:id", adminOnly, uploadImages, cottageController.updateCottageController)

router.delete("/:id", adminOnly, cottageController.deleteCottageController)

export default router