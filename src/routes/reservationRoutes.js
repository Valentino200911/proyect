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
 *     security: [{ bearerAuth: [] }]
 *     description: >
 *       Es **público**, tanto user como admin lo pueden emplear, pero para el rol user lo filtra automáticamente por su _id
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

/**
 * @openapi
 * /api/reservation/{id}:
 *   get:
 *     tags: [Reservation]
 *     summary: Ver una reservación (allowed) - Depede de si es o no del usuario (de rol 'user')
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *       - name: userId
 *         in: query
 *         description: Filtra por userId (_id del usuario)
 *         schema: { type: mongoose.Schema.Types.ObjectId } 
 *     responses:
 *       200:
 *         description: La reservación
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
 *       400: 
 *         description: Error en el _id enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/InvalidData'
 *             example:
 *               error: 'Id is not valid to MongoDB'
 *       401: { $ref: '#/components/responses/TokenError' }
 *       404: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example: { error: 'The reservation that you are looking for could not exist' } 
 */
router.get("/:id", allowed, reservationController.getReservationByIdController)

/**
 * @openapi
 * /api/reservation:
 *   post:
 *     tags: [Reservation]
 *     summary: Crear una reservación (userOnly) - solo un usuario de rol 'user' puede crear una reservación
 *     security: [{ bearerAuth: [] }] 
 *     description: >
 *       Crea una reservación con los datos que se le proporcionen, calcula los campos calculados y crea la reservación, bloqueando la 
 *       capacidad de la cabaña de ser reservada en dicha fecha.
 *       Valida: que la no haya más huéspedes que alojamientos posibles en la cabaña (Nota: si un usuario manda 3 acompañantes, el 
 *       sistema lo incluye automáticamente y el precio se calcula para 4); que la fecha tenga sentido, que no haya superposición con 
 *       otra reservación, dejando un día 'colchón' entre reservación y reservación, tanto para el ingreso como para el egreso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NewReservation' }
 *     responses:
 *       201:
 *         description: Reservación creada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
  *       400: 
 *         description: Error en el _id enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/InvalidData'
 *             example:
 *               error: 'Id is not valid to MongoDB'
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403:
 *         description: Ya existe una cabaña con ese nombre
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Forbidden' }
 *             example: {error: "This action requires the role: 'user'"}  
 *       409:
 *         description: Ya hay una reservación para esas fechas, o coincide con un día colchón
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The user with this email already exists' }
 */
router.post("/", userOnly, reservationController.createReservationController)

/**
 * @openapi
 * /api/reservation/{id}:
 *   patch:
 *     tags: [Reservation]
 *     summary: Modificar una reservación (allowed)
 *     description: >
 *       Se mandan **solo** los campos que cambian. El admin sólo puede cambiar el estado de la reservación (in progress a fallen) ||
 *       (in progress a done), así como isPaid: (true o false). El user puede cancelar su reservación (in progress a fallen) o su 
 *       comentario (reservationComment)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ModifiedReservation' }
 *     responses:
 *       200:
 *         description: La reservación con los cambios aplicados
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
  *       400: 
 *         description: Error en el _id enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/InvalidData'
 *             example:
 *               error: 'Id is not valid to MongoDB'
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example: { error: 'The reservation that you are looking for could not exist' } 
 *       409:
 *         description: La reservación ya ha sido completada, no hay necesidad de modificarla
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'You cannot modify the reservation anymore' }
 */
router.patch("/:id", allowed, reservationController.updateReservationController)

/**
 * @openapi
 * /api/reservation/{id}:
 *   delete:
 *     tags: [Reservation]
 *     summary: Modificar una reservación (adminOnly)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: La reservación borrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
  *       400: 
 *         description: Error en el _id enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/InvalidData'
 *             example:
 *               error: 'Id is not valid to MongoDB'
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example: { error: 'The reservation that you are looking for could not exist' } 
 */
router.delete("/:id", adminOnly, reservationController.deleteReservationController)

export default router
