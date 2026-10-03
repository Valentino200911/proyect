import * as contactController from "../controllers/contactController.js";
import { Router } from "express"
// import { ROLES } from "../../utils/constants/generalConstants.js"

const router = Router()

// router.use( verifyToken, allowRoles(ROLES.ADMIN))


router.get("/get", contactController.getAllContactsController)

router.get("/get/:id", contactController.getContactByIdController)

router.post("/post", contactController.createContactController)

router.patch("/patch/:id", contactController.updateContactController)

router.delete("/delete/:id", contactController.deleteContactController)

export default router