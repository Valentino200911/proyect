import * as contactController from "../controllers/contactController.js";
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"

const router = Router()

router.get("/", allowed, contactController.getAllContactsController)

router.get("/:id", allowed, contactController.getContactByIdController)

router.post("/", userOnly, contactController.createContactController)

router.patch("/:id", adminOnly,  contactController.updateContactController)

router.delete("/:id", adminOnly, contactController.deleteContactController)

export default router