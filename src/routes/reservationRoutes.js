import * as reservationController from "../controllers/reservationController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../../utils/constants/rolesConstants.js"

const router = Router()

router.get("/get/allReservations", adminOnly, reservationController.getAllReservationsController)

router.get("/get/:id", adminOnly, reservationController.getReservationByIdController)

router.get("/get/user/allReservations", userOnly, reservationController.getAllMyReservationsController)

router.get("/get/:userId/:id", userOnly, reservationController.getMyReservationByIdController)

router.post("/post", userOnly, reservationController.createReservationController)

router.patch("/patch/:id", adminOnly, reservationController.updateReservationController)

export default router
