
import * as naturalElementController from "../controllers/naturalElementController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"
import { uploadImages } from "../middlewares/uploadImages.js"

const router = Router()

/**
 * @openapi
 * /api/naturalelement:
 *   get:
 *     tags:
 *       - NaturalElement
 *     summary: Obtener todos los naturalelements (allowed)
 *     description: >
 *       Visualización de todas los naturalelements que maneja el negocio (Deberían ser mapeados como cards en el front)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: binomialName
 *         in: query
 *         description: Filtra por nomenclatura binomial de los elementos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Los naturalelements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NaturalElement'
 *       401:
 *         $ref: '#/components/responses/TokenError'
 */
router.get("/", allowed, naturalElementController.getAllNaturalElementsController)

/**
 * @openapi
 * /api/naturalelement/{id}:
 *   get:
 *     tags: [NaturalElement]
 *     summary: Ver un naturalelement (allowed)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: El naturalelement
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/NaturalElement' }
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
 *             example: { error: 'The naturalelement with the _id 6af29b85e429b51956c46fe7 does not exist' } 
 */
router.get("/:id", allowed, naturalElementController.getNaturalElementByIdController)

/**
 * @openapi
 * /api/naturalelement:
 *   post:
 *     tags: [NaturalElement]
 *     summary: Crear un naturalelement (adminOnly)
 *     description: >
 *      Requiere obligatoriamente una imagen, sea en localhost o supabase
 *
 *       - `multipart/form-data` → con la image. En Swagger UI aparece un botón
 *         para elegir el archivo.
 *
 *       ⚠️ Con `multipart` todos los campos viajan como **texto**: el name
 *       llega `"Tusca"` y lo convierte el schema de Mongoose.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/NewNaturalElement'
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
 *         description: El naturalelement creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/NaturalElement' }
 *       400:
 *         description: >
 *           Puede ser: Datos inválidos, el archivo no es una imagen, pesa más de 4 MB,
 *           o el campo del archivo no se llama `imagen`
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ValidationError' }
 *             example: { error: 'The binomial name of the natural element is required' }
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       409:
 *         description: Ya existe un naturalelement con ese nombre binomial
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: {"error": "Duplicated unique, the object is already registered", "value": "binomialName"}
 *       502:
 *         description: El storage de imágenes falló. No es culpa tuya ni nuestra
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The image could not be saved. Please try again.' }
 */
router.post("/", adminOnly, uploadImages, naturalElementController.createNaturalElementController)

/**
 * @openapi
 * /api/naturalelement/{id}:
 *   patch:
 *     tags: [NaturalElement]
 *     summary: Modificar un naturalelement (adminOnly)
 *     description: >
 *       Se mandan **solo** los campos que cambian. Si viene una `image` nueva,
 *       la image anterior se borra del storage.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NewNaturalElement' }
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/NewNaturalElement'
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
 *         description: El naturalelement con los cambios aplicados
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/NaturalElement' }
 *       400: { $ref: '#/components/responses/InvalidData' }
 *       401: { $ref: '#/components/responses/TokenError' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFound'
 *             example: { error: 'The naturalelement with the _id 6af29b85e429b51956c46fe7 does not exist' } 
 *       409:
 *         description: Ya existe un naturalelement con ese nombre binomial
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: {"error": "Duplicated unique, the object is already registered", "value": "binomialName"}
 *       502:
 *         description: El storage de imágenes falló. No es culpa tuya ni nuestra
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The image could not be saved. Please try again.' }
 */
router.patch("/:id", adminOnly, uploadImages, naturalElementController.updateNaturalElementController)

/**
 * @openapi
 * /api/naturalelement/{id}:
 *   delete:
 *     tags: [NaturalElement]
 *     summary: Borrar un naturalelement (adminOnly)
 *     description: >
 *       Si se elimina, se elimina además su image
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - $ref: '#/components/parameters/IdInRoute'
 *     responses:
 *       200:
 *         description: El naturalelement que se borró
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/NaturalElement' }
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
 *             example: { error: 'The naturalelement with the _id 6af29b85e429b51956c46fe7 does not exist' } 
 */
router.delete("/:id", adminOnly, naturalElementController.deleteNaturalElementController)

export default router