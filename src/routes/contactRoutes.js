import * as contactController from "../controllers/contactController.js";
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"

const router = Router()

router.get("/", allowed, contactController.getAllContactsController)

router.get("/:id", allowed, contactController.getContactByIdController)

router.post("/", userOnly, contactController.createContactController)

router.patch("/:id", allowed,  contactController.updateContactController) // El usuario puede modificar su contacto, pero no puede eliminarlo

router.delete("/:id", adminOnly, contactController.deleteContactController)

export default router