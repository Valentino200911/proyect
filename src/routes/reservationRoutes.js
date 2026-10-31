import * as reservationController from "../controllers/reservationController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"

const router = Router()

// "/get/:id" y "/get/allReservations" tienen "allowed" porque la validación la hacen los tokens

router.get("/", allowed, reservationController.getAllReservationsController)

router.get("/:id", allowed, reservationController.getReservationByIdController)

router.post("/", userOnly, reservationController.createReservationController)

router.patch("/:id", allowed, reservationController.updateReservationController)

router.delete("/:id", adminOnly, reservationController.deleteReservationController)

export default router
