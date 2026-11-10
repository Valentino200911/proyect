
import * as authController from "../controllers/authController.js"
import { Router } from "express"
import { allowed, userOnly, adminOnly } from "../utils/exporter.js"


const router = Router()

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Crear una cuenta
 *     description: >
 *       Crea un usuario con rol `user` y devuelve la sesión ya iniciada.
 *       El rol NO se puede elegir desde acá: un admin lo crea otro admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Register' }
 *     responses:
 *       201:
 *         description: Cuenta creada. Ya viene con el token
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Session' }
 *       400: { $ref: '#/components/responses/InvalidData' }
 *       409:
 *         description: Ese email ya está registrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The user with this email already exists' }
 */
router.post("/register", authController.registerController)

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión y obtener el token
 *     description: >
 *       ⭐ **Empezá por acá.** Copiá el `token` de la respuesta y pegalo en
 *       el botón **Authorize** 🔓 de arriba: queda puesto para todas las rutas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Login' }
 *     responses:
 *       200:
 *         description: El usuario y su token
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Session' }
 *       401:
 *         description: >
 *           Email o contraseña incorrectos. El mensaje NO dice cuál de los dos
 *           está mal, a propósito: si lo dijera, confirmaría que el email existe.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Error' }
 *             example: { error: 'The email and/or the password are required to login' }
 */
router.post("/login", authController.loginController)

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Ver mis datos (allowed)
 *     description: Devuelve el usuario del token. Sirve para saber si el token sigue vivo.
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: El usuario de la sesión
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       401: { $ref: '#/components/responses/TokenError' }
 */
router.get("/profile", allowed, authController.getProfileController)

/**
 * @openapi
 * /api/auth/profile:
 *   patch:
 *     tags: [Auth]
 *     summary: Modificar mis datos (allowed)
 *     description: >
 *       Devuelve el usuario modificado del token. Se mandan **solo** los campos que cambian.
 *       Permite modificar SÓLO el propio perfil.
 *       Para modificar otros usuarios, PATCH api/user/:id
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AutoModifiedUser'
 *     responses:
 *       200:
 *         description: El usuario modificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/TokenError'
 *       403:
 *         description: Prohibición de determinadas modificaciones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Forbidden'
 *             example:
 *               error: 'You cannot modify your email, your password, nor your role'
 */
router.patch("/profile", allowed, authController.updateProfileController)

export default router