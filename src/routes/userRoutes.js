import * as userController from "../controllers/userController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"

const router = Router()

router.use(adminOnly)

/**
 * @openapi
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Obtener todos los usuarios (adminOnly)
 *     description: >
 *       Todo este grupo de rutas es **solo para admin**. La password nunca viaja.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: email
 *         in: query
 *         description: Filtra por email
 *         schema:
 *           type: string
 *       - name: role
 *         in: query
 *         description: Filtra por rol
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *       - name: phoneNumber
 *         in: query
 *         description: Filtra por número telefónico
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/TokenError'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
router.get("/", userController.getAllUsersController)

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Ver un usuario (adminOnly)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: El usuario
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
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
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get("/:id", userController.getUserByIdController) 

// No es necesaria una ruta aparte de creación de usuario

/**
 * @openapi
 * /api/user/{id}:
 *   patch:
 *     tags:
 *       - User
 *     summary: Modificar datos de OTRO usuario (adminOnly)
 *     description: >
 *       Devuelve el usuario modificado según el _id. Se mandan **solo** los campos que cambian.
 *       Permite modificar SÓLO el rol de otro usuario.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             role: admin
 *     responses:
 *       200:
 *         description: El usuario modificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400: 
 *         description: Error en el _id enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/InvalidData'
 *             example:
 *               error: 'Id is not valid to MongoDB'
 *       401:
 *         $ref: '#/components/responses/TokenError'
 *       403:
 *         description: Prohibición de determinadas modificaciones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Forbidden'
 *             example:
 *               error: "You can only modify the user's role"
 *       409:
 *         description: Conflicto de acciones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Conflict'
 *             example:
 *               error: 'You cannot modify an admin'
 */
router.patch("/:id", userController.updateUserController) // Ruta de modificación de uso exclusivo para el admin

/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Borrar un usuario (adminOnly)
 *     description: >
 *       ⚠️ **No se puede borrar un usuario que tiene reservaciones y contactos realizados**: da 409 y
 *       dice cuántos. Primero hay que reasignar o borrar dichos registros.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: El usuario que se borró
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/InvalidData'
 *             example:
 *               error: 'Id is not valid to MongoDB'
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *       409: { $ref: '#/components/responses/Conflict' }
 */
router.delete("/:id", userController.deleteUserController)

export default router