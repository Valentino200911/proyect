import * as cottageController from "../controllers/cottageController.js";
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"
import { uploadImages } from "../middlewares/uploadImages.js";

const router = Router()

/**
 * @openapi
 * /api/cottage:
 *   get:
 *     tags:
 *       - Cottage
 *     summary: Obtener todas las cabañas (allowed)
 *     description: >
 *       Visualización de todas las cabañas que maneja el negocio
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Filtra por nombre de las cabañas
 *         schema:
 *           type: string
 *       - name: pricePerNightAndPerson
 *         in: query
 *         description: Filtra el precio de una persona durante una noche (precio unitario)
 *         schema:
 *           type: number
 *       - name: capacity
 *         in: query
 *         description: Filtra por la capacidad de la cabaña
 *         schema:
 *           type: number
 *       - name: location
 *         in: query
 *         description: Filtra por la ubicación de la cabaña (agregado por la escalabilidad del proyecto)
 *         schema:
 *           type: string
 *           enum: ['tafi viejo, tucuman',]
 *     responses:
 *       200:
 *         description: Las cabañas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cottage'
 *       401:
 *         $ref: '#/components/responses/TokenError'
 */
router.get("/", allowed, cottageController.getAllCottagesController)

/**
 * @openapi
 * /api/cottage/{id}:
 *   get:
 *     tags: [Cottage]
 *     summary: Ver una cabaña (allowed)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: La cabaña
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Cottage' }
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
 *             example: { error: 'The cottage with the _id 6af29b85e429b51956c46fe7 does not exist' } 
 */
router.get("/:id", allowed, cottageController.getCottageByIdController)

/**
 * @openapi
 * /api/cottage:
 *   post:
 *     tags: [Cottage]
 *     summary: Crear una cabaña (adminOnly)
 *     description: >
 *      Requiere obligatoriamente una imagen, sea en localhost o supabase
 *
 *       - `multipart/form-data` → con la image. En Swagger UI aparece un botón
 *         para elegir el archivo.
 *
 *       ⚠️ Con `multipart` todos los campos viajan como **texto**: el precio
 *       llega `"15000"` y lo convierte el schema de Mongoose.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/NewCottage'
 *               - type: object
 *                 properties:
 *                   image:
 *                     type: string
 *                     format: binary
 *                     description: >
 *                       Solo imágenes, hasta 4 MB. El campo tiene que
 *                       llamarse exactamente `image`.
 *     responses:
 *       201:
 *         description: La cabaña creada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Cottage' }
 *       400:
 *         description: >
 *           Puede ser: Datos inválidos, el archivo no es una imagen, pesa más de 4 MB,
 *           o el campo del archivo no se llama `imagen`
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ValidationError' }
 *             example: { error: 'The name is required for the register' }
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       409:
 *         description: Ya existe una cabaña con ese nombre
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: {"error": "Duplicated unique, the object is already registered", "value": "name"}
 *       502:
 *         description: El storage de imágenes falló. No es culpa tuya ni nuestra
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The image could not be saved. Please try again.' }
 */
router.post("/", adminOnly, uploadImages, cottageController.createCottageController)

/**
 * @openapi
 * /api/cottage/{id}:
 *   patch:
 *     tags: [Cottage]
 *     summary: Modificar una cabaña (adminOnly)
 *     description: >
 *       Se mandan **solo** los campos que cambian. Si viene una `image` nueva,
 *       la image anterior se borra del storage.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NewCottage' }
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/NewCottage'
 *               - type: object
 *                 properties:
 *                   image:
 *                     type: string
 *                     format: binary
 *                     description: >
 *                       Solo imágenes, hasta 4 MB. El campo tiene que
 *                       llamarse exactamente `image`.
 *     responses:
 *       200:
 *         description: La cabaña con los cambios aplicados
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Cottage' }
 *       400: { $ref: '#/components/responses/InvalidData' }
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example: { error: 'The cottage with the _id 6af29b85e429b51956c46fe7 does not exist' } 
 *       409:
 *         description: Ya existe una cabaña con ese nombre
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: {"error": "Duplicated unique, the object is already registered", "value": "name"}
 *       502:
 *         description: El storage de imágenes falló. No es culpa tuya ni nuestra
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The image could not be saved. Please try again.' }
 */
router.patch("/:id", adminOnly, uploadImages, cottageController.updateCottageController)

/**
 * @openapi
 * /api/cottage/{id}:
 *   delete:
 *     tags: [Cottage]
 *     summary: Borrar una cabaña (adminOnly)
 *     description: >
 *       ⚠️ **No se puede borrar una cabaña que fue reservada o que tiene reservaciones referenciadas**: da 409 y
 *       dice cuántas. Primero hay que reasignar o borrar dichos registros. Si se elimina, se elimina además su image
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: La cabaña que se borró
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Cottage' }
 *       400:
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
 *             example: { error: 'The cottage with the _id 6af29b85e429b51956c46fe7 does not exist' } 
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Conflict'
 *             example: { error: 'The cottage cannot be deleted becuase it 3 reservations' }
 */
router.delete("/:id", adminOnly, cottageController.deleteCottageController)

export default router