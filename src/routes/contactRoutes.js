import * as contactController from "../controllers/contactController.js";
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"

const router = Router()

/**
 * @openapi
 * /api/contact:
 *   get:
 *     tags:
 *       - Contact
 *     summary: Listar los contactos
 *     description: >
 *       Es **público**, tanto user como admin lo pueden emplear, pero para el rol user lo filtra automáticamente por su _id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         description: Filtra por userId (_id del usuario)
 *         schema:
 *           type: mongoose.schema.Type.ObjectId
 *     responses:
 *       200:
 *         description: Los contactos que coinciden. Si no hay ninguna, un array vacío (no un 404)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */

router.get("/", allowed, contactController.getAllContactsController)

/**
 * @openapi
 * /api/contact/{id}:
 *   get:
 *     tags:
 *       - Contact
 *     summary: Ver un contacto (allowed) - Depede de si es o no del usuario (de rol 'user')
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *       - name: userId
 *         in: query
 *         description: Filtra por userId (_id del usuario) Si role es "user", el filtrado es automático
 *         schema:
 *           type: mongoose.Schema.Type.ObjectId
 *     responses:
 *       200:
 *         description: El contacto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
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
 *         description: El contacto no es del usuario (rol user)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Forbidden'
 *             example:
 *               error: 'You can only see your own contacts'
 *       404:
 *         description: El contacto no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example:
 *               error: 'The contact with the _id 6af29b85e429b51956c46fed does not exist'
 */
router.get("/:id", allowed, contactController.getContactByIdController)

/**
 * @openapi
 * /api/contact:
 *   post:
 *     tags:
 *       - Contact
 *     summary: Crear un contacto (userOnly) - solo un usuario de rol 'user' puede crearlo
 *     security:
 *       - bearerAuth: []
 *     description: >
 *       Crea un contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       201:
 *         description: Contacto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
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
 */
router.post("/", userOnly, contactController.createContactController)

/**
 * @openapi
 * /api/contact/{id}:
 *   patch:
 *     tags:
 *       - Contact
 *     summary: Modificar un contacto (allowed)
 *     description: >
 *       Se mandan **solo** los campos que cambian. Todo puede ser modificado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       200:
 *         description: El contacto con los cambios aplicados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
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
 *       404:
 *         description: El contacto no fue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example:
 *               error: 'The contact with the _id 6af29b85e429b51956c46fed does not exist'
 */
router.patch("/:id", allowed,  contactController.updateContactController) // El usuario puede modificar su contacto, pero no puede eliminarlo

/**
 * @openapi
 * /api/contact/{id}:
 *   delete:
 *     tags:
 *       - Contact
 *     summary: Eliminar un contacto (adminOnly)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: El contacto borrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
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
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: El contacto no fue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example:
 *               error: 'The contact with the _id 6af29b85e429b51956c46fed does not exist'
 */
router.delete("/:id", adminOnly, contactController.deleteContactController)

export default router