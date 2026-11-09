import * as reservationController from "../controllers/reservationController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"

// "/get/:id" y "/get/allReservations" tienen "allowed" porque la validación la hacen los tokens

const router = Router()

/**
 * @openapi
 * /api/reservation:
 *   get:
 *     tags: [Reservation]
 *     summary: Listar el catálogo
 *     description: >
 *       Es **público**: no hace falta token. Los filtros son opcionales y se
 *       combinan. El autor viene *populado*: llega el objeto, no el id.
 *     parameters:
 *       - name: userId
 *         in: query
 *         description: Filtra por userId (_id del usuario)
 *         schema: { type: mongoose.Schema.Types.ObjectId }
 *     responses:
 *       200:
 *         description: Las reservaciones que coinciden. Si no hay ninguna, un array vacío (no un 404)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Reservation' }
 */

router.get("/", allowed, reservationController.getAllReservationsController)

router.get("/:id", allowed, reservationController.getReservationByIdController)

router.post("/", userOnly, reservationController.createReservationController)

router.patch("/:id", allowed, reservationController.updateReservationController)

router.delete("/:id", adminOnly, reservationController.deleteReservationController)

export default router
