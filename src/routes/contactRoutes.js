import * as contactController from "../controllers/contactController.js";
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"

const router = Router()

router.get("/get", adminOnly, contactController.getAllContactsController)

router.get("/get/:id", allowed, contactController.getContactByIdController)

router.post("/post", userOnly, contactController.createContactController)

router.patch("/patch/:id", adminOnly,  contactController.updateContactController)

router.delete("/delete/:id", adminOnly, contactController.deleteContactController)

export default router