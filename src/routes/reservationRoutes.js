import * as reservationController from "../controllers/reservationController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/constants/rolesConstants.js"

const router = Router()

// "/get/:id" y "/get/allReservations" tienen "allowed" porque la validación la hacen los tokens

router.get("/get/allReservations", allowed, reservationController.getAllReservationsController)

router.get("/get/:id", allowed, reservationController.getReservationByIdController)

router.post("/post", userOnly, reservationController.createReservationController)

router.patch("/patch/:id", allowed, reservationController.updateReservationController)

router.delete("/delete/:id", adminOnly, reservationController.deleteReservationController)

export default router
